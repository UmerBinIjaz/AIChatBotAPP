import jwt from "jsonwebtoken";
import db from "../config/db.js";
import ErrorHandler from "./error.js";

export const isAuthenticatedUser = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    db.query("SELECT * FROM users WHERE id = ?", [decoded.id], (err, results) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      if (results.length === 0) return next(new ErrorHandler("User not found", 404));
      req.user = results[0];
      next();
    });
  } catch (err) {
    return next(new ErrorHandler("Invalid token", 401));
  }
};
