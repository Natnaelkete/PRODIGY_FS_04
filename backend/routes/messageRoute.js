import express from "express";
import {
  createMessage,
  getMessages,
} from "../controllers/messageController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:id", protect, getMessages);
router.post("/send/:id", protect, createMessage);

export default router;
