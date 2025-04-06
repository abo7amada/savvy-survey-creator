
import React from 'react';
import { Question } from '@/types/survey';
import QuestionBase from './QuestionBase';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface CheckboxQuestionProps {
  question: Question;
  value: string[];
  onChange: (questionId: string, value: string[]) => void;
}

const CheckboxQuestion = ({ question, value, onChange }: CheckboxQuestionProps) => {
  const handleCheckboxChange = (optionId: string, checked: boolean) => {
    const currentValues = value || [];
    
    if (checked) {
      onChange(question.id, [...currentValues, optionId]);
    } else {
      onChange(question.id, currentValues.filter(id => id !== optionId));
    }
  };

  return (
    <QuestionBase question={question}>
      <div className="space-y-2" dir="rtl">
        {question.options?.map((option) => (
          <div key={option.id} className="flex items-center">
            <Checkbox 
              id={option.id} 
              checked={(value || []).includes(option.id)}
              onCheckedChange={(checked) => 
                handleCheckboxChange(option.id, checked === true)
              }
            />
            <Label htmlFor={option.id} className="cursor-pointer mr-2">{option.text}</Label>
          </div>
        ))}
      </div>
    </QuestionBase>
  );
};

export default CheckboxQuestion;
