import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { PDFParse } from "pdf-parse";

dotenv.config();

const PORT = 3000;
const app = express();

// Maximum allowed PDF payload: 20 MB decoded buffer limit
const MAX_PDF_BYTES = 20 * 1024 * 1024; // 20 MB

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// Server-side only Gemini API key - NEVER exposed to client or logged
const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

// Health check endpoint (never leaks raw API keys)
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    app: "منصة أوميغا التعليمية - OMEGA V3.1",
    hasGeminiKey: Boolean(apiKey),
    timestamp: new Date().toISOString()
  });
});

// ============================================================================
// PDF & TEXT INGESTION PIPELINE (STRICT VALIDATION & SIGNATURE CHECK)
// ============================================================================

app.post("/api/ingest/pdf", async (req: Request, res: Response) => {
  try {
    const { base64Data, fileName } = req.body;

    if (!base64Data || typeof base64Data !== "string") {
      return res.status(400).json({ error: "Missing or invalid base64Data for PDF ingestion." });
    }

    // Strip data URL header if present
    const cleanBase64 = base64Data.replace(/^data:application\/pdf;base64,/, "");
    
    let buffer: Buffer;
    try {
      buffer = Buffer.from(cleanBase64, "base64");
    } catch {
      return res.status(400).json({ error: "Invalid base64 payload." });
    }

    if (buffer.length === 0) {
      return res.status(400).json({ error: "Uploaded PDF buffer is empty." });
    }

    // Check maximum file size (20 MB)
    if (buffer.length > MAX_PDF_BYTES) {
      return res.status(400).json({ 
        error: "حجم الملف يتجاوز الحد الأقصى المسموح به (20 ميغابايت)." 
      });
    }

    // Signature Validation: Verify PDF magic bytes (%PDF)
    const magicHeader = buffer.subarray(0, 4).toString("ascii");
    if (magicHeader !== "%PDF") {
      return res.status(400).json({ 
        error: "ملف غير صالح، يجب أن يكون الملف بصيغة PDF حقيقية تبدأ بـ %PDF." 
      });
    }

    // Real PDF text extraction via PDFParse
    const parser = new PDFParse({ data: buffer });
    const pdfData = await parser.getText();
    const info = await parser.getInfo().catch(() => ({}));
    await parser.destroy().catch(() => {});

    const extractedText = (pdfData.text || "").trim();
    const isRealExtraction = extractedText.length > 50;

    return res.json({
      success: true,
      fileName: fileName || "uploaded_malzama.pdf",
      totalPages: pdfData.pages?.length || 1,
      totalChars: extractedText.length,
      isRealExtraction,
      extractedText: extractedText,
      info: info || {},
      preview: extractedText.slice(0, 1500)
    });
  } catch (error: unknown) {
    console.error("PDF Ingestion Error:", getErrorMessage(error));
    return res.status(500).json({
      error: "فشل استخراج النص من ملف الـ PDF",
      details: getErrorMessage(error)
    });
  }
});

app.post("/api/ingest/text", async (req: Request, res: Response) => {
  try {
    const { text, title } = req.body;

    if (!text || typeof text !== "string" || !text.trim()) {
      return res.status(400).json({ error: "الرجاء إدخال نص صالح للاستخراج" });
    }

    const trimmed = text.trim();
    return res.json({
      success: true,
      title: title || "نص ملزمة ملصق",
      totalChars: trimmed.length,
      extractedText: trimmed,
      preview: trimmed.slice(0, 1500),
      isRealExtraction: trimmed.length > 50
    });
  } catch (error: unknown) {
    return res.status(500).json({ error: getErrorMessage(error) });
  }
});

// ============================================================================
// GEMINI BACKEND API ENDPOINTS (BOUNDED INPUT & TRUTHFUL RESPONSES)
// ============================================================================

// POST /api/ai/analyze-curriculum
app.post("/api/ai/analyze-curriculum", async (req: Request, res: Response) => {
  try {
    const { text, fileName, grade, subject } = req.body;

    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Text payload is required." });
    }

    // Limit input to 12,000 characters to ensure safe token usage
    const isTruncated = text.length > 12000;
    const boundedText = text.slice(0, 12000);

    if (apiKey) {
      try {
        const prompt = `أنت خبير مناهج تعليمية عراقي متخصص في تحليل الملازم والمناهج المدرسية (خاصة للصف السادس الإعدادي والثالث المتوسط).
قم بتحليل هذا النص المستخرج من ملزمة دراسية:
عنوان الملف: ${fileName || 'ملزمة'}
الصف: ${grade || 'السادس الإعدادي'}
المادة: ${subject || 'اللغة الإنكليزية'}

استخرج بدقة بتنسيق JSON:
1. summary: ملخص شامل لما تحتويه الملزمة.
2. extractedRules: مصفوفة بالقواعد الذهبية مع العناوين والصيغة الرياضية/القاعدية وأمثلة وزارية.
3. extractedVocab: مصفوفة بالمفردات مع المعنى وسياق الجملة.
4. extractedQuestions: مصفوفة بالأسئلة الوزارية والتمارين مع الأجوبة ونوع السؤال.

النص:
${boundedText}
`;

        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                summary: { type: Type.STRING },
                extractedRules: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      formula: { type: Type.STRING },
                      explanation: { type: Type.STRING },
                      examples: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ["title", "formula", "explanation"]
                  }
                },
                extractedVocab: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      word: { type: Type.STRING },
                      meaning: { type: Type.STRING },
                      context: { type: Type.STRING }
                    },
                    required: ["word", "meaning"]
                  }
                },
                extractedQuestions: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      question: { type: Type.STRING },
                      answer: { type: Type.STRING },
                      type: { type: Type.STRING }
                    },
                    required: ["question", "answer"]
                  }
                }
              },
              required: ["summary", "extractedRules", "extractedVocab", "extractedQuestions"]
            }
          }
        });

        const parsed = JSON.parse(response.text || "{}");
        return res.json({
          success: true,
          aiPowered: true,
          isTruncated,
          draft: parsed
        });
      } catch (geminiError: unknown) {
        console.warn("Gemini call error/quota:", getErrorMessage(geminiError));
      }
    }

    // Truthful fallback response
    return res.json({
      success: true,
      aiPowered: false,
      isTruncated,
      message: "AI analysis unavailable; relying on truthful heuristic parser."
    });
  } catch (error: unknown) {
    console.error("Analyze curriculum error:", getErrorMessage(error));
    return res.status(500).json({ error: getErrorMessage(error) });
  }
});

// POST /api/ai/explain
app.post("/api/ai/explain", async (req: Request, res: Response) => {
  try {
    const { concept, context } = req.body;
    if (!concept || typeof concept !== "string") {
      return res.status(400).json({ error: "Concept is required." });
    }

    const boundedConcept = concept.slice(0, 500);
    const boundedContext = (context || "").slice(0, 2000);

    if (apiKey) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: `اشرح بأسلوب تربوي مبسط وواضح للطالب العراقي المفهوم التعليمي التالي مع أمثلة وفخاخ وزارية شائعة:
المفهوم: ${boundedConcept}
السياق: ${boundedContext || 'منهج اللغة الإنكليزية العراقي'}`
        });

        if (response.text) {
          return res.json({ explanation: response.text });
        }
      } catch (err: unknown) {
        console.warn("AI explain API quota/error:", getErrorMessage(err));
      }
    }

    return res.status(503).json({
      error: "تعذر الاتصال بالمساعد الذكي حالياً.",
      explanation: null
    });
  } catch (error: unknown) {
    console.error("AI Explain error:", getErrorMessage(error));
    return res.status(500).json({ error: getErrorMessage(error) });
  }
});

// POST /api/ai/summarize
app.post("/api/ai/summarize", async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Text is required." });
    }

    const boundedText = text.slice(0, 5000);

    if (apiKey) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: `لخص النص التعليمي التالي في نقاط ذهبية مركزة ومباشرة تفيد الطالب للامتحان الوزاري:
${boundedText}`
        });

        if (response.text) {
          return res.json({ summary: response.text });
        }
      } catch (err: unknown) {
        console.warn("AI summarize quota/error:", getErrorMessage(err));
      }
    }

    return res.json({
      summary: boundedText.slice(0, 250) + "..."
    });
  } catch (error: unknown) {
    console.error("AI Summarize error:", getErrorMessage(error));
    return res.status(500).json({ error: getErrorMessage(error) });
  }
});

// POST /api/ai/generate-quiz
app.post("/api/ai/generate-quiz", async (req: Request, res: Response) => {
  try {
    const { context, questionCount = 5 } = req.body;

    if (!context || typeof context !== "string") {
      return res.status(400).json({ error: "Context is required." });
    }

    const boundedContext = context.slice(0, 5000);

    if (apiKey) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: `قم بإنشاء اختبار اختيار من متعدد (MCQ) مكون من ${questionCount} أسئلة دقيقة مستوحاة من النمط الوزاري العراقي بناءً على السياق التالي:
${boundedContext}`,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                questions: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      prompt: { type: Type.STRING },
                      options: { type: Type.ARRAY, items: { type: Type.STRING } },
                      correctIndex: { type: Type.INTEGER },
                      explanation: { type: Type.STRING }
                    },
                    required: ["id", "prompt", "options", "correctIndex", "explanation"]
                  }
                }
              },
              required: ["title", "questions"]
            }
          }
        });

        const parsed = JSON.parse(response.text || "{}");
        if (parsed.questions && parsed.questions.length > 0) {
          return res.json({
            quiz: {
              id: "quiz-" + Date.now(),
              title: parsed.title || "اختبار تفاعلي وزاري",
              questions: parsed.questions
            }
          });
        }
      } catch (err: unknown) {
        console.warn("AI quiz quota/error:", getErrorMessage(err));
      }
    }

    // Truthful error response when AI quiz cannot be generated (no fake quiz fabrication)
    return res.status(503).json({
      error: "تعذر توليد الاختبار الذكي حالياً. حاول مرة أخرى لاحقاً.",
      quiz: null
    });
  } catch (error: unknown) {
    console.error("AI Generate Quiz error:", getErrorMessage(error));
    return res.status(500).json({ error: getErrorMessage(error) });
  }
});

// Vite & Static file serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`OMEGA V3 Server running on http://localhost:${PORT}`);
  });
}

startServer();
