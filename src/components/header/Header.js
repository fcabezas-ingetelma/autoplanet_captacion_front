import React from 'react';
import logo from './ap-logo.svg';
import {Row, Container, Navbar, Button} from 'react-bootstrap'
import './Header.css';

function APHeader() {
    return (
        <Container >
            <Navbar>
                <Navbar.Brand href="#home" >
                <img
                    src={logo}
                    fluid
                    alt="logo"
                />
                </Navbar.Brand>
            </Navbar>               
        </Container>
    );
}

export default APHeader;