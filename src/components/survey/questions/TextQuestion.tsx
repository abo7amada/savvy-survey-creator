
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
        placeholder="Type your answer here" 
        value={value || ""} 
        onChange={(e) => onChange(question.id, e.target.value)} 
        className="w-full resize-none"
      />
    </QuestionBase>
  );
};

export default TextQuestion;
