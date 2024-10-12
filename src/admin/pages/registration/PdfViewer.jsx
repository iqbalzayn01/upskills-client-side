import { useParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';

// Ensure pdfjs worker is correctly set up
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = () => {
  const { fileName } = useParams();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="pdf-viewer-container">
      <Document
        file={`http://localhost:9000/uploads/documents/${fileName}`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {console.log(`http://localhost:9000/uploads/documents/${fileName}`)}
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <button
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={pageNumber <= 1}
        >
          Previous
        </button>
        <button
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={pageNumber >= numPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PdfViewer;
