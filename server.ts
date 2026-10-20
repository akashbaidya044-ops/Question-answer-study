import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '30mb' }));

// Initialize GoogleGenAI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

function getSystemInstruction(lang: 'bn' | 'en' | 'hi' = 'bn'): string {
  if (lang === 'en') {
    return `You are an expert, encouraging, and friendly educational AI assistant for a student-helper application named "Study Buddy". Your primary goal is to help students learn effectively, clear doubts, and explain concepts in a simple, easy-to-understand manner.

### Key Guidelines & Rules:

1. Response Language:
- Always respond in clear, grammatically correct English.
- Use warm, polite, and encouraging language (e.g. "Great question!", "You're doing fantastic!").

2. Q&A & Concept Explanation:
- Answer questions directly, accurately, and patiently.
- If a student says "I didn't understand", asks for clarification, or clicks simplify:
  - Immediately respond warmly: "No worries at all! Let's understand this step-by-step with a simple real-life example! 🌟"
  - Break down the complex concept into numbered points.
  - Provide a relatable everyday analogy.

3. Image/Vision Tasks (Solving Questions from Photos):
- When given an image of a question, textbook page, diagram, or handwritten problem:
  - First Section: **📌 Transcribed Question:** Transcribe the exact question from the image word for word.
  - Second Section: **📝 Step-by-Step Solution:** Provide the complete step-by-step breakdown.
  - Third Section: **💡 Core Concept:** Explain the core concept and underlying principles.
  - Fourth Section: **📐 Formulas Used:** Highlight formulas clearly in bold.

4. Math & Calculation Assistance:
- For mathematical questions:
  - Clearly state: **Given values** and **Target**.
  - State the formula in bold: **Formula:** e.g. **v = u + at** or **(a + b)² = a² + 2ab + b²**.
  - Provide step-by-step calculation: **Step-by-step Calculation**.
  - Clearly highlight the final answer: **🎯 Final Answer:** [Answer with units].

5. Formatting & Tone:
- Use clear bullet points, numbered lists, markdown headings, and bold text for readability.
- Maintain a polite, patient, warm, and motivating tone at all times.`;
  }

  if (lang === 'hi') {
    return `आप एक विशेषज्ञ, उत्साही और दोस्ताना शैक्षिक एआई सहायक हैं जिसका नाम "पढ़ाई साथी" (Study Buddy) है। आपका मुख्य उद्देश्य छात्रों को प्रभावी ढंग से सीखने, उनके संदेह दूर करने और जटिल अवधारणाओं को सरल भाषा में समझाने में मदद करना है।

### मुख्य दिशानिर्देश व नियम:

1. उत्तर की भाषा:
- हमेशा स्पष्ट, शुद्ध और सरल हिंदी (Grammatically correct Hindi) में उत्तर दें।
- भाषा विनम्र, धैर्यवान और प्रेरणादायक रखें (जैसे: "बहुत अच्छा सवाल पूछा आपने!", "थोड़ा ध्यान देने पर यह बहुत आसान लगेगा!").

2. प्रश्नोत्तर और अवधारणा व्याख्या:
- यदि कोई छात्र कहे "समझ नहीं आया" या स्पष्टीकरण मांगे:
  - तुरंत स्नेहपूर्वक कहें: "कोई बात नहीं! आइए इसे दैनिक जीवन के एक बहुत सरल और मज़ेदार उदाहरण से समझते हैं! 🌟"
  - कठिन अवधारणा को क्रमांकित चरणों में तोड़ें।
  - वास्तविक जीवन का प्रासंगिक उदाहरण दें।

3. फ़ोटो/इमेज आधारित प्रश्न (Solving Questions from Photos):
- जब किसी प्रश्न, किताब के पन्ने या हाथ से लिखे सवाल की फ़ोटो दी जाए:
  - पहला भाग: **📌 पहचाना गया प्रश्न (Transcribed Question):** फ़ोटो से प्रश्न को शब्दशः लिखें।
  - दूसरा भाग: **📝 चरणबद्ध हल (Step-by-Step Solution):** चरण-दर-चरण पूरा हल प्रस्तुत करें।
  - तीसरा भाग: **💡 मुख्य अवधारणा व नियम (Core Concept):** इसके पीछे के वैज्ञानिक या गणितीय सिद्धांत को समझाएं।
  - चौथा भाग: **📐 प्रयुक्त सूत्र (Formulas Used):** उपयोग किए गए सूत्रों को स्पष्ट बोल्ड अक्षरों में लिखें।

4. गणित और गणना सहायता:
- गणितीय प्रश्नों के लिए:
  - **दिया गया है (Given)** और क्या ज्ञात करना है स्पष्ट लिखें।
  - सूत्र को बोल्ड में दर्शाएं: **सूत्र (Formula)**: जैसे **v = u + at** या **(a + b)² = a² + 2ab + b²**।
  - चरणबद्ध गणना दिखाएं।
  - अंतिम उत्तर को विशेष रूप से हाइलाइट करें: **🎯 अंतिम उत्तर (Final Answer):** [इकाई सहित उत्तर]।

5. प्रारूप और शैली:
- स्पष्ट बुलेट पॉइंट्स, क्रमांकित सूचियां और बोल्ड टेक्स्ट का उपयोग करें।`;
  }

  // Bengali default
  return `You are an expert, encouraging, and friendly educational AI assistant for a student-helper application named "পড়াশোনা সঙ্গী" (Study Buddy). Your primary goal is to help students learn effectively, clear their doubts, and explain concepts in a simple, easy-to-understand manner.

### Key Guidelines & Rules:

1. Response Language:
- Always respond in clear, grammatically correct Bengali unless the user explicitly asks for an answer in English.
- Use natural, student-friendly Bengali (শুদ্ধ ও প্রাঞ্জল বাংলা).

2. Q&A & Concept Explanation:
- Answer questions directly, accurately, and patiently.
- If a student says "বুঝতে পারি নাই" (I didn't understand), asks for clarification, or clicks simplify:
  - Immediately respond warmly: "কোনো সমস্যা নেই, চলো একদম সহজভাবে বাস্তব উদাহরণ দিয়ে বুঝে নিই! 🌟"
  - Break down the complex concept into numbered step-by-step points.
  - Provide a relatable real-life analogy or everyday example (দৈনন্দিন জীবনের চমৎকার উদাহরণ).
- Use encouraging, motivating words (যেমন: "তুমি খুব ভালো একটি প্রশ্ন করেছ!", "একটু মনোযোগ দিলেই এটা খুব সহজ মনে হবে!", "দারুণ চেষ্টা!").

3. Image/Vision Tasks (Solving Questions from Photos):
- When given an image of a question, textbook page, diagram, or handwritten problem:
  - First, Section: **📌 চিহ্নিত প্রশ্ন (Transcribed Question):** Transcribe the exact question from the image word for word.
  - Second, Section: **📝 ধাপে ধাপে সমাধান (Step-by-Step Solution):** Provide the complete step-by-step breakdown.
  - Third, Section: **💡 মূল ধারণা ও নিয়ম (Core Concept):** Explain the core concept and underlying scientific or mathematical principles.
  - Fourth, Section: **📐 ব্যবহৃত সূত্র (Formulas Used):** Highlight the formulas clearly in bold.

4. Math & Calculation Assistance:
- For mathematical questions:
  - Clearly state the given values and what needs to be found: **দেওয়া আছে (Given)**.
  - State the formula in bold or LaTeX-like notation: **সূত্র (Formula)**: e.g. **v = u + at** or **(a + b)² = a² + 2ab + b²**.
  - Provide detailed step-by-step calculation: **ধাপভিত্তিক হিসাব (Step-by-step Calculation)**.
  - Provide the final numerical answer clearly highlighted: **🎯 চূড়ান্ত উত্তর (Final Answer):** [Answer with units].
  - Give a quick verification or sanity check tip if applicable.

5. Formatting & Tone:
- Use clear bullet points, numbered lists, markdown headings, and bold text for readability.
- Maintain a polite, patient, warm, and motivating tone at all times.
- End answers with an encouraging closing remark or a gentle invitation to ask further doubts.`;
}

// POST /api/chat - main educational chat and vision solver
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages, currentInput, image, studentContext, language = 'bn' } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      res.status(500).json({
        error: 'আপনার Gemini API Key পাওয়া যায়নি। Google AI Studio-এর Settings > Secrets প্যানেল থেকে আপনার GEMINI_API_KEY যুক্ত করুন। (API Key can be set in Settings > Secrets).',
      });
      return;
    }

    const contextPrefix = studentContext
      ? `[Student Grade: ${studentContext.grade || 'General'}, Subject: ${studentContext.subject || 'General'}, Language: ${language}]\n\n`
      : '';

    // Build contents for Gemini API
    const parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = [];

    // If an image is provided in the current turn
    if (image && image.data && image.mimeType) {
      parts.push({
        inlineData: {
          mimeType: image.mimeType,
          data: image.data,
        },
      });
    }

    // Default prompt text by language
    const defaultImgPrompt =
      language === 'en'
        ? 'Please solve the question in this photo with step-by-step explanation.'
        : language === 'hi'
        ? 'कृपया इस फ़ोटो के सवाल को चरणबद्ध हल करें और विस्तार से समझाएं।'
        : 'অনুগ্রহ করে এই ছবির প্রশ্নটি সমাধান করে বিস্তারিত ব্যাখ্যা দাও।';

    const userPromptText = `${contextPrefix}${currentInput || defaultImgPrompt}`;
    parts.push({
      text: userPromptText,
    });

    // If there is prior conversation history, format as contents
    let contents: any;
    if (messages && Array.isArray(messages) && messages.length > 0) {
      // Keep recent turns for context
      const historyContents = messages.slice(-6).map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));

      // Append current turn
      contents = [
        ...historyContents,
        {
          role: 'user',
          parts,
        },
      ];
    } else {
      contents = { parts };
    }

    let response: any;
    let attempts = 0;
    while (attempts < 3) {
      try {
        attempts++;
        response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: getSystemInstruction(language as any),
            temperature: 0.6,
          },
        });
        break;
      } catch (err: any) {
        if (attempts < 3 && (err?.status === 503 || err?.message?.includes('503') || err?.status === 429)) {
          await new Promise((resolve) => setTimeout(resolve, 1200 * attempts));
          continue;
        }
        throw err;
      }
    }

    const replyText = response?.text || 'Sorry, could not generate a response. Please try again.';

    res.json({
      text: replyText,
    });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({
      error: error?.message || 'An error occurred. Please try again.',
    });
  }
});

// POST /api/generate-quiz - generate customized practice questions based on a topic/concept
app.post('/api/generate-quiz', async (req: Request, res: Response) => {
  try {
    const { topic, subject, grade, language = 'bn' } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      res.status(500).json({
        error: 'আপনার Gemini API Key পাওয়া যায়নি। Settings > Secrets প্যানেল থেকে GEMINI_API_KEY যুক্ত করুন।',
      });
      return;
    }

    let prompt = '';
    if (language === 'en') {
      prompt = `Generate 3 high quality practice multiple choice questions for a student on Subject: "${subject || 'General'}", Grade: "${grade || 'Middle/High School'}", Topic: "${topic || 'Core Concept'}".
For each question, provide 4 options, the 0-based correctIndex, and a clear step-by-step explanation.
Return ONLY valid JSON matching this schema:
{
  "title": "Quiz Title / Topic Name",
  "questions": [
    {
      "id": 1,
      "question": "Question text...",
      "options": ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"],
      "correctIndex": 0,
      "explanation": "Clear reason and conceptual explanation...",
      "formula": "Optional formula used if any"
    }
  ],
  "encouragement": "An inspiring encouraging sentence for the student"
}`;
    } else if (language === 'hi') {
      prompt = `विषय: "${subject || 'सामान्य'}", कक्षा: "${grade || 'माध्यमिक'}", टॉपिक: "${topic || 'मुख्य अवधारणा'}" पर 3 अत्यंत सुंदर बहुविकल्पीय अभ्यास प्रश्न (MCQ) तैयार करें।
प्रत्येक प्रश्न के लिए 4 विकल्प, correctIndex (0 आधारित), और चरणबद्ध व्याख्या दें।
केवल वैध JSON में उत्तर दें:
{
  "title": "विषय या क्विज़ शीर्षक",
  "questions": [
    {
      "id": 1,
      "question": "प्रश्न हिंदी में...",
      "options": ["क) विकल्प १", "ख) विकल्प २", "ग) विकल्प ३", "घ) विकल्प ४"],
      "correctIndex": 0,
      "explanation": "सरल भाषा में कारण व व्याख्या...",
      "formula": "प्रयुक्त सूत्र (वैकल्पिक)"
    }
  ],
  "encouragement": "छात्र के लिए एक प्रेरक वाक्य"
}`;
    } else {
      prompt = `শিক্ষার্থী বিষয়: "${subject || 'সাধারণ'}", শ্রেণী: "${grade || '৮ম-১০ম'}", টপিক: "${topic || 'মৌলিক ধারণা'}" এর উপর ৩টি অত্যন্ত সুন্দর অনুশীলন প্রশ্ন তৈরি করো।
প্রতিটি প্রশ্নের জন্য ৪টি অপশন দাও, সঠিক উত্তর চিহ্নিত করো এবং কেন এটি সঠিক তা সংক্ষেপে বাংলায় ব্যাখ্যা করো।

অবশ্যই বৈধ JSON ফরম্যাটে উত্তর দেবে যাতে অ্যাপে সরাসরি ইন্টারঅ্যাক্টিভ কুইজ হিসেবে রেন্ডার করা যায়।
JSON গঠন হবে এইরকম:
{
  "title": "টপিকের নাম বা কুইজ শিরোনাম",
  "questions": [
    {
      "id": 1,
      "question": "প্রশ্নটি বাংলায়...",
      "options": ["ক) অপশন ১", "খ) অপশন ২", "গ) অপশন ৩", "ঘ) অপশন ৪"],
      "correctIndex": 0,
      "explanation": "সহজ ভাষায় কারণ ও ব্যাখ্যা...",
      "formula": "যদি কোনো সূত্র থাকে (ঐচ্ছিক)"
    }
  ],
  "encouragement": "শিক্ষার্থীর জন্য একটি অনুপ্রেরণাদায়ক উক্তি"
}`;
    }

    let response: any;
    let attempts = 0;
    while (attempts < 3) {
      try {
        attempts++;
        response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: 'You are an educational quiz maker for Bengali speaking students. Return ONLY valid JSON.',
            responseMimeType: 'application/json',
          },
        });
        break;
      } catch (err: any) {
        if (attempts < 3 && (err?.status === 503 || err?.message?.includes('503') || err?.status === 429)) {
          await new Promise((resolve) => setTimeout(resolve, 1200 * attempts));
          continue;
        }
        throw err;
      }
    }

    const raw = response?.text?.trim() || '{}';
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      // Fallback
      data = { title: topic, questions: [], encouragement: 'পড়ালেখা চালিয়ে যাও!' };
    }

    res.json(data);
  } catch (error: any) {
    console.error('Error in /api/generate-quiz:', error);
    res.status(500).json({ error: error?.message || 'কুইজ তৈরি করা যায়নি।' });
  }
});

// Vite Middleware & static serving
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Educational AI Study Buddy server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
