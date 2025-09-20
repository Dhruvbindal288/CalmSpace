import Diary from "../models/diary.model.js";


export const createDiary = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const diary = await Diary.create({
      user: req.user._id,
      title,
      content,
    });

    res.status(201).json(diary);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getDiaries = async (req, res) => {
  try {
    const diaries = await Diary.find({ user: req.user._id }).sort({ _id: -1 });
    res.json(diaries);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getDiary = async (req, res) => {
  try {
    const diary = await Diary.findById(req.params.id);

    if (!diary) {
      return res.status(404).json({ message: "Diary entry not found" });
    }

   
    if (diary.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(diary);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const updateDiary = async (req, res) => {
  try {
    const diary = await Diary.findById(req.params.id);

    if (!diary) {
      return res.status(404).json({ message: "Diary entry not found" });
    }

    if (diary.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { title, content } = req.body;
    diary.title = title || diary.title;
    diary.content = content || diary.content;

    const updatedDiary = await diary.save();
    res.json(updatedDiary);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const deleteDiary = async (req, res) => {
  try {
    const diary = await Diary.findById(req.params.id);

    if (!diary) {
      return res.status(404).json({ message: "Diary entry not found" });
    }

    if (diary.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await diary.deleteOne();
    res.json({ message: "Diary entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
