import { useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download, Loader2 } from 'lucide-react';

// @ts-ignore
import { useCommand } from "../../contexts/CommandProvider";
import { useResume } from '../../contexts/ResumeProvider';
import { ResumePlain } from '../ResumeTemplates/ResumePlain';

function ResumeDisplayLayouted() {
  const { resumeData, loading, error } = useResume();
  const { events } = useCommand();
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    events.onPrintRequest["print"] = handlePrint;

    return () => {
      delete events.onPrintRequest["print"];
    };
  }, []);

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
      <div className="container py-4">
        <div className="d-flex justify-content-end mb-4 no-print">
          <button
            onClick={handlePrint}
            className="btn btn-primary d-flex align-items-center gap-2"
          >
            <Download size={20} />
            Download PDF
          </button>
        </div>
        <ResumePlain ref={componentRef} data={resumeData} />
      </div>
    </div>
  );
}

export default ResumeDisplayLayouted;