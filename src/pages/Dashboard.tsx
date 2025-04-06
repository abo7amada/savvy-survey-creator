
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import SurveyCard from '@/components/survey/SurveyCard';
import { mockSurveys } from '@/data/mockSurveys';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const filteredSurveys = mockSurveys.filter(survey => 
    survey.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6" dir="rtl">
        <h1 className="text-2xl font-bold text-survey-text">استبياناتي</h1>
        <Link to="/create">
          <Button className="bg-survey-primary hover:bg-survey-accent">
            <PlusCircle className="ml-2 h-4 w-4" />
            إنشاء استبيان
          </Button>
        </Link>
      </div>

      <div className="mb-6" dir="rtl">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            className="pr-10"
            placeholder="البحث في الاستبيانات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredSurveys.length === 0 ? (
        <div className="text-center py-12" dir="rtl">
          <p className="text-survey-textLight mb-4">لم يتم العثور على استبيانات</p>
          <Link to="/create">
            <Button variant="outline">إنشاء أول استبيان</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" dir="rtl">
          {filteredSurveys.map(survey => (
            <SurveyCard key={survey.id} survey={survey} />
          ))}
        </div>
      )}
    </MainLayout>
  );
};

export default Dashboard;
