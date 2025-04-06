
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
        <div className="text-center py-12" dir="rtl">
          <p className="text-survey-textLight">الاستبيان غير موجود</p>
        </div>
      </MainLayout>
    );
  }
  
  // Mock data for charts
  const multipleChoiceData = [
    { name: 'الجودة', value: 42 },
    { name: 'السعر', value: 28 },
    { name: 'خدمة العملاء', value: 35 },
    { name: 'سهولة الاستخدام', value: 22 }
  ];
  
  const ratingData = [
    { name: 'نجمة واحدة', value: 5 },
    { name: 'نجمتان', value: 12 },
    { name: '٣ نجوم', value: 25 },
    { name: '٤ نجوم', value: 38 },
    { name: '٥ نجوم', value: 47 }
  ];
  
  const COLORS = ['#6366f1', '#8b5cf6', '#4f46e5', '#a855f7', '#3730a3'];
  
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6" dir="rtl">
        <h1 className="text-2xl font-bold text-survey-text">{survey.title} - الردود</h1>
        <div className="px-3 py-1 bg-survey-primary text-white rounded-full">
          {survey.responses} رد
        </div>
      </div>
      
      <Tabs defaultValue="summary" className="w-full" dir="rtl">
        <TabsList className="mb-6">
          <TabsTrigger value="summary">ملخص</TabsTrigger>
          <TabsTrigger value="individual">الردود الفردية</TabsTrigger>
          <TabsTrigger value="export">تصدير</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">نظرة عامة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-survey-textLight">إجمالي الردود</p>
                    <p className="text-3xl font-bold text-survey-text">{survey.responses}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-survey-textLight">معدل الإكمال</p>
                    <p className="text-3xl font-bold text-survey-text">94%</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-survey-textLight">متوسط وقت الإكمال</p>
                    <p className="text-3xl font-bold text-survey-text">3:24</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Chart for Question 1 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">ما مدى رضاك عن خدمتنا؟</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ratingData} layout="vertical">
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
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
                <CardTitle className="text-lg">ما هي جوانب خدمتنا التي تفضلها أكثر؟</CardTitle>
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
              <p className="text-survey-textLight text-center">سيتم عرض بيانات الردود الفردية هنا.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="export">
          <Card>
            <CardContent className="pt-6">
              <p className="text-survey-textLight text-center">خيارات التصدير ستكون متاحة هنا.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default SurveyResponses;
