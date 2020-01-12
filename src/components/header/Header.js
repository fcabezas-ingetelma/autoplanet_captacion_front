import React from 'react';
import logo from './ap-logo.svg';
import {Row, Container} from 'react-bootstrap'
import './Header.css';

function APHeader() {
    return (
        <Container>
            <Row>
            <div >
                <header>
                    <img src={logo} alt="logo" />
                </header>
            </div>
            </Row>
            <Row>
                
            </Row>
        </Container>
    );
}

export default APHeader;