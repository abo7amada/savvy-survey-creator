
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Save, Eye } from 'lucide-react';
import { Question, QuestionType } from '@/types/survey';

const CreateSurvey = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  
  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: `q${Date.now()}`,
      title: '',
      type: 'text',
      required: false
    };
    
    setQuestions([...questions, newQuestion]);
  };
  
  const handleQuestionChange = (id: string, field: keyof Question, value: any) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };
  
  const handleAddOption = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;
    
    const options = question.options || [];
    const newOption = {
      id: `o${Date.now()}`,
      text: ''
    };
    
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, options: [...options, newOption] } : q
    ));
  };
  
  const handleOptionChange = (questionId: string, optionId: string, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id !== questionId) return q;
      
      const updatedOptions = (q.options || []).map(o => 
        o.id === optionId ? { ...o, text: value } : o
      );
      
      return { ...q, options: updatedOptions };
    }));
  };
  
  const handleRemoveOption = (questionId: string, optionId: string) => {
    setQuestions(questions.map(q => {
      if (q.id !== questionId) return q;
      
      const updatedOptions = (q.options || []).filter(o => o.id !== optionId);
      return { ...q, options: updatedOptions };
    }));
  };
  
  const handleRemoveQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };
  
  const handleSaveSurvey = () => {
    // In a real app, this would save to the backend
    console.log({
      title,
      description,
      questions
    });
    
    alert('Survey saved successfully!');
  };
  
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-survey-text">Create New Survey</h1>
        <div className="space-x-2">
          <Button variant="outline" className="gap-1">
            <Eye size={16} />
            Preview
          </Button>
          <Button 
            className="bg-survey-primary hover:bg-survey-accent" 
            onClick={handleSaveSurvey} 
            disabled={!title || questions.length === 0}
          >
            <Save size={16} className="mr-1" />
            Save Survey
          </Button>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Survey Info */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Survey Details</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Survey Title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your survey" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </FormControl>
            </FormItem>
          </CardContent>
        </Card>
        
        {/* Questions */}
        {questions.map((question, index) => (
          <Card key={question.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <h3 className="text-md font-medium">Question {index + 1}</h3>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleRemoveQuestion(question.id)}
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormItem>
                <FormLabel>Question Text</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your question" 
                    value={question.title} 
                    onChange={(e) => handleQuestionChange(question.id, 'title', e.target.value)}
                  />
                </FormControl>
              </FormItem>
              
              <div className="grid grid-cols-2 gap-4">
                <FormItem>
                  <FormLabel>Question Type</FormLabel>
                  <Select 
                    value={question.type}
                    onValueChange={(value: QuestionType) => handleQuestionChange(question.id, 'type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="multipleChoice">Multiple Choice</SelectItem>
                      <SelectItem value="checkbox">Checkbox</SelectItem>
                      <SelectItem value="dropdown">Dropdown</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
                
                <FormItem className="flex items-center gap-2">
                  <FormLabel>Required</FormLabel>
                  <FormControl>
                    <input 
                      type="checkbox" 
                      checked={question.required} 
                      onChange={(e) => handleQuestionChange(question.id, 'required', e.target.checked)}
                      className="h-4 w-4"
                    />
                  </FormControl>
                </FormItem>
              </div>
              
              {['multipleChoice', 'checkbox', 'dropdown'].includes(question.type) && (
                <div className="space-y-3">
                  <FormLabel>Options</FormLabel>
                  {(question.options || []).map((option) => (
                    <div key={option.id} className="flex gap-2">
                      <Input 
                        value={option.text} 
                        onChange={(e) => handleOptionChange(question.id, option.id, e.target.value)}
                        placeholder="Option text"
                      />
                      <Button 
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveOption(question.id, option.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                  <Button 
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddOption(question.id)}
                    className="mt-2"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Option
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        
        {/* Add Question Button */}
        <div className="text-center py-4">
          <Button 
            type="button"
            variant="outline"
            onClick={handleAddQuestion}
            className="border-dashed border-2"
          >
            <Plus size={18} className="mr-1" />
            Add Question
          </Button>
        </div>
        
        {/* Save button */}
        <div className="flex justify-end space-x-3">
          <Button variant="outline">Cancel</Button>
          <Button 
            className="bg-survey-primary hover:bg-survey-accent"
            onClick={handleSaveSurvey}
            disabled={!title || questions.length === 0}
          >
            Save Survey
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateSurvey;
