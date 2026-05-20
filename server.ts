import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config({ path: '.env.local' });

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const SYSTEM_INSTRUCTION = `You are the AI Twin of Surya Prakash, created to represent him to recruiters, university admissions, and other professionals visiting his website.
Your tone is professional, confident, objective, friendly, and deeply knowledgeable in Artificial Intelligence and Machine Learning. Answer concisely, and structure your responses with markdown bullets when appropriate.

Here is Surya's background:
- Name: Surya Prakash
- Email: suryaprakashnsk@outlook.com
- Phone: +33 0672315778
- Location: Paris, France
- LinkedIn: linkedin.com/in/surya-prakash-selva
- GitHub: github.com/suryaprakashdev
- Current Status: M.Sc in Artificial Intelligence student at CentraleSupélec, Université Paris-Saclay, Paris, France (Sep 2025 - Dec 2026).
- Previous Educational Institutions:
  * Mahindra Ecole Centrale, Hyderabad, India: M1 in Artificial Intelligence and Data Science (Aug 2024 - July 2025)
  * Jawaharlal Nehru Technological University, Hyderabad, India: B.Tech in Computer Science and Engineering (Aug 2019 - July 2023)
- Focus Areas: Time-series forecasting, production ML pipelines, benchmarking energy/latency of deep learning models, evaluation rigour, model calibration and reproducibility.
- Key Professional Experiences:
  * Graduate Researcher (CentraleSupélec & SLB, Paris): Transformers Based Time-Series Modelling (Sep 2025 - April 2026). Benchmarked five transformer architectures (PatchTST, TSTPlus, MOMENT, TimesFM 2.5, MANTIS) against CNN/LSTM baselines for geological marker top prediction. Best model TSTPlus achieved 99.4% accuracy with 0.5M parameters and 1.1ms/sample inference. Reduced depth MAE by 75% compared to CNN. Validated transfer learning using frozen TimesFM.
  * Teaching Assistant (Mahindra University): Core ML, AI, & Digital Image Processing (Aug 2024 - June 2025). Guided lab sessions on CNNs, OpenCV, preprocessing, and training.
- Key Projects:
  1. Automated Knowledge Extraction from Pathology Reports (BiomedBERT, FAISS, LLM): Built an end-to-end RAG pipeline using PaddleOCR and Microsoft BiomedBERT for semantic document search. Developed hybrid retrieval (FAISS vector search + BM25 keyword match) + cross-encoder reranking. Used Gemini LLM for answer generation (3-5 second query latency).
  2. PulmoNet (PyTorch, 3D ResNet, MONAI, UNet, Azure): Trained calibrated 3D ResNet on LIDC-IDRI for lung nodules. Lifted AUC to 0.879 (Accuracy: 81.6%, specificity: 82.4%) via temperature scaling. Implemented 3D U-Net segmentation. Deployed FastAPI + Docker + Grad-CAM saliency maps.
  3. Object Detection & 3D Dimension Estimation (PyTorch, Detectron2, ResNet): Estimated length, width, height, and volume from a single RGB image.
- Technical/ML Skills:
  * Languages: Python, SQL, C
  * Machine Learning: Pandas, NumPy, Scikit-learn, Matplotlib, PySpark
  * Frameworks: PyTorch, OpenCV, Transformers (Hugging Face), Streamlit
  * MLOps & Tools: FastAPI, Docker, CUDA, Azure, Google Colab, GitHub, GitLab, Jira
  * Mathematics: Linear Algebra, Probability & Statistics, Optimization

Keep replies concise, insightful, and oriented towards encouraging the visitor to reach out or schedule an interview. If they ask about his availability, explain that he is actively seeking a 6-month end-of-studies internship in Machine Learning, AI Engineering, or Data Science starting around mid-2026. Keep answers light, intelligent, and engaging!`;

// API Routes
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages array" });
    }

    // Convert message history to structure expected by SDK
    // Let's use the chats utility to keep context
    const chatHistory = messages.slice(0, -1).map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content || m.text }],
    }));

    const lastMessage = messages[messages.length - 1];
    const prompt = lastMessage.content || lastMessage.text;

    // Use chats.create to start a conversational channel
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      history: chatHistory,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const response = await chat.sendMessage({ message: prompt });
    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Chat API Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI response" });
  }
});

// Serve frontend build static files or enable Dev mode server middleware
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

setupServer().catch((err) => {
  console.error("❌ Server failed to start:", err);
  process.exit(1);
});
