
import { GoogleGenAI, GenerateContentResponse, SystemInstruction } from "@google/genai";
import { GEMINI_MODEL_TEXT } from '../constants';

interface ChatHistoryItem {
  role: 'user' | 'model';
  content: string;
}

const getGeminiClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set. Please provide it for Gemini API access.");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export async function generateText(
  prompt: string,
  history: ChatHistoryItem[] = [],
  systemInstruction?: string,
): Promise<string> {
  const ai = getGeminiClient();

  const model = GEMINI_MODEL_TEXT;

  const contents = history.map(item => ({
    role: item.role,
    parts: [{ text: item.content }],
  }));

  contents.push({
    role: 'user',
    parts: [{ text: prompt }],
  });

  try {
    const config: { systemInstruction?: SystemInstruction } = {};
    if (systemInstruction) {
      config.systemInstruction = { parts: [{ text: systemInstruction }] };
    }

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: contents,
      config: config,
    });

    const text = response.text;
    if (!text) {
      console.warn("Gemini API returned an empty response text.");
      return "عذراً، لم أتمكن من توليد استجابة واضحة في هذه اللحظة. الرجاء المحاولة مرة أخرى أو إعادة صياغة سؤالك.";
    }
    return text;
  } catch (error: any) {
    console.error("Gemini API call failed:", error);
    // Basic error handling to provide a user-friendly message
    if (error.status === 400) {
      return "عذراً، يبدو أن هناك مشكلة في طلبك. الرجاء التأكد من صحة السؤال.";
    } else if (error.status === 403) {
      return "عذراً، ليس لديك الصلاحية للوصول إلى هذه الخدمة. يرجى التحقق من مفتاح API الخاص بك.";
    } else if (error.status === 429) {
      return "عذراً، تجاوزت الحد الأقصى لعدد الطلبات. الرجاء المحاولة بعد قليل.";
    } else if (error.status === 500) {
      return "عذراً، توجد مشكلة في الخادم. الرجاء المحاولة لاحقاً.";
    }
    return `حدث خطأ غير متوقع: ${error.message || 'الرجاء المحاولة مرة أخرى لاحقاً.'}`;
  }
}
