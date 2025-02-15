// import React from 'react';
// import ResumeDisplayLayouted from "./components/ResumeDisplay/ResumeDisplayLayouted";
import ResumeDisplayFullScreen from "./components/ResumeDisplay/ResumeDisplayFullScreen";
// @ts-ignore
import { CommandProvider } from "./contexts/CommandProvider";
import { ResumeProvider } from "./contexts/ResumeProvider";



function App() {
  return (
    <ResumeProvider>
      <CommandProvider>
        <ResumeDisplayFullScreen />
      </CommandProvider>
    </ResumeProvider>
  );
}

export default App;