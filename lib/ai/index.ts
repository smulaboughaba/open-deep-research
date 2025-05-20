import { GoogleGenerativeAI } from '@google/generative-ai';
import { experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';
import { customMiddleware } from "./custom-middleware";

// Configuración de modelos de razonamiento
const VALID_REASONING_MODELS = [
  'gemini-pro',
  'gemini-pro-vision'
] as const;

// Modelos que soportan salida JSON
const JSON_SUPPORTED_MODELS = ['gemini-pro'] as const;

// Helper para verificar si el modelo soporta JSON
export const supportsJsonOutput = (modelId: string) =>
  JSON_SUPPORTED_MODELS.includes(modelId as typeof JSON_SUPPORTED_MODELS[number]);

// Obtener modelo de razonamiento desde variables de entorno
const REASONING_MODEL = process.env.REASONING_MODEL || 'gemini-pro';
const BYPASS_JSON_VALIDATION = process.env.BYPASS_JSON_VALIDATION === 'true';

// Helper para obtener el modelo de razonamiento basado en el modelo seleccionado por el usuario
function getReasoningModel(modelId: string) {
  if (VALID_REASONING_MODELS.includes(modelId as typeof VALID_REASONING_MODELS[number])) {
    return modelId;
  }

  const configuredModel = REASONING_MODEL;

  if (!VALID_REASONING_MODELS.includes(configuredModel as typeof VALID_REASONING_MODELS[number])) {
    const fallback = 'gemini-pro';
    console.warn(`Invalid REASONING_MODEL "${configuredModel}", falling back to ${fallback}`);
    return fallback;
  }

  if (!BYPASS_JSON_VALIDATION && !supportsJsonOutput(configuredModel)) {
    console.warn(`Warning: Model ${configuredModel} does not support JSON schema. Set BYPASS_JSON_VALIDATION=true to override`);
  }

  return configuredModel;
}

export const customModel = (apiIdentifier: string, forReasoning: boolean = false) => {
  const modelId = forReasoning ? getReasoningModel(apiIdentifier) : apiIdentifier;
  
  // Inicializar la API de Gemini
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
  
  // Obtener el modelo
  const model = genAI.getGenerativeModel({ model: modelId });

  console.log("Using Gemini model:", modelId);

  return wrapLanguageModel({
    model,
    middleware: customMiddleware,
  });
};
