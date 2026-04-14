import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/translate", async (req, res) => {
    try {
      const { text } = req.body;
      if (!text) {
        return res.json({ es: "", fr: "" });
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `Translate the following English text into Spanish and French. 
      Return ONLY a valid JSON object with 'es' and 'fr' keys containing the translations. Do not include markdown formatting like \`\`\`json.
      Text: "${text}"`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });

      if (response.text) {
        let cleanText = response.text.trim();
        if (cleanText.startsWith('```json')) {
          cleanText = cleanText.replace(/```json\n?/, '').replace(/```$/, '').trim();
        } else if (cleanText.startsWith('```')) {
          cleanText = cleanText.replace(/```\n?/, '').replace(/```$/, '').trim();
        }
        
        const result = JSON.parse(cleanText);
        return res.json({
          es: result.es || "",
          fr: result.fr || ""
        });
      }
      return res.json({ es: "", fr: "" });
    } catch (error) {
      console.error("Translation error:", error);
      return res.status(500).json({ es: "Error", fr: "Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    
    // Serve static assets with long cache since they have hashes in filenames
    app.use(express.static(distPath, {
      maxAge: '1y',
      etag: true,
      index: false // We'll handle index.html separately to control its cache
    }));

    // Serve index.html with NO CACHE to ensure users always get the latest version
    app.get('*', (req, res) => {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
