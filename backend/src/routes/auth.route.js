import express from "express";
import { registerUser, loginUser,logoutUser,getMe } from "../controllers/auth.controller.js";
import protectRoute from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post('/logout',logoutUser)
router.get("/me", protectRoute, getMe);
export default router;
