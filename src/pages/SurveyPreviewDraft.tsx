
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TextQuestion from '@/components/survey/questions/TextQuestion';
import MultipleChoiceQuestion from '@/components/survey/questions/MultipleChoiceQuestion';
import CheckboxQuestion from '@/components/survey/questions/CheckboxQuestion';
import RatingQuestion from '@/components/survey/questions/RatingQuestion';
import { Question, QuestionType } from '@/types/survey';
import { toast } from 'sonner';

interface SurveyPreview {
  title: string;
  description: string;
  questions: Question[];
}

const SurveyPreviewDraft = () => {
  const [survey, setSurvey] = useState<SurveyPreview | null>(null);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  
  useEffect(() => {
    // Get the survey preview from localStorage
    const savedPreview = localStorage.getItem('surveyPreview');
    if (savedPreview) {
      try {
        setSurvey(JSON.parse(savedPreview));
      } catch (error) {
        console.error('Failed to parse survey preview', error);
        toast.error('فشل في تحميل معاينة الاستبيان');
      }
    }
  }, []);
  
  const handleTextChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  const handleMultipleChoiceChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  const handleCheckboxChange = (questionId: string, values: string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: values
    }));
  };
  
  const handleSubmit = () => {
    if (!survey) return;
    
    // Validate required fields
    const requiredQuestions = survey.questions.filter(q => q.required);
    const unansweredRequired = requiredQuestions.filter(q => {
      const answer = answers[q.id];
      return !answer || (Array.isArray(answer) && answer.length === 0);
    });
    
    if (unansweredRequired.length > 0) {
      toast.error("يرجى الإجابة على جميع الأسئلة المطلوبة");
      return;
    }
    
    // In a real scenario, this would be submitted to an API
    console.log('تقديم الإجابات (معاينة):', answers);
    toast.success("تمت معاينة الاستبيان بنجاح!");
    setAnswers({});
  };
  
  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'text':
        return (
          <TextQuestion 
            question={question} 
            value={answers[question.id] as string || ''} 
            onChange={handleTextChange} 
          />
        );
      case 'multipleChoice':
        return (
          <MultipleChoiceQuestion 
            question={question}
            value={answers[question.id] as string || ''} 
            onChange={handleMultipleChoiceChange}
          />
        );
      case 'checkbox':
        return (
          <CheckboxQuestion 
            question={question}
            value={answers[question.id] as string[] || []} 
            onChange={handleCheckboxChange}
          />
        );
      case 'rating':
        return (
          <RatingQuestion 
            question={question}
            value={answers[question.id] as string || ''} 
            onChange={handleTextChange}
          />
        );
      default:
        return null;
    }
  };
  
  if (!survey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-survey-background" dir="rtl">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-survey-textLight">لا يوجد استبيان للمعاينة</p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-8 px-4 bg-survey-background" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-center">{survey.title}</CardTitle>
            {survey.description && (
              <p className="text-center text-survey-textLight">{survey.description}</p>
            )}
          </CardHeader>
        </Card>
        
        <div className="space-y-4">
          {survey.questions.map(question => (
            <div key={question.id}>
              {renderQuestion(question)}
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button 
            className="bg-survey-primary hover:bg-survey-accent px-8"
            onClick={handleSubmit}
          >
            إرسال
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SurveyPreviewDraft;
