import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Container, Row, Col } from 'reactstrap';
import './phoneValidation.css';

class PhoneValidation extends React.Component {
    constructor(props) {
        super(props);
        this.state = { rut: '', 
                       cellphone: '', 
                       clientType: '', 
                       attenderRut: '', 
                       code: '' };
    }

    render() {
        return (
            <div className="InputForm">
                <div className="attender-text">
                    <p id="attendedText"></p>
                </div>
                <Formik
                initialValues = {{ rut: '', cellphone: '', clientType: '', attenderRut: '', code: '' }}
                validate = {values => {
                    const errors = {};
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                    }, 400);
                }}
                >
                {({ isSubmitting }) => (
                    <Form className="Form-spacing">
                        <Container>
                            <Row>
                                <h2>CONFIRMACIÓN DE TELÉFONO</h2>
                            </Row>
                            <Row>
                                <label className="Phone-description-label">Se ha enviado un código de 4 dígitos al número {this.state.cellphone}, el cual debe ingresar a continuación:</label>
                            </Row>
                            <Row className="Phone-row">
                                <Col><label className="Phone-label">Ingrese Código</label></Col>
                                <Col><Field className="Phone-field" type="text" name="code" placeholder="1234"/></Col>
                                <Col><ErrorMessage className="error-label" name="code" component="div" /></Col>
                            </Row>
                            <Row>
                                <Col><Button className="Submit-button" type="submit" disabled={isSubmitting} color="danger">
                                    Confirmar
                                </Button></Col>
                            </Row>
                        </Container>
                    </Form>
                )}
                </Formik>
            </div>
        )
    }
}

export default PhoneValidation;