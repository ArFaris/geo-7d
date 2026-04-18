import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import s from './PdfViewer.module.scss';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfViewer = ({ pdfUrl }: { pdfUrl: string | null}) => {
    const [numPages, setNumPages] = useState<number>(0);
    const [scale, setScale] = useState(1.2);

    if (!pdfUrl) return;

    return (
        <div className={s.wrapper}>
            <Document
                file={pdfUrl}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            >
                {Array.from(new Array(numPages), (_, index) => (
                    <Page
                        pageNumber={index + 1}
                        scale={scale}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                    />
                ))}
            </Document>
        </div>
    );
}

export default PdfViewer;
