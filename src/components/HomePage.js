import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './HomePage.css';
import Header from './Header';

const HomePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userEmail = location.state?.email || 'User';
    const [animateRunner, setAnimateRunner] = useState(false);

    const handleGetStarted = () => {
        setAnimateRunner(true); // Trigger runner animation
        setTimeout(() => {
            setAnimateRunner(false); // Reset runner animation
            navigate('/tax-filing', { state: { email: userEmail } });
        }, 1000); // Adjust delay to match animation duration
    };

    return (
        <>
            <Header />
            <div className="home-container">
                <h2>Welcome, {userEmail}!</h2>
                <p>Get started with your tax filing process by clicking the button below.</p>
                <button
                    className="get-started-button"
                    onClick={handleGetStarted}
                >
                    Get Started with Your Tax Filing
                    <div className={`runner ${animateRunner ? 'run' : ''}`}>📁💼</div>
                </button>
            </div>
        </>
    );
};

export default HomePage;
