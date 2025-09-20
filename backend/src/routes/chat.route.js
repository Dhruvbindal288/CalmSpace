import express from "express";
import axios from "axios";
import protectRoute from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protectRoute);

router.post("/", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message is required." });
    }

   
    const model = "meta-llama/Meta-Llama-3-8B-Instruct";


    const messages = [
      {
        role: "system",
        content: `You are a caring and supportive best friend. Always reply with encouragement and positivity. Keep answers short: 1-3 lines max. Never give medical advice.`,
      },

      ...history.map((msg, index) => ({
        role: index % 2 === 0 ? "user" : "assistant",
        content: msg,
      })),
      {
        role: "user",
        content: message,
      },
    ];

   
    const hfRes = await axios.post(
      "https://router.huggingface.co/v1/chat/completions",
      {
        model: model,
        messages: messages,
        max_tokens: 80,
        temperature: 0.8,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
        timeout: 60000,
      }
    );

   
    const replyText = hfRes.data.choices[0]?.message?.content || "I'm not sure how to respond to that.";

    

    return res.json({ reply: replyText });

  } catch (err) {
    console.error("==================== CHAT ERROR ====================");
    console.error("Error Message:", err.message);
    if (err.response) {
      console.error("Error Status:", err.response.status);
      console.error("Error Details from API:", err.response.data);
    }
    console.error("====================================================");

    if (err.response?.status === 429) {
      return res.status(429).json({ error: "Hugging Face rate limit reached. Try again later." });
    }
    return res.status(500).json({ error: "An internal server error occurred." });
  }
});

export default router;
