export interface GeneratedContent {
  landingPageHTML: string;
  thumbnailPrompt: string;
}

export interface GeneratorState {
  topic: string;
  adLink: string;
  isLoading: boolean;
  error: string | null;
  result: GeneratedContent | null;
}

export enum Step {
  INPUT = 'INPUT',
  GENERATING = 'GENERATING',
  RESULT = 'RESULT'
}