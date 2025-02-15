import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { ResumeData, ResumeOptions } from "jt-resume-builder";
import { useCommand } from "./CommandProvider";
import ResumeRefineLLMHttpClient from "../utils/ChatLLMHttpClient";

// Define the context type
interface ResumeContextType {
  fullResumeOptions: ResumeOptions | null;
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
  const { events } = useCommand();
  const [fullResumeOptions, setFullResumeOptions] = useState<ResumeOptions | null>(null);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadResumeData = async () => {
      try {
        const responseOptions = await fetch('resume-options.json');
        if (!responseOptions.ok) {
          throw new Error('Failed to load resume options');
        }
        const options = await responseOptions.json();
        setFullResumeOptions(options);

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

  useEffect(() => {
    const refineResumeData = async (data: any) => {
      console.log("Calling refineResumeData <==========");
      if (!resumeData || !fullResumeOptions) {
        console.error("resumeData or fullResumeOptions is null", resumeData, fullResumeOptions);
        return;
      }
      const resumeRefineHttpClient: ResumeRefineLLMHttpClient = new ResumeRefineLLMHttpClient(ResumeRefineLLMHttpClient.resumeRefineUrl);
      console.log("about to post to resume-refine");
      const newResumeData = await resumeRefineHttpClient.post({
        endpoint: "resume-refine",
        resumeData: resumeData!,
        resumeOptions: fullResumeOptions!,
        role: data.role,
        additionalText: data.additionalText,
      });
      console.log("newResumeData: ", newResumeData);
      setResumeData(newResumeData);
    }
    events.onResumeDataUpdateRequest["refine-resume"] = refineResumeData;

    return () => {
      delete events.onResumeDataUpdateRequest["refine-resume"];
    };
  }, [resumeData, fullResumeOptions]);

  return (
    <ResumeContext.Provider value={{
      fullResumeOptions,
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