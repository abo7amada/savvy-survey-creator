
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { surveyService } from '@/services/surveyService';
import { Survey } from '@/types/survey';
import { toast } from 'sonner';

export function useSurveys() {
  const queryClient = useQueryClient();

  const surveys = useQuery({
    queryKey: ['surveys'],
    queryFn: surveyService.getSurveys,
  });

  const createSurveyMutation = useMutation({
    mutationFn: (surveyData: Omit<Survey, 'id' | 'createdAt' | 'responses'>) => 
      surveyService.createSurvey(surveyData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['surveys'] });
      toast.success('تم إنشاء الاستبيان بنجاح');
    },
    onError: (error) => {
      console.error('Error creating survey:', error);
      toast.error('فشل في إنشاء الاستبيان');
    },
  });

  const deleteSurveyMutation = useMutation({
    mutationFn: (id: string) => surveyService.deleteSurvey(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['surveys'] });
      toast.success('تم حذف الاستبيان بنجاح');
    },
    onError: (error) => {
      console.error('Error deleting survey:', error);
      toast.error('فشل في حذف الاستبيان');
    },
  });

  return {
    surveys,
    isLoading: surveys.isLoading,
    createSurvey: createSurveyMutation.mutate,
    deleteSurvey: deleteSurveyMutation.mutate,
  };
}

export function useSurveyDetail(surveyId: string) {
  const queryClient = useQueryClient();

  const surveyDetail = useQuery({
    queryKey: ['survey', surveyId],
    queryFn: () => surveyService.getSurveyById(surveyId),
    enabled: !!surveyId,
  });

  const updateSurveyMutation = useMutation({
    mutationFn: (surveyData: Partial<Survey>) => 
      surveyService.updateSurvey(surveyId, surveyData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['survey', surveyId] });
      queryClient.invalidateQueries({ queryKey: ['surveys'] });
      toast.success('تم تحديث الاستبيان بنجاح');
    },
    onError: (error) => {
      console.error('Error updating survey:', error);
      toast.error('فشل في تحديث الاستبيان');
    },
  });

  return {
    survey: surveyDetail.data,
    isLoading: surveyDetail.isLoading,
    updateSurvey: updateSurveyMutation.mutate,
  };
}
