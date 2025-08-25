import express from "express";
import { sendMessage, getChatHistory } from "../Controllers/chatController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/send", isAuthenticatedUser, sendMessage);
router.get("/history", isAuthenticatedUser, getChatHistory);

export default router;
