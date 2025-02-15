import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { ResumeData } from "jt-resume-builder";

// Define the context type
interface ResumeContextType {
  fullResumeData: ResumeData | null;
  resumeData: ResumeData | null;
  setResumeData: (data: ResumeData | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

// Create Context
const ResumeContext = createContext<ResumeContextType | null>(null);

// ResumeProvider Component
interface ResumeProviderProps {
  children: ReactNode;
}

export const ResumeProvider: React.FC<ResumeProviderProps> = ({ children }) => {
  const [fullResumeData, _] = useState<ResumeData | null>(null);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadResumeData = async () => {
      try {
        const response = await fetch('resume-data.json');
        if (!response.ok) {
          throw new Error('Failed to load resume data');
        }
        const data = await response.json();
        setResumeData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while loading the resume');
      } finally {
        setLoading(false);
      }
    };

    loadResumeData();
  }, []);

  return (
    <ResumeContext.Provider value={{
      fullResumeData,
      resumeData,
      setResumeData,
      loading,
      setLoading,
      error,
      setError,
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

// Custom hook to use the ResumeContext
export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};