import express from "express";
import protectRoute from "../middlewares/auth.middleware.js";
import {
  createMood,
  getMoods,
  getMood,
  updateMood,
  deleteMood,
} from "../controllers/mood.controller.js";

const router = express.Router();

router.use(protectRoute);

router.post("/", createMood);
router.get("/", getMoods);
router.get("/:id", getMood);
router.put("/update/:id", updateMood);
router.delete("/delete/:id", deleteMood);

export default router;
