import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path"; 


import authRoutes from "./src/routes/auth.route.js";
import diaryRoutes from "./src/routes/diary.route.js";
import chatRoutes from "./src/routes/chat.route.js";
import connectDB from "./src/lib/db.js"; 

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;


// This is the key change
const __dirname = path.resolve();


const corsOptions = {
  origin: ['http://localhost:3000', 'https://calmspace-vjkj.onrender.com'], 
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());



app.use("/api/auth", authRoutes);
app.use("/api/diary", diaryRoutes);
app.use("/api/chat", chatRoutes);


// These paths are now correct because __dirname points to the project root
app.use(express.static(path.join(__dirname, "frontend", "dist")));


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
