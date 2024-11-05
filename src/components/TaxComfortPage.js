import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TaxComfortPage.css';
import Header from './Header';

const TaxComfortPage = () => {
    const navigate = useNavigate();
    const { state } = useLocation(); // Retrieve the state passed from TaxFilingPage
    const selectedOptions = state ? state.selectedOptions : {}; // Access the selectedOptions

    const [requiredForms, setRequiredForms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Function to handle API call to OpenAI
    const fetchRequiredForms = async () => {
        setLoading(true);
        setError('');
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
                        { role: 'system', content: 'You are a helpful assistant that provides IRS tax form recommendations based on selected tax options.' },
                        { role: 'user', content: `Given the selected tax options: ${JSON.stringify(selectedOptions)}, which IRS tax forms are required? Please list the forms and a short description of each.` }
                    ],
                    max_tokens: 150,
                }),
            });

            const data = await response.json();
            const formsList = data.choices[0].message.content.split('\n').map(form => {
                const [name, description] = form.split(':');
                return { name: name?.trim(), description: description?.trim() };
            }).filter(form => form.name && form.description);

            setRequiredForms(formsList);

        } catch (error) {
            console.error('Error fetching required forms:', error);
            setError('Could not fetch forms. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Function to handle selection and initiate the API call
    const handleComfortableClick = async () => {
        await fetchRequiredForms();
    };

    // Function to navigate to the W-2 upload page
    const handleHelpClick = () => {
        navigate('/w2-upload');
    };

    return (
        <div className="tax-comfort-page">
            <Header />

            <div className="tax-comfort-container">
                <h2>How comfortable do you feel doing your own taxes?</h2>
                <p>We'll show our expert help options and make a recommendation.</p>

                <div className="comfort-options">
                    <div className="option-card" onClick={handleComfortableClick}>
                        <div className="icon">
                            <span role="img" aria-label="business person">👨‍💼</span>
                        </div>
                        <p>Comfortable on my own</p>
                    </div>
                    <div className="option-card" onClick={() => console.log("Selected: Prefer to hand off to an expert")}>
                        <div className="icon">
                            <span role="img" aria-label="woman business person">👩‍💼</span>
                        </div>
                        <p>Want help when I need it</p>
                    </div>
                    <div className="option-card" onClick={handleHelpClick}>
                        <div className="icon">
                            <span role="img" aria-label="expert">🧑‍💼</span>
                        </div>
                        <p>Prefer to hand off to an expert</p>
                    </div>
                </div>

                {loading ? (
                    <div className="spinner"></div> // Loading spinner
                ) : error ? (
                    <p className="error-message">{error}</p> // Error message if API call fails
                ) : requiredForms.length > 0 && (
                    <div className="forms-list">
                        <h3>Required Tax Forms</h3>
                        <ul>
                            {requiredForms.map((form, index) => (
                                <li key={index}>
                                    <a href={`https://www.irs.gov/pub/irs-pdf/${form.name}.pdf`} target="_blank" rel="noopener noreferrer">
                                        {form.name}
                                    </a>
                                    <p>{form.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <button className="back-button" onClick={() => navigate('/tax-filing')}>← Back</button>
            </div>
        </div>
    );
};

export default TaxComfortPage;
