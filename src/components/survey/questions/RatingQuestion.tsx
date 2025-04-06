
import React from 'react';
import { Question } from '@/types/survey';
import QuestionBase from './QuestionBase';
import { cn } from '@/lib/utils';

interface RatingQuestionProps {
  question: Question;
  value: string;
  onChange: (questionId: string, value: string) => void;
}

const RatingQuestion = ({ question, value, onChange }: RatingQuestionProps) => {
  const ratings = [1, 2, 3, 4, 5];
  const selectedRating = parseInt(value) || 0;
  
  return (
    <QuestionBase question={question}>
      <div className="flex items-center gap-2">
        {ratings.map((rating) => (
          <button
            key={rating}
            type="button"
            className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
              selectedRating === rating 
                ? "bg-survey-primary text-white" 
                : "bg-gray-100 hover:bg-gray-200 text-survey-textLight"
            )}
            onClick={() => onChange(question.id, rating.toString())}
          >
            {rating}
          </button>
        ))}
      </div>
    </QuestionBase>
  );
};

export default RatingQuestion;
