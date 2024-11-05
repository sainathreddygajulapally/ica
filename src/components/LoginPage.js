import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import logo from '../assets/IcarusTaxGroupLogo.png'; // Make sure the logo is in the assets folder

const LoginPage = () => {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Email validation function (Gmail format)
    const validateEmail = (email) => {
        const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return gmailPattern.test(email);
    };

    // Password validation function (at least 8 characters)
    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const handleLogin = (event) => {
        event.preventDefault();
        let isValid = true;

        // Reset previous errors
        setEmailError('');
        setPasswordError('');

        // Validate email
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid Gmail address (e.g., user@gmail.com).');
            isValid = false;
        }

        // Validate password
        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters long.');
            isValid = false;
        }

        // If validation passes, navigate to the home page
        if (isValid) {
            navigate('/home', { state: { email } });
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                {/* Icarus logo and name */}
                <div className="login-icon">
                    <img src={logo} alt="Icarus Logo" className="icarus-logo" />
                    <h1 className="icarus-title">Icarus Tax Group</h1>
                </div>
                {/* Login form */}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <div className="error-message">{emailError}</div>}
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && <div className="error-message">{passwordError}</div>}
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                <div className="login-links">
                    <a href="/signup">Signup</a>
                    <a href="/forgot-password">Forgot Password?</a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
