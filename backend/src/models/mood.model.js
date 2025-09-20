import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, 
  },
  date: {
    type: Date,
    required: true, 
  },
  mood: {
    type: String,
    required: true,
    enum: ["😊", "😐", "😞", "😡", "😍"], 
  },
  note: {
    type: String, 
    trim: true,
  },
});

const Mood = mongoose.model("Mood", moodSchema);
export default Mood;
