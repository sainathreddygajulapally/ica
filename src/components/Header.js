import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../assets/IcarusTaxGroupLogo.png'; // Ensure the logo path is correct

const Header = () => {
    const location = useLocation();
    const userEmail = location.state?.email || 'User'; // Get logged-in user email from state

    return (
        <header className="app-header">
            {/* Update the Link to navigate to /home and pass the email state */}
            <Link to="/home" state={{ email: userEmail }} className="logo-container">
                <img src={logo} alt="Icarus Tax Group Logo" className="app-logo" />
                <h1 className="app-title">Icarus Tax Group</h1>
            </Link>
        </header>
    );
};

export default Header;
