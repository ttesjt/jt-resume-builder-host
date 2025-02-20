import { useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Loader2 } from 'lucide-react';

// @ts-ignore
import { useCommand } from "../../contexts/CommandProvider";
import { useResume } from '../../contexts/ResumeProvider';
import { ResumePlain } from '../ResumeTemplates/ResumePlain';

function ResumeDisplayFullScreenEmbedding() {
  const { resumeData, loading, error } = useResume();
  const { events } = useCommand();
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    events.onPrintRequest["print"] = handlePrint;
    const handlePageReady = () => {
      window.parent.postMessage({
        command: "set-resume-status",
        isPageReadySignal: true,
      }, "*");
    };

    handlePageReady();
    return () => {
      delete events.onPrintRequest["print"];
    };
  }, []);

  useEffect(() => {
    const handleResumeReady = () => {
      if (componentRef.current) {
        const { height } = componentRef.current.getBoundingClientRect();
        window.parent.postMessage({
          command: "set-resume-status",
          isResumeDisplayReadySignal: true,
          displayHeight: height,
        }, "*");
      } else {
        console.log("componentRef.current is null");
      }
    };
    handleResumeReady();

    // listen to space button, when pressed, print the resume
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " ") {
        handlePrint();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [resumeData, loading]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: resumeData ? `${resumeData.name} - Resume` : 'Resume',
    removeAfterPrint: true,
    pageStyle: `
      @media print {
        body {
          margin: 0;
          padding: 0;
        }
        @page {
          margin: 0;
          size: auto;
        }
      }
    `
  });

  if (loading) {
    return (
      <div className="bg-light d-flex align-items-center justify-content-center">
        <div className="text-center">
          <Loader2 className="animate-spin mb-2" size={32} />
          <p className="text-secondary">Loading resume...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-light d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!resumeData) {
    return null;
  }

  return (
    <ResumePlain ref={componentRef} data={resumeData} fullScreen={true} />
  );
}

export default ResumeDisplayFullScreenEmbedding;