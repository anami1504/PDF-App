import { useState } from 'react';
import { Document, Page } from 'react-pdf';


function PdfComponent(props) {
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);


    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div className='pdf-div'>

            <Document file={props.pdfFile} onLoadSuccess={onDocumentLoadSuccess}>

                {Array.apply(null, Array(numPages))
                    .map((x, i) => i + 1)
                    .map((page) => {

                        return (
                            <>
                                <p className='page-number'>Page {page} of {numPages}</p>
                                <Page pageNumber={page} renderTextLayer={false} renderAnnotationLayer={false} className='page' />
                            </>
                        );
                    })}


            </Document>

        </div>
    );
}

export default PdfComponent;
