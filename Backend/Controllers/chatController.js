import db from "../config/db.js";
import { getGeminiResponse } from "../utils/gemini.js";
import ErrorHandler from "../middlewares/error.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";

// POST /chat/send
export const sendMessage = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id; // assuming auth middleware adds req.user
  const { message } = req.body;

  if (!message) {
    return next(new ErrorHandler("Message is required", 400));
  }

  // Save user message
  db.query(
    "INSERT INTO chat_history (user_id, role, message) VALUES (?, 'user', ?)",
    [userId, message],
    async (err) => {
      if (err) return next(new ErrorHandler(err.message, 500));

      try {
        // Get bot response from Gemini
        const botResponse = await getGeminiResponse(message);

        // Save bot response
        db.query(
          "INSERT INTO chat_history (user_id, role, message) VALUES (?, 'bot', ?)",
          [userId, botResponse],
          (err2) => {
            if (err2) return next(new ErrorHandler(err2.message, 500));

            res.status(200).json({
              success: true,
              response: botResponse,
            });
          }
        );
      } catch (err) {
        return next(new ErrorHandler("Gemini API error: " + err.message, 500));
      }
    }
  );
});

// GET /chat/history
export const getChatHistory = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id;
  db.query(
    "SELECT role, message, created_at FROM chat_history WHERE user_id = ? ORDER BY created_at ASC",
    [userId],
    (err, results) => {
      if (err) return next(new ErrorHandler(err.message, 500));

      res.status(200).json({
        success: true,
        history: results,
      });
    }
  );
});
