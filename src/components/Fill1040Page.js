import React, { useState, useEffect, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';
import Header from './Header';
import './Fill1040Page.css';

const Fill1040Page = ({ structuredData }) => {
    const [loading, setLoading] = useState(false);
    const [downloadLink, setDownloadLink] = useState(null);

    const fill1040Form = useCallback(async () => {
        setLoading(true);
        try {
            const formUrl = `${process.env.PUBLIC_URL}/assets/f1040.pdf`; // Path to your blank 1040 form PDF
            const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer());
            const pdfDoc = await PDFDocument.load(formPdfBytes);
            const form = pdfDoc.getForm();

            // Extract only the Name and SSN from structuredData
            const { employeeName, ssn } = structuredData;

            // Fill in the First and Last name fields
            form.getTextField('YourFirstName').setText(employeeName.split(' ')[0] || '');
            form.getTextField('YourLastName').setText(employeeName.split(' ').slice(1).join(' ') || '');

            // Fill in the SSN field
            form.getTextField('SSN').setText(ssn || '');

            // Serialize the filled PDF document
            const pdfBytes = await pdfDoc.save();

            // Create a Blob for downloading the PDF
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const link = URL.createObjectURL(blob);
            setDownloadLink(link);

            setLoading(false);
        } catch (error) {
            console.error('Error filling the 1040 form:', error);
            setLoading(false);
        }
    }, [structuredData]);

    useEffect(() => {
        if (structuredData) {
            fill1040Form();
        }
    }, [structuredData, fill1040Form]);

    return (
        <div className="fill-1040-page">
            <Header />
            <div className="fill-1040-container">
                <h2>1040 Form Filled</h2>
                {loading ? (
                    <p>Filling form, please wait...</p>
                ) : (
                    downloadLink && (
                        <div>
                            <p>The form has been filled based on your W-2 data.</p>
                            <a href={downloadLink} download="Filled_1040_Form.pdf" onClick={() => URL.revokeObjectURL(downloadLink)}>
                                Download your 1040 Form
                            </a>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Fill1040Page;
