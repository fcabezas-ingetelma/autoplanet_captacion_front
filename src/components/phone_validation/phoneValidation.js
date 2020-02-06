import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { Button} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import {Form, Row, Col, Container, InputGroup} from 'react-bootstrap'
import dataStore from '../../store';
import './phoneValidation.css';

import { connect } from "react-redux";
import validateCode from '../../actions/validateCode';
import createSolicitud from '../../actions/createSolicitud';
import updateSMSData from '../../actions/updateSMSData';

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

    redirectToPhoneChange() {
        this.props.history.push("/change_phone");
    }

    render() {
        if(dataStore.getState()) {
            return (
                <div>
                    <SessionHeader attenderRut={this.state.attenderRut} rut={this.state.rut} canal={this.state.canal} />
                    <Formik
                        initialValues = {{ rut: this.state.rut, 
                                        cellphone: this.state.cellphone, 
                                        ip: this.state.ip, 
                                        userAgent: this.state.userAgent, 
                                        os: this.state.os, 
                                        clientType: this.state.clientType, 
                                        attenderRut: this.state.attenderRut,
                                        canal: this.state.canal, 
                                        canalPromotor: this.state.canalPromotor, 
                                        sku: this.state.sku, 
                                        expires_at: this.state.expires_at,
                                        confirmationChoice: this.state.confirmationChoice, 
                                        email: this.state.email, 
                                        code: '', 
                                        estados: this.state.estados }}
                        validate = {values => {
                            const errors = {};

                            //Validate sms
                            if (values.code != this.state.codeToValidate) {
                                errors.code = 'El código ingresado no coincide. Intente nuevamente.';
                                this.props.createSolicitud(values, 6, () => {}, () => {});
                            }

                            return errors;
                        }}
                        onSubmit = {(values, { setSubmitting }) => {
                            if(values.expires_at >= Date.now()) {
                                setSubmitting(false);
                                this.props.validateCode(values);
                                this.props.updateSMSData(values, () => {}, () => {});
                                this.props.createSolicitud(values, 5, () => {
                                    this.props.history.push("/confirmation");
                                }, () => {});
                            } else {
                                setTimeout(() => {
                                    alert('El código ha expirado. Por favor, intente nuevamente.');
                                    setSubmitting(false);
                                    this.props.createSolicitud(values, 6, () => {
                                        this.props.history.push("/");
                                    }, () => {});
                                }, 400);
                            } 
                        }}
                    >
                    {({ isSubmitting, handleSubmit, values, handleChange }) => (
                        <Container>
                            <h2>CONFIRMACIÓN DE TELÉFONO</h2>
                            <label >Se ha enviado un código de 4 dígitos al número {this.state.cellphone}, el cual debe ingresar a continuación:</label>
                            <p onClick={this.redirectToPhoneChange.bind(this)} style={{cursor: 'pointer', color:'red'}}>¿No es su número? Haga click aquí para modificarlo.</p>
                            <Form onSubmit={handleSubmit} >
                                <Form.Group as={Row} controlID='CodigoSms'>
                                    <Col align='left'>
                                    <Form.Label >Ingrese Código</Form.Label>
                                        <Form.Control  type="text" name="code" placeholder="1234" value={values.code} onChange={handleChange}/>
                                        <ErrorMessage  name="code" component="div" />
                                    </Col>
                                </Form.Group>
                                <Row>
                                    <Col><Button  type="submit" disabled={isSubmitting} color="danger">
                                        Confirmar
                                    </Button></Col>
                                </Row>
                                
                        </Form>
                        </Container>
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
    validateCode: (payload) => dispatch(validateCode(payload)), 
    createSolicitud: (payload, estado_id, onSuccess, onFailure) => dispatch(createSolicitud(payload, estado_id, onSuccess, onFailure)), 
    updateSMSData: (payload, onSuccess, onFailure) => dispatch(updateSMSData(payload, onSuccess, onFailure))
});
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PhoneValidation));