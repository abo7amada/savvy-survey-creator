
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { mockSurveys } from '@/data/mockSurveys';
import TextQuestion from '@/components/survey/questions/TextQuestion';
import MultipleChoiceQuestion from '@/components/survey/questions/MultipleChoiceQuestion';
import CheckboxQuestion from '@/components/survey/questions/CheckboxQuestion';
import RatingQuestion from '@/components/survey/questions/RatingQuestion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';

const SurveyPreview = () => {
  const { id } = useParams<{ id: string }>();
  const survey = mockSurveys.find(s => s.id === id);
  
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  
  if (!survey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-survey-background">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-survey-textLight">Survey not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
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
    // Validate required fields
    const requiredQuestions = survey.questions.filter(q => q.required);
    const unansweredRequired = requiredQuestions.filter(q => {
      const answer = answers[q.id];
      return !answer || (Array.isArray(answer) && answer.length === 0);
    });
    
    if (unansweredRequired.length > 0) {
      toast.error("Please answer all required questions");
      return;
    }
    
    // In a real app, this would submit to the backend
    console.log('Submitting answers:', answers);
    
    toast.success("Survey submitted successfully!");
    setAnswers({});
  };
  
  const renderQuestion = (question: typeof survey.questions[number]) => {
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
  
  return (
    <div className="min-h-screen py-8 px-4 bg-survey-background">
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
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SurveyPreview;
