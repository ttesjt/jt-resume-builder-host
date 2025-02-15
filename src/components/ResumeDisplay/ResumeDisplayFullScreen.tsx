import { useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Loader2 } from 'lucide-react';
import { ResumeTight } from "jt-resume-builder";

// @ts-ignore
import { useCommand } from "../../contexts/CommandProvider";
import { useResume } from '../../contexts/ResumeProvider';

function ResumeDisplayFullScreen() {
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
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
        <div className="text-center">
          <Loader2 className="animate-spin mb-2" size={32} />
          <p className="text-secondary">Loading resume...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
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
    <div className="min-vh-100 bg-light">
      <ResumeTight ref={componentRef} data={resumeData} fullScreen={true} />
    </div>
  );
}

export default ResumeDisplayFullScreen;