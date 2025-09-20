import mongoose from "mongoose";

const diarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, 
    },
    title: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  
  { timestamps: true }
);

const Diary = mongoose.model("Diary", diarySchema);
export default Diary;
