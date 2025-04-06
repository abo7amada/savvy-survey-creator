
export type QuestionType = 'text' | 'multipleChoice' | 'checkbox' | 'dropdown' | 'rating';

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  title: string;
  type: QuestionType;
  required: boolean;
  options?: Option[];
  description?: string;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  createdAt: Date;
  responses: number;
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  answers: {
    questionId: string;
    answer: string | string[];
  }[];
  submittedAt: Date;
}
