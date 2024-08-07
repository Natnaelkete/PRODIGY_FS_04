import express from "express";
import { getUsersForSideBar } from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getUsersForSideBar);

export default router;
