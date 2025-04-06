
import React from 'react';
import { Question } from '@/types/survey';
import QuestionBase from './QuestionBase';
import { Textarea } from '@/components/ui/textarea';

interface TextQuestionProps {
  question: Question;
  value: string;
  onChange: (questionId: string, value: string) => void;
}

const TextQuestion = ({ question, value, onChange }: TextQuestionProps) => {
  return (
    <QuestionBase question={question}>
      <Textarea 
        placeholder="اكتب إجابتك هنا" 
        value={value || ""} 
        onChange={(e) => onChange(question.id, e.target.value)} 
        className="w-full resize-none"
        dir="rtl"
      />
    </QuestionBase>
  );
};

export default TextQuestion;
