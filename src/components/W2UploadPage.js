import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './W2UploadPage.css';

const W2UploadPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [loading, setLoading] = useState(false); // Loading state for OCR and GPT process
    const [structuredData, setStructuredData] = useState(''); // State to hold GPT response
    const navigate = useNavigate();

    // Handle file change for W-2 image upload
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            setSelectedFile(file);
            setUploadStatus('');
        } else {
            setUploadStatus('Please select a valid image file (JPG or PNG).');
            setSelectedFile(null);
        }
    };

    // Perform OCR on the uploaded W-2 image file
    const performOCR = async (file) => {
        setLoading(true);
        try {
            const result = await Tesseract.recognize(file, 'eng', {
                logger: (m) => console.log(m), // Log OCR progress
            });

            console.log('OCR Result:', result.data.text);
            setUploadStatus('OCR completed successfully');
            return result.data.text; // Return the extracted text

        } catch (error) {
            console.error('Error performing OCR:', error);
            setUploadStatus('Error during OCR processing');
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Process data using OpenAI
    const processWithOpenAI = async (extractedText) => {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        { role: 'system', content: 'You are a tax expert.' },
                        { role: 'user', content: `Parse the following W-2 data into 1040 form fields: ${extractedText}` }
                    ],
                    max_tokens: 1000,
                }),
            });

            const data = await response.json();
            return data.choices[0].message.content; // Return GPT's response content
        } catch (error) {
            console.error('Error with OpenAI:', error);
            setUploadStatus('Error processing with GPT.');
            return 'Error processing data with GPT';
        }
    };

    // Handle file upload and OCR execution
    const handleFileUpload = async () => {
        if (!selectedFile) {
            setUploadStatus('No file selected');
            return;
        }

        // Perform OCR and process with OpenAI
        const extractedText = await performOCR(selectedFile);
        if (extractedText) {
            const gptResult = await processWithOpenAI(extractedText);
            setStructuredData(gptResult);
            setUploadStatus('Processing completed successfully.');
        }
    };

    // Navigate to the 1040 form page after processing
    const handleNext = () => {
        navigate('/fill-1040', { state: { structuredData } });
    };

    return (
        <div className="w2-upload-page">
            <Header />
            <div className="upload-container">
                <h2>Upload your W-2 Form Image</h2>
                <input type="file" accept="image/jpeg, image/png" onChange={handleFileChange} />
                <button onClick={handleFileUpload} disabled={loading}>
                    {loading ? 'Processing...' : 'Upload and Extract Data'}
                </button>

                <p>{uploadStatus}</p>

                {/* Display structured data from GPT */}
                {structuredData && (
                    <div>
                        <h3>Structured Data for 1040 Form:</h3>
                        <pre>{structuredData}</pre>
                        <button onClick={handleNext}>Continue to 1040 Form</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default W2UploadPage;
