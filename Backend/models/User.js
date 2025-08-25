// import { DataTypes, Model } from "sequelize";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import crypto from "crypto";
// import sequelize from "../config/db.js";

// class User extends Model {
//   async comparePassword(enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
//   }

//   generateVerificationCode() {
//     const firstDigit = Math.floor(Math.random() * 9) + 1;
//     const remainingDigits = Math.floor(Math.random() * 10000)
//       .toString()
//       .padStart(4, 0);
//     const verificationCode = parseInt(firstDigit + remainingDigits);

//     this.verificationCode = verificationCode;
//     this.verificationCodeExpire = new Date(Date.now() + 10 * 60 * 1000);
//     return verificationCode;
//   }

//   generateToken() {
//     return jwt.sign({ id: this.id }, process.env.JWT_SECRET_KEY, {
//       expiresIn: process.env.JWT_EXPIRE,
//     });
//   }

//   generateResetPasswordToken() {
//     const resetToken = crypto.randomBytes(20).toString("hex");
//     this.resetPasswordToken = crypto
//       .createHash("sha256")
//       .update(resetToken)
//       .digest("hex");
//     this.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000);
//     return resetToken;
//   }
// }

// User.init(
//   {
//     name: { type: DataTypes.STRING, allowNull: false },
//     email: { type: DataTypes.STRING, allowNull: false, unique: true },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       set(value) {
//         if (value) {
//           const hash = bcrypt.hashSync(value, 10);
//           this.setDataValue("password", hash);
//         }
//       },
//     },
//     phone: { type: DataTypes.STRING, allowNull: false, unique: true },
//     accountVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
//     verificationCode: { type: DataTypes.INTEGER, allowNull: true },
//     verificationCodeExpire: { type: DataTypes.DATE, allowNull: true },
//     resetPasswordToken: { type: DataTypes.STRING, allowNull: true },
//     resetPasswordExpire: { type: DataTypes.DATE, allowNull: true },
//   },
//   {
//     sequelize,
//     modelName: "User",
//     tableName: "users",
//     timestamps: true,
//   }
// );

// export { User };
