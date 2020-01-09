import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './session.css';

class SessionHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <div className="attender-field-spacing">
                            <p id="attendedText">{(this.props.attenderRut !== '' && this.props.attenderRut !== undefined) ? 'Ejecutivo Comercial: ' + this.props.attenderRut : ''}</p>
                        </div>
                    </Col>
                    {this.props.rut && 
                        <Col>
                            <div className="attender-field-spacing">
                                <p id="userText">{(this.props.rut !== '' && this.props.rut !== undefined) ? 'Cliente: ' + this.props.rut : ''}</p>
                            </div>
                        </Col>
                    }
                </Row>
            </Container>
        )
    }
}

export default SessionHeader;