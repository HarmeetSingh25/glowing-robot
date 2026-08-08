import { Router } from "express";
import { getMe, login, logOut, register } from "../controllers/auth.contoller.js";
import protect from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/logout", logOut);

export default router;

