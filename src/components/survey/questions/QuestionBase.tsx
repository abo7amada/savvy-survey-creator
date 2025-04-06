
import React from 'react';
import { Question } from '@/types/survey';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface QuestionBaseProps {
  question: Question;
  children: React.ReactNode;
}

const QuestionBase = ({ question, children }: QuestionBaseProps) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          {question.title}
          {question.required && (
            <span className="text-red-500 text-sm">*</span>
          )}
        </CardTitle>
        {question.description && (
          <p className="text-sm text-survey-textLight">{question.description}</p>
        )}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default QuestionBase;
