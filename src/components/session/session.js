import React from 'react';
import {Form, Row, Col, Container, Navbar} from 'react-bootstrap'
import './session.css';

class SessionHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Navbar >
                  <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                    <p id="attendedText">{(this.props.attenderRut !== '' && this.props.attenderRut !== undefined) ? 'Ejecutivo Comercial: ' + this.props.attenderRut : ''}</p>
                    {this.props.rut && 
                            <div >
                                <p id="userText">{(this.props.rut !== '' && this.props.rut !== undefined) ? 'Cliente: ' + this.props.rut : ''}</p>
                            </div>
                    }
                    </Navbar.Text>
                  </Navbar.Collapse>
                </Navbar>   
            </Container>
        )
    }
}

export default SessionHeader;