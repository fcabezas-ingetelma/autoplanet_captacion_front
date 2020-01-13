import React from 'react';
import {Form, Button, Row, Col, Container, Navbar} from 'react-bootstrap'
import './session.css';

class SessionHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container >
                <Row>
                    <Col className="my-auto" >
                    <div align='left' >
                        <label id="attendedText" >{(this.props.attenderRut !== '' && this.props.attenderRut !== undefined) ? 'Ejecutivo Comercial: ' + this.props.attenderRut : ''}</label>
                    </div>
                    </Col>
                    {this.props.rut && 
                        <Col className="my-auto" >
                            <div align='right' >
                                <label id="userText" >{(this.props.rut !== '' && this.props.rut !== undefined) ? 'Cliente: ' + this.props.rut : ''  }</label>
                                <Button variant='danger'>Salir</Button>
                            </div>
                        </Col>
                    }
                </Row>
            </Container>
        )
    }
}

export default SessionHeader;