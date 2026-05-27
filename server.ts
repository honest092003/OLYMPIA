import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini client if API key is provided, handle gracefully if not
  const apiKey = process.env.GEMINI_API_KEY;
  let aiClient: GoogleGenAI | null = null;
  if (apiKey) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }

  // API Route for AI Bodybuilding Coach / Routine Builder
  app.post("/api/coach", async (req, res) => {
    try {
      if (!process.env.GEMINI_API_KEY) {
        return res.status(400).json({
          error: "GEMINI_API_KEY environment variable is not configured. Please add it in Settings > Secrets."
        });
      }

      const { athleteName, athleteDivision, userExperience, fitnessGoal, focusMuscle, userPrompt } = req.body;

      let prompt = `You are a dynamic, prestigious IFBB Pro K-bodybuilder and elite fitness expert: ${athleteName}. `;
      prompt += `Your competitive division is ${athleteDivision}. `;
      prompt += `A passionate trainee has requested your elite guidance with the following profile:
- Experience Level: ${userExperience}
- Primary Fitness Goal: ${fitnessGoal}
- Target Muscle Group Focus: ${focusMuscle}
- Special Notes / Additional requests: ${userPrompt || "None"}

Please design an elite, high-intensity training routine and performance nutrition guideline in character as ${athleteName}. Use a highly motivational, intense, yet structured K-bodybuilder champion voice. Include plenty of bodybuilder grit ('근성', '득근', 'No pain no gain', etc.).

Structure the response beautifully in clean Markdown with:
1. 🏆 MOTIVATIONAL OPENING: A short, intense text in character as ${athleteName} to pump them up for the gym.
2. 🏋️‍♂️ ELITE WORKOUT ROUTINE: A precise, high-volume exercise plan (names, sets, reps, and unique dynamic intensity techniques like Drop Sets, Giant Sets, Rest-Pause, or Peak Contraction).
3. 🥩 CHAMPION FUEL & RECOVERY: Customized advice for pre/post workout nutrition and overall supplementation.
4. 🔥 CHAMPION'S MINDSET QUOTE: A powerful closing statement on grit, discipline, or mental toughness.

The response MUST be written in Korean, formatted beautifully for web rendering with high readability. Avoid bullet lists with no detail, make it highly actionable.`;

      if (!aiClient) {
        aiClient = new GoogleGenAI({
          apiKey: process.env.GEMINI_API_KEY,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            }
          }
        });
      }

      const response = await aiClient.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      res.json({ text: response.text });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message || "Failed to generate coaching response" });
    }
  });

  // API Route for Newsletter Registration
  app.post("/api/subscribe", (req, res) => {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(400).json({ success: false, error: "올바른 이메일 주소를 입력해 주세요." });
    }
    return res.json({
      success: true,
      message: `인텔 뉴스레터 구독을 축하합니다! ${email} 주소로 최신 트레이닝 가이드와 대회 소식이 발송됩니다.`
    });
  });

  // Vite middleware for development (Express v4 format app.use, etc.)
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
