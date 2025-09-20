import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/lib/db.js";
dotenv.config();
import authRouter from './src/routes/auth.route.js'
import diaryRouter from './src/routes/diary.route.js'
import moodRouter from './src/routes/mood.route.js'
import quoteRouter from './src/routes/quote.route.js'
import chatRouter from './src/routes/chat.route.js'
import cookieParser from "cookie-parser";

const app = express();


app.use(cors({origin:'http://localhost:5173',credentials:true}));
app.use(express.json());
app.use(cookieParser())
app.use('/api/auth',authRouter)
app.use('/api/diary',diaryRouter)
app.use('/api/mood',moodRouter)
app.use('/api/quote',quoteRouter)
app.use('/api/chat',chatRouter)


connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
