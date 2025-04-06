
import React from 'react';
import { Question } from '@/types/survey';
import QuestionBase from './QuestionBase';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface MultipleChoiceQuestionProps {
  question: Question;
  value: string;
  onChange: (questionId: string, value: string) => void;
}

const MultipleChoiceQuestion = ({ question, value, onChange }: MultipleChoiceQuestionProps) => {
  return (
    <QuestionBase question={question}>
      <RadioGroup 
        value={value || ""} 
        onValueChange={(value) => onChange(question.id, value)}
        className="space-y-2"
        dir="rtl"
      >
        {question.options?.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <RadioGroupItem value={option.id} id={option.id} />
            <Label htmlFor={option.id} className="cursor-pointer mr-2">{option.text}</Label>
          </div>
        ))}
      </RadioGroup>
    </QuestionBase>
  );
};

export default MultipleChoiceQuestion;
