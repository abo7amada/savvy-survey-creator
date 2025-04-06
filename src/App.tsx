
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CreateSurvey from "./pages/CreateSurvey";
import SurveyPreview from "./pages/SurveyPreview";
import SurveyPreviewDraft from "./pages/SurveyPreviewDraft";
import SurveyResponses from "./pages/SurveyResponses";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/create" element={<CreateSurvey />} />
          <Route path="/surveys/:id" element={<SurveyPreview />} />
          <Route path="/surveys/:id/responses" element={<SurveyResponses />} />
          <Route path="/preview" element={<SurveyPreviewDraft />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
