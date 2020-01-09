import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Container, Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import dataStore from '../../store';
import './phoneValidation.css';

import { connect } from "react-redux";
import validateCode from '../../actions/validateCode';

import { getPhoneValidationState } from '../../utils/utils';

import SessionHeader from '../session/session';

class PhoneValidation extends React.Component {
    constructor(props) {
        super(props);
        if(dataStore.getState()) {
            this.state = getPhoneValidationState(dataStore);
        } else {
            this.props.history.push("/");
        }
    }

    render() {
        if(dataStore.getState()) {
            return (
                <div className="InputForm">
                    <SessionHeader attenderRut={this.state.attenderRut} rut={this.state.rut} />
                    <Formik
                        initialValues = {{ rut: this.state.rut, 
                                        cellphone: this.state.cellphone, 
                                        ip: this.state.ip, 
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
                        onSubmit = {(values, { setSubmitting }) => {
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