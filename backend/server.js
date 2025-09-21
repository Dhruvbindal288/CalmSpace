import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./src/routes/auth.route.js";
import diaryRoutes from "./src/routes/diary.route.js";
import chatRoutes from "./src/routes/chat.route.js";
import connectDB from "./src/lib/db.js";
import quoteRouter from './src/routes/quote.route.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const corsOptions = {
  origin: ['http://localhost:3000', 'https://calmspace-vjkj.onrender.com'],
  credentials: true,
};
app.use(cors(corsOptions));

// JSON parser
app.use(express.json());

// --- API Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/diary", diaryRoutes);
app.use("/api/chat", chatRoutes);


const frontendPath = path.join(__dirname, "..", "frontend", "dist");
app.use(express.static(frontendPath));


app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to DB", err);
  }
};

startServer();
