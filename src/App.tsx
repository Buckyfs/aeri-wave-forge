import React, { Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import Routes from './Routes';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter basename="/aeri-wave-forge/">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <TooltipProvider>
              <div className="min-h-screen">
                <Routes />
                <Toaster />
                <Sonner />
              </div>
            </TooltipProvider>
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
