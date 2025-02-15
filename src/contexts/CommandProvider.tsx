import React, { createContext, useContext, useEffect } from "react";
// import { useResume } from "./ResumeProvider";

// Define types for events and commands
interface Events {
  onResumeDataChange: Record<string, () => void>;
  onResumeDataUpdateRequest: Record<string, () => void>;
  onPrintRequest: Record<string, () => void>;
}

interface Commands {
  updateResumeData: () => void;
  printResume: () => void;
}

// Create Context Type
interface CommandContextType {
  events: Events;
}

// Create Context
const CommandContext = createContext<CommandContextType | undefined>(undefined);

// CommandProvider Component
export const CommandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const { resumeData, setResumeData } = useResume();

  // Events and commands state
  const events: Events = {
    onResumeDataChange: {},
    onResumeDataUpdateRequest: {},
    onPrintRequest: {},
  };

  const commands: Commands = {
    updateResumeData: () => {
      console.log("Calling updateResumeData");
      for (const key in events.onResumeDataUpdateRequest) {
        events.onResumeDataUpdateRequest[key]();
      }
    },
    printResume: () => {
      for (const key in events.onPrintRequest) {
        events.onPrintRequest[key]();
      }
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log("Received message:", event.data);

      // ✅ Security: Check event.origin if needed
      // if (event.origin !== "https://your-main-site.com") return;

      if (event.data?.command === "updateResumeData") {
        // Call every function in onResumeDataUpdateRequest
        commands.updateResumeData();
      }

      if (event.data?.command === "printResume") {
        // Call every function in onPrintRequest
        commands.printResume();
      }
    };

    // const handleKeyDown = (event: KeyboardEvent) => {
    //   if (event.code === "Space") {
    //     window.postMessage({ command: "printResume" }, "*");
    //   }
    // };

    // window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
      // window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <CommandContext.Provider value={{ events }}>
      {children}
    </CommandContext.Provider>
  );
};

// Custom hook to use the CommandContext
export const useCommand = (): CommandContextType => {
  const context = useContext(CommandContext);
  if (!context) {
    throw new Error("useCommand must be used within a CommandProvider");
  }
  return context;
};