

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path"; 

import authRoutes from "./routes/auth.route.js";
import diaryRoutes from "./routes/diary.route.js";
import chatRoutes from "./routes/chat.route.js";
import connectDB from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


const __dirname = path.resolve();


const corsOptions = {
  origin: ['http://localhost:3000'], 
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/diary", diaryRoutes);
app.use("/api/chat", chatRoutes);


app.use(express.static(path.join(__dirname, "/frontend/dist")));

//Catching all route to build react app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
