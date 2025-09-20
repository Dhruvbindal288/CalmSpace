import Mood from "../models/mood.model.js";


export const createMood = async (req, res) => {
  try {
    const { mood, note} = req.body;

    if (!mood) {
      return res.status(400).json({ message: "Mood is required" });
    }

    const moodEntry = await Mood.create({
      user: req.user._id,
      mood,
      note,
      date:  new Date(),
    });

    res.status(201).json(moodEntry);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user._id }).sort({ date: -1 });
    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getMood = async (req, res) => {
  try {
    const moodEntry = await Mood.findById(req.params.id);

    if (!moodEntry) {
      return res.status(404).json({ message: "Mood entry not found" });
    }

    if (moodEntry.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(moodEntry);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateMood = async (req, res) => {
  try {
    const moodEntry = await Mood.findById(req.params.id);

    if (!moodEntry) {
      return res.status(404).json({ message: "Mood entry not found" });
    }

    if (moodEntry.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { mood, note, date } = req.body;
    moodEntry.mood = mood || moodEntry.mood;
    moodEntry.note = note || moodEntry.note;
    moodEntry.date = date || moodEntry.date;

    const updatedMood = await moodEntry.save();
    res.json(updatedMood);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const deleteMood = async (req, res) => {
  try {
    const moodEntry = await Mood.findById(req.params.id);

    if (!moodEntry) {
      return res.status(404).json({ message: "Mood entry not found" });
    }

    if (moodEntry.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await moodEntry.deleteOne();
    res.json({ message: "Mood entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
