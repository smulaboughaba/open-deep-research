import { GoogleGenerativeAI } from '@google/generative-ai';
import { experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';
import { customMiddleware } from './custom-middleware';

// Inicializar el cliente de Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

// Función para crear un modelo de Gemini
export const createGeminiModel = (modelId: string) => {
  const model = genAI.getGenerativeModel({ model: modelId });
  
  return wrapLanguageModel({
    model: {
      async complete(prompt: string) {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
      },
      async stream(prompt: string) {
        const result = await model.generateContentStream(prompt);
        return result.stream;
      }
    },
    middleware: customMiddleware,
  });
}; 