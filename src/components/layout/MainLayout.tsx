
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Home, 
  PlusSquare, 
  BarChart3, 
  Settings, 
  LogOut
} from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-survey-background flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-8">
          <div className="h-8 w-8 rounded-md bg-survey-primary flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <h1 className="text-xl font-semibold text-survey-text">Savvy Survey</h1>
        </div>
        
        <nav className="space-y-1">
          <Link to="/" className="flex items-center gap-2 px-3 py-2 rounded-md bg-survey-background text-survey-text hover:bg-gray-100 transition-colors">
            <Home size={18} />
            <span>Dashboard</span>
          </Link>
          <Link to="/create" className="flex items-center gap-2 px-3 py-2 rounded-md text-survey-text hover:bg-gray-100 transition-colors">
            <PlusSquare size={18} />
            <span>Create Survey</span>
          </Link>
          <Link to="/responses" className="flex items-center gap-2 px-3 py-2 rounded-md text-survey-text hover:bg-gray-100 transition-colors">
            <BarChart3 size={18} />
            <span>Responses</span>
          </Link>
          <Link to="/settings" className="flex items-center gap-2 px-3 py-2 rounded-md text-survey-text hover:bg-gray-100 transition-colors">
            <Settings size={18} />
            <span>Settings</span>
          </Link>
        </nav>
        
        <div className="mt-auto pt-6 border-t border-gray-200 mt-6">
          <Button variant="ghost" className="flex items-center gap-2 w-full justify-start text-survey-textLight">
            <LogOut size={18} />
            <span>Logout</span>
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
