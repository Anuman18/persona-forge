import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

router.post('/generate', async (req, res) => {
  try {
    const { name, profession, skills, tone } = req.body;
    const prompt = `
    Generate a unique LinkedIn bio for:
    - Name: ${name}
    - Profession: ${profession}
    - Skills: ${skills}
    - Tone: ${tone}
    `;

    console.log("🔍 Prompt:", prompt);
    console.log("🔑 Using API Key:", process.env.GEMINI_API_KEY?.slice(0, 5)); // mask full key

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    res.json({ result: response });
  } catch (err: any) {
    console.error("❌ Gemini Error:", err.message);
    res.status(500).json({ error: 'Gemini API failed' });
  }
});

export { router };