import express from "express";
import protectRoute from "../middlewares/auth.middleware.js";
import {
  createDiary,
  getDiaries,
  getDiary,
  updateDiary,
  deleteDiary,
} from "../controllers/diary.controller.js";

const router = express.Router();

router.use(protectRoute);


router.post("/new", createDiary);


router.get("/diaries", getDiaries);


router.get("/:id", getDiary);


router.put("/update/:id", updateDiary);


router.delete("/delete/:id", deleteDiary);

export default router;
