import bcrypt from "bcryptjs";
import ErrorHandler from "../middlewares/error.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import db from "../config/db.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendToken } from "../utils/sendToken.js";
import twilio from "twilio";
import crypto from "crypto";
import { generateEmailTemplate } from "../utils/emailTemplate.js";
import { generateOtpEmailTemplate } from "../utils/otpemailTemplate.js";

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// 📌 Register
export const register = async (req, res, next) => {
  try {
    const { name, email, phone, password, verificationMethod } = req.body;
    if (!name || !email || !phone || !password || !verificationMethod) {
      return next(new ErrorHandler("All fields are required.", 400));
    }

    // check existing user
    db.query(
      "SELECT * FROM users WHERE email = ? AND account_verified = 1",
      [email],
      async (err, results) => {
        if (err) return next(new ErrorHandler(err.message, 500));
        if (results.length > 0) {
          return next(new ErrorHandler("You have exceeded Multiple Attempts Please Try after an hover", 400));
        }

        // insert new user
        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        db.query(
          "INSERT INTO users (name, email, phone, password, verification_code, verification_code_expire, account_verified) VALUES (?, ?, ?, ?, ?, ?, 0)",
          [name, email, phone, hashedPassword, verificationCode, expiry],
          async (err) => {
            if (err) return next(new ErrorHandler(err.message, 500));

            // send OTP
            if (verificationMethod === "email") {
                const message = generateEmailTemplate(verificationCode);
                sendEmail({ email, subject: "Your Verification Code", message });
                res.status(200).json({
                    success: true,
                    message: `Verification email successfully sent to ${name}`,
                });
                
            } else if (verificationMethod === "phone") {
              const codeWithSpace = verificationCode.toString().split("").join(" ");
              await client.messages.create({
                body: `<Response><Say>Your verification code is ${codeWithSpace}</Say></Response>`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phone,
              });
                res.status(200).json({
                success: true,
                message: "Verification code sent successfully",
                });
            }
          }
        );
      }
    );
  } catch (error) {
    next(error);
  }
};

// 📌 Verify OTP
export const verifyOTP = async (req, res, next) => {
  const { email, otp } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ? AND account_verified = 0",
    [email],
    (err, results) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      if (results.length === 0) return next(new ErrorHandler("User not found.", 404));

      const user = results[0];

      if (user.verification_code !== Number(otp)) {
        return next(new ErrorHandler("Invalid OTP.", 400));
      }

      if (new Date() > user.verification_code_expire) {
        return next(new ErrorHandler("OTP expired.", 400));
      }

      db.query(
        "UPDATE users SET account_verified = 1, verification_code = NULL, verification_code_expire = NULL WHERE email = ?",
        [email],
        (err) => {
          if (err) return next(new ErrorHandler(err.message, 500));
          sendToken(user, 200, "Account Verified.", res);
        }
      );
    }
  );
};

// 📌 Login
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // 1️⃣ Check required fields
  if (!email || !password) {
    return next(new ErrorHandler("Email and password are required.", 400));
  }

  // 2️⃣ Query user from MySQL
  db.query(
    "SELECT * FROM users WHERE email = ? AND account_verified = 1",
    [email],
    async (err, results) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      if (results.length === 0) {
        return next(new ErrorHandler("Invalid email or password.", 400));
      }

      const user = results[0]; // first user row from DB

      // 3️⃣ Compare password
      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password.", 400));
      }

      // 4️⃣ Send JWT Token in cookie + JSON response
      sendToken(user, 200, "User logged in successfully.", res);
    }
  );
});

// 📌 Logout
export const logout = catchAsyncError(async (req, res, next) => {
  res.clearCookie("token").status(200).json({ success: true, message: "Logged out." });
});


// ForgotPassword
export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  if (!email) return next(new ErrorHandler("Email is required.", 400));

  db.query(
    "SELECT * FROM users WHERE email = ? AND account_verified = 1",
    [email],
    async (err, results) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      if (results.length === 0)
        return next(new ErrorHandler("User not found.", 404));

      // Generate 6 digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expire = new Date(Date.now() + 15 * 60 * 1000); // 15 min

      db.query(
        "UPDATE users SET reset_password_token = ?, reset_password_expire = ? WHERE email = ?",
        [otp, expire, email],
        async (err) => {
          if (err) return next(new ErrorHandler(err.message, 500));

          // Send OTP by email (or SMS if you want Twilio)
          // const message = `Your password reset OTP is: ${otp}. It will expire in 15 minutes.`;
          const message = generateOtpEmailTemplate(otp);
          
          sendEmail({ email, subject: "Your OTP Code", message });        

          res.status(200).json({
              success: true,
              message: `OTP send successfully to your email address`,
          });
        }
      );
    }
  );
});

// resetPassword
export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { otp, password, confirmPassword } = req.body;

  if (!otp || !password || !confirmPassword) {
    return next(new ErrorHandler("All fields are required.", 400));
  }

  if (password !== confirmPassword) {
    return next(new ErrorHandler("Passwords do not match.", 400));
  }

  db.query(
    "SELECT * FROM users WHERE reset_password_token = ? AND reset_password_expire > NOW()",
    [otp],
    async (err, results) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      if (results.length === 0)
        return next(new ErrorHandler("Invalid or expired OTP.", 400));

      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      db.query(
        "UPDATE users SET password = ?, reset_password_token = NULL, reset_password_expire = NULL WHERE reset_password_token = ?",
        [hashedPassword, otp],
        (err) => {
          if (err) return next(new ErrorHandler(err.message, 500));

          res.status(200).json({
            success: true,
            message: "Password reset successful. You can now log in.",
          });
        }
      );
    }
  );
});
