import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TaxFilingPage.css';
import Header from './Header';

const TaxFilingPage = () => {
    const navigate = useNavigate();
    const [selectedOptions, setSelectedOptions] = useState({
        general: [],
        employment: [],
        family: [],
        housing: [],
        investments: [],
    });

    // Handle checkbox changes and update the state based on user selections
    const handleCheckboxChange = (category, option) => {
        setSelectedOptions((prevState) => {
            const updatedCategory = prevState[category].includes(option)
                ? prevState[category].filter((item) => item !== option)
                : [...prevState[category], option];

            return {
                ...prevState,
                [category]: updatedCategory,
            };
        });
    };

    // On form submission, navigate to the comfort page with the selected options as state
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/comfort', { state: { selectedOptions } }); // Pass selected options to the next page
    };

    return (
        <>
            <Header /> {/* Consistent Header component */}
            <div className="tax-filing-container"> {/* Main container with similar styling as HomePage */}
                <form className="tax-filing-form" onSubmit={handleSubmit}>
                    <h2>Do any of these apply?</h2>
                    <p>This helps us customize your experience.</p>

                    {/* Section for General options */}
                    <section className="questionnaire-section">
                        <h3>General</h3>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('general', 'maximizeDeductions')}
                                checked={selectedOptions.general.includes('maximizeDeductions')}
                            />
                            I want to maximize deductions and credits
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('general', 'charityDonation')}
                                checked={selectedOptions.general.includes('charityDonation')}
                            />
                            I donated to charity
                        </label>
                    </section>

                    {/* Section for Employment options */}
                    <section className="questionnaire-section">
                        <h3>Employment</h3>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('employment', 'job')}
                                checked={selectedOptions.employment.includes('job')}
                            />
                            I have a job (W-2)
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('employment', 'freelancer')}
                                checked={selectedOptions.employment.includes('freelancer')}
                            />
                            I'm a freelancer/gig-worker
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('employment', 'selfEmployed')}
                                checked={selectedOptions.employment.includes('selfEmployed')}
                            />
                            I'm self-employed
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('employment', 'businessOwner')}
                                checked={selectedOptions.employment.includes('businessOwner')}
                            />
                            I own a business (S-corp, Partnership, or LLC)
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('employment', 'unemploymentIncome')}
                                checked={selectedOptions.employment.includes('unemploymentIncome')}
                            />
                            I have unemployment income
                        </label>
                    </section>

                    {/* Section for Family options */}
                    <section className="questionnaire-section">
                        <h3>Family</h3>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('family', 'childrenDependents')}
                                checked={selectedOptions.family.includes('childrenDependents')}
                            />
                            I have children/dependents
                        </label>
                    </section>

                    {/* Section for Housing options */}
                    <section className="questionnaire-section">
                        <h3>Housing</h3>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('housing', 'ownHome')}
                                checked={selectedOptions.housing.includes('ownHome')}
                            />
                            I own a home
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('housing', 'paidRent')}
                                checked={selectedOptions.housing.includes('paidRent')}
                            />
                            I paid rent
                        </label>
                    </section>

                    {/* Section for Investments options */}
                    <section className="questionnaire-section">
                        <h3>Investments</h3>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('investments', 'rentalProperty')}
                                checked={selectedOptions.investments.includes('rentalProperty')}
                            />
                            I own a rental property
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('investments', 'stockCrypto')}
                                checked={selectedOptions.investments.includes('stockCrypto')}
                            />
                            I sold stock or crypto
                        </label>
                    </section>

                    {/* Navigation buttons */}
                    <div className="form-navigation">
                        <button type="button" className="back-button" onClick={() => navigate('/home')}>
                            Back
                        </button>
                        <button type="submit" className="next-button">
                            Next
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default TaxFilingPage;
