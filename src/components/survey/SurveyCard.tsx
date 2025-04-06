
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Survey } from '@/types/survey';
import { BarChart, Calendar, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface SurveyCardProps {
  survey: Survey;
}

const SurveyCard = ({ survey }: SurveyCardProps) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ar-SA', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Card className="hover:shadow-md transition-shadow" dir="rtl">
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <span className="text-survey-text">{survey.title}</span>
          <span className="bg-survey-background text-survey-textLight text-xs px-2 py-1 rounded-full">
            {survey.questions.length} أسئلة
          </span>
        </CardTitle>
        <p className="text-sm text-survey-textLight">{survey.description}</p>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-survey-textLight">
          <Calendar size={16} />
          <span>تم إنشاؤه في {formatDate(survey.createdAt)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-survey-textLight">
          <ClipboardList size={16} />
          <span>{survey.questions.length} أسئلة</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-survey-textLight">
          <BarChart size={16} />
          <span>{survey.responses} ردود</span>
        </div>
      </CardContent>
      <CardFooter className="gap-2 justify-between">
        <Link to={`/surveys/${survey.id}`}>
          <Button variant="outline" size="sm">عرض</Button>
        </Link>
        <Link to={`/surveys/${survey.id}/edit`}>
          <Button variant="outline" size="sm">تعديل</Button>
        </Link>
        <Link to={`/surveys/${survey.id}/responses`}>
          <Button className="bg-survey-primary hover:bg-survey-accent text-white" size="sm">
            الردود
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SurveyCard;
