// import React from 'react';
// import ResumeDisplayLayouted from "./components/ResumeDisplay/ResumeDisplayLayouted";
import ResumeDisplayFullScreenEmbedding from "./components/ResumeDisplay/ResumeDisplayFullScreenEmbedding";
// @ts-ignore
import { CommandProvider } from "./contexts/CommandProvider";
import { ResumeProvider } from "./contexts/ResumeProvider";



function App() {
  return (
    <CommandProvider>
      <ResumeProvider>
        <ResumeDisplayFullScreenEmbedding />
      </ResumeProvider>
    </CommandProvider>
  );
}

export default App;