import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Container, Row, Col } from 'reactstrap';
import './confirmationSuccess.css';

class ConfirmationSuccess extends React.Component {
    constructor(props) {
        super(props);
        this.state = { rut: '', 
                       cellphone: '', 
                       clientType: '', 
                       attenderRut: '', 
                       code: '',
                       confirmationChoice: '' };
    }

    render() {
        return(
            <div className="InputForm">
                <div className="attender-text">
                    <p id="attendedText"></p>
                </div>
                <Formik
                initialValues = {{ rut: '', cellphone: '', clientType: '', attenderRut: '', code: '', confirmationChoice: '' }}
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
                                <h2>FELICITACIONES</h2>
                            </Row>
                            <Row>
                                <label className="Phone-description-label">Usted ya puede acceder a descuentos por esta compra. Le invitamos a participar en futuras campañas promocionales donde habrán mayores descuentos y beneficios.</label>
                            </Row>
                            <Row className="Client-type-row">
                                <Col>
                                    <Row>
                                        <div className="confirmationChoice">
                                            <Field className="Client-type-field" type="radio" value="Si" name="confirmationChoice" id="si" />
                                            <label className="Client-type-label">Sí, deseo participar en futuras campañas promocionales</label>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="confirmationChoice">
                                            <Field className="Client-type-field" type="radio" value="No" name="confirmationChoice" id="no" />
                                            <label className="Client-type-label">No deseo participar</label>
                                        </div>
                                    </Row>
                                </Col>
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

export default ConfirmationSuccess;