// Define your models here.

export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  description: string;
}

export const models: Array<Model> = [
  {
    id: 'gemini-pro',
    label: 'IA Pro',
    apiIdentifier: 'gemini-pro',
    description: 'IA Pro',
  },
  {
    id: 'gemini-pro-vision',
    label: 'IA Vision',
    apiIdentifier: 'gemini-pro-vision',
    description: 'IA Vision',
  }
] as const;

export const reasoningModels: Array<Model> = [
  {
    id: 'gemini-pro',
    label: 'IA Pro',
    apiIdentifier: 'gemini-pro',
    description: 'IA Pro',
  }
] as const;

export const DEFAULT_MODEL_NAME: string = 'gemini-pro';
export const DEFAULT_REASONING_MODEL_NAME: string = 'gemini-pro';
