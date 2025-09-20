import express from "express";
import { getRandomQuote } from "../controllers/quote.controller.js";

const router = express.Router();


router.get("/", getRandomQuote);

export default router;
