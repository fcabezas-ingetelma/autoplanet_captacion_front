import React from 'react';
import {Form, Button, Row, Col, Container, Navbar} from 'react-bootstrap'
import './session.css';

class SessionHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container align='right' >
                    <label id="attendedText">{(this.props.attenderRut !== '' && this.props.attenderRut !== undefined) ? 'Ejecutivo Comercial: ' + this.props.attenderRut : ''}</label>
                    {this.props.rut && 
                            <div >
                                <label id="userText">{(this.props.rut !== '' && this.props.rut !== undefined) ? 'Cliente: ' + this.props.rut : ''  } <Button variant='danger'>Salir</Button></label>
                            </div>
                    }
            </Container>
        )
    }
}

export default SessionHeader;