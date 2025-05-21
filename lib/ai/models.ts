// Define your models here.

export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  description: string;
}

export const models: Array<Model> = [
  {
    id: 'gemini-2.0-flash',
    label: 'IA Flash',
    apiIdentifier: 'gemini-2.0-flash',
    description: 'Modelo rápido y multimodal',
  }
] as const;

export const reasoningModels: Array<Model> = [
  {
    id: 'gemini-2.0-flash',
    label: 'IA Flash',
    apiIdentifier: 'gemini-2.0-flash',
    description: 'Para razonamiento profundo y tareas multimodales',
  }
] as const;

export const DEFAULT_MODEL_NAME: string = 'gemini-2.0-flash';
export const DEFAULT_REASONING_MODEL_NAME: string = 'gemini-2.0-flash';
