
import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { mockSurveys } from '@/data/mockSurveys';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PieChart, 
  Pie, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const SurveyResponses = () => {
  const { id } = useParams<{ id: string }>();
  const survey = mockSurveys.find(s => s.id === id);
  
  if (!survey) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <p className="text-survey-textLight">Survey not found</p>
        </div>
      </MainLayout>
    );
  }
  
  // Mock data for charts
  const multipleChoiceData = [
    { name: 'Quality', value: 42 },
    { name: 'Price', value: 28 },
    { name: 'Customer Support', value: 35 },
    { name: 'Ease of Use', value: 22 }
  ];
  
  const ratingData = [
    { name: '1 Star', value: 5 },
    { name: '2 Stars', value: 12 },
    { name: '3 Stars', value: 25 },
    { name: '4 Stars', value: 38 },
    { name: '5 Stars', value: 47 }
  ];
  
  const COLORS = ['#6366f1', '#8b5cf6', '#4f46e5', '#a855f7', '#3730a3'];
  
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-survey-text">{survey.title} - Responses</h1>
        <div className="px-3 py-1 bg-survey-primary text-white rounded-full">
          {survey.responses} responses
        </div>
      </div>
      
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="individual">Individual Responses</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-survey-textLight">Total Responses</p>
                    <p className="text-3xl font-bold text-survey-text">{survey.responses}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-survey-textLight">Completion Rate</p>
                    <p className="text-3xl font-bold text-survey-text">94%</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-survey-textLight">Avg. Completion Time</p>
                    <p className="text-3xl font-bold text-survey-text">3:24</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Chart for Question 1 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How satisfied are you with our service?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ratingData} layout="vertical">
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={80} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Chart for Question 2 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What aspects of our service do you like the most?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72 flex justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={multipleChoiceData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {multipleChoiceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="individual">
          <Card>
            <CardContent className="pt-6">
              <p className="text-survey-textLight text-center">Individual response data would be listed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="export">
          <Card>
            <CardContent className="pt-6">
              <p className="text-survey-textLight text-center">Export options would be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default SurveyResponses;
