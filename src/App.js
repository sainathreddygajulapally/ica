import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import TaxFilingPage from './components/TaxFilingPage';
import TaxComfortPage from './components/TaxComfortPage';
import W2UploadPage from './components/W2UploadPage'; // Import the W-2 upload page
import Fill1040Page from './components/Fill1040Page'; // Import the Fill 1040 page
//import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';

// Set the workerSrc path for PDF.js
//GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.7.76/pdf.worker.min.js`; // Replace 2.10.377 with your version
//GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`;


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/tax-filing" element={<TaxFilingPage />} />
        <Route path="/comfort" element={<TaxComfortPage />} />
        <Route path="/w2-upload" element={<W2UploadPage />} /> {/* W-2 upload page route */}
        <Route path="/fill-1040" element={<Fill1040Page />} /> {/* Fill 1040 form route */}
       
      </Routes>
    </Router>
  );
}

export default App;
