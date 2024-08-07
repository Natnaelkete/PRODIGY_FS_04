import express from "express";

import {
  createAccount,
  LoginUsers,
  logout,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", createAccount);
router.post("/login", LoginUsers);
router.post("/logout", logout);

export default router;
