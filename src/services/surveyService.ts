
import api from './api';
import { Survey, Question, SurveyResponse } from '@/types/survey';

export const surveyService = {
  // Get all surveys
  getSurveys: async (): Promise<Survey[]> => {
    const response = await api.get('/surveys/');
    return response.data;
  },
  
  // Get a single survey by ID
  getSurveyById: async (id: string): Promise<Survey> => {
    const response = await api.get(`/surveys/${id}/`);
    return response.data;
  },
  
  // Create a new survey
  createSurvey: async (surveyData: Omit<Survey, 'id' | 'createdAt' | 'responses'>): Promise<Survey> => {
    const response = await api.post('/surveys/', surveyData);
    return response.data;
  },
  
  // Update an existing survey
  updateSurvey: async (id: string, surveyData: Partial<Survey>): Promise<Survey> => {
    const response = await api.put(`/surveys/${id}/`, surveyData);
    return response.data;
  },
  
  // Delete a survey
  deleteSurvey: async (id: string): Promise<void> => {
    await api.delete(`/surveys/${id}/`);
  },
  
  // Submit survey responses
  submitResponse: async (
    surveyId: string, 
    answers: { questionId: string; answer: string | string[] }[]
  ): Promise<SurveyResponse> => {
    const response = await api.post(`/surveys/${surveyId}/responses/`, { answers });
    return response.data;
  },
  
  // Get all responses for a survey
  getSurveyResponses: async (surveyId: string): Promise<SurveyResponse[]> => {
    const response = await api.get(`/surveys/${surveyId}/responses/`);
    return response.data;
  }
};
