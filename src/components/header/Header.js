import React from 'react';
import logo from './ap-logo.svg';
import './Header.css';

function APHeader() {
    return (
        <div className="AP-app-header">
            <header>
                <img src={logo} className="AP-app-logo" alt="logo" />
            </header>
        </div>
    );
}

export default APHeader;