import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Container, Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import dataStore from '../../store';
import './phoneValidation.css';

import { connect } from "react-redux";
import validateCode from '../../actions/validateCode';

class PhoneValidation extends React.Component {
    constructor(props) {
        super(props);
        if(dataStore.getState()) {
            this.state = { rut: dataStore.getState().userData.rut !== '' ? dataStore.getState().userData.rut : '', 
                           cellphone: dataStore.getState().userData.cellphone !== '' ? dataStore.getState().userData.cellphone : '', 
                           clientType: dataStore.getState().userData.clientType !== '' ? dataStore.getState().userData.clientType : '', 
                           attenderRut: dataStore.getState().userData.attenderRut !== '' ? dataStore.getState().userData.attenderRut : '', 
                           codeToValidate: dataStore.getState().userData.codeToValidate !== '' ? dataStore.getState().userData.codeToValidate : '',
                           expires_at: dataStore.getState().userData.expires_at !== '' ? dataStore.getState().userData.expires_at : '', 
                           confirmationChoice: dataStore.getState().userData.confirmationChoice !== '' ? dataStore.getState().userData.confirmationChoice : '' };
        } else {
            this.props.history.push("/");
        }
    }

    render() {
        if(dataStore.getState()) {
            return (
                <div className="InputForm">
                    <Container>
                        <Row>
                            <Col>
                                <div className="attender-field-spacing">
                                    <p id="attendedText">{(this.state.attenderRut !== '' && this.state.attenderRut !== undefined) ? 'Ejecutivo Comercial: ' + this.state.attenderRut : ''}</p>
                                </div>
                            </Col>
                            <Col>
                                <div className="attender-field-spacing">
                                    <p id="userText">{(this.state.rut !== '' && this.state.rut !== undefined) ? 'Cliente: ' + this.state.rut : ''}</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <Formik
                    initialValues = {{ rut: this.state.rut, 
                                    cellphone: this.state.cellphone, 
                                    clientType: this.state.clientType, 
                                    attenderRut: this.state.attenderRut,
                                    expires_at: this.state.expires_at,
                                    confirmationChoice: this.state.confirmationChoice, 
                                    code: '' }}
                    validate = {values => {
                        const errors = {};

                        //Validate sms
                        if (values.code != this.state.codeToValidate) {
                            errors.code = 'El código ingresado no coincide. Intente nuevamente.';
                        }

                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        if(values.expires_at >= Date.now()) {
                            this.props.validateCode(values);
                            setSubmitting(false);
                            this.props.history.push("/confirmation");
                        } else {
                            setTimeout(() => {
                                alert('El código ha expirado. Por favor, intente nuevamente.');
                                setSubmitting(false);
                                this.props.history.push("/");
                            }, 400);
                        } 
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
                                    <Col>
                                        <Field className="Phone-field" type="text" name="code" placeholder="1234"/>
                                        <ErrorMessage className="error-label" name="code" component="div" />
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
        } else {
            return null;
        }
    }
}

const mapStateToProps = state => ({
    ...state
});
  
const mapDispatchToProps = dispatch => ({
    validateCode: (payload) => dispatch(validateCode(payload))
});
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PhoneValidation));