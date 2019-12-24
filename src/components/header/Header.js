import React from 'react';
import logo from './ap-logo.svg';
import './Header.css';

function APHeader() {
    return (
        <header className="AP-app-header">
            <img src={logo} className="AP-app-logo" alt="logo" />
        </header>
    );
}

export default APHeader;