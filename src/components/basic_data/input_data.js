// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Container, Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { validaRut, validaPhoneLength, getUrlParam } from '../../utils/utils';

import { connect } from "react-redux";
import addUserBasicData from '../../actions/addUserBasicData';
import HttpRequester from '../../http/sms/httpRequester';

import './InputData.css';

class InputData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {attenderRut: getUrlParam(window.location.href, 'r', '')};
    }

    render() {
        return (
            <div className="InputForm">
                <div className="attender-text">
                    <p id="attendedText">{(this.state.attenderRut !== '' && this.state.attenderRut !== undefined) ? 'Ejecutivo Comercial: ' + this.state.attenderRut : ''}</p>
                </div>
                <Formik
                initialValues = {{ rut: '', cellphone: '', clientType: '', attenderRut: this.state.attenderRut, codeToValidate: '', expires_at: '' }}
                validate = {values => {
                    const errors = {};

                    //Validate rut
                    if (!values.rut) {
                    errors.rut = 'Campo Requerido';
                    } else if (!validaRut(values.rut)) {
                    errors.rut = 'Rut Inválido';
                    }
                    
                    //Validate phone number
                    if(!values.cellphone) {
                        errors.cellphone = 'Campo Requerido';
                    } else if (!validaPhoneLength(values.cellphone)) {
                        errors.cellphone = 'Debe ingresar 8 dígitos';
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    if(!this.errors) {
                        values.codeToValidate = Math.floor(1000 + Math.random() * 9000);
                        values.expires_at = Date.now() + 900000;

                        let requestBody = {
                            phone: '569' + values.cellphone,
                            code: values.codeToValidate
                        }

                        sendSms(requestBody, () => {
                            //Success
                            this.props.addUserBasicData(values);
                            setSubmitting(false);
                            this.props.history.push("/sms");
                        }, () => {
                            //Error
                            alert('Hubo un error al procesar la solicitud. Por favor, intente nuevamente');
                            setSubmitting(false);
                        });
                    } else {
                        alert('Uno o más campos tienen inconsistencias. Por favor, intente nuevamente');
                        setSubmitting(false);
                    } 
                }}
                >
                {({ isSubmitting }) => (
                    <Form className="Form-spacing">
                        <Container>
                            <Row className="Rut-row">
                                <Col><label className="Rut-label">RUN</label></Col>
                                <Col><Field className="Rut-field" type="text" name="rut" placeholder="Ingrese Rut sin puntos y con guión"/></Col>
                                <Col><ErrorMessage className="error-label" name="rut" component="div" /></Col>
                            </Row>
                            <Row className="Cellphone-row">
                                <Col><label className="Cellphone-label">Teléfono Celular</label></Col>
                                <Row>
                                    <span className="Cellphone-span">+569</span>
                                    <Field className="Cellphone-field" type="phone" name="cellphone" placeholder="Ingrese los últimos 8 digitos" />
                                </Row>
                                <Col><ErrorMessage className="spaced-error-label" name="cellphone" component="div" /></Col>
                            </Row>
                            <Row className="Client-type-row">
                                <Col><label className="Client-type-title">Tipo de Cliente</label></Col>
                                <Col>
                                    <Row>
                                        <div className="clientType">
                                            <Field className="Client-type-field" type="radio" value="Taller" name="clientType" id="taller" />
                                            <label className="Client-type-label">Taller</label>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="clientType">
                                            <Field className="Client-type-field" type="radio" value="Uber" name="clientType" id="uber" />
                                            <label className="Client-type-label">Uber</label>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="clientType">
                                            <Field className="Client-type-field" type="radio" value="Empresa" name="clientType" id="empresa" />
                                            <label className="Client-type-label">Empresa</label>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="clientType">
                                            <Field className="Client-type-field" type="radio" value="Persona Natural" name="clientType" id="personaNatural" />
                                            <label className="Client-type-label">Persona Natural</label>
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Row>
                                    <input type="hidden" value="" name="attender_rut" id="hiddenRut" />
                                    <input type="hidden" value="" name="codeToValidate" id="hiddenCode" />
                                    <input type="hidden" value="" name="expires_at" id="hiddenExpiration" />
                                </Row>
                                <Col><Button className="Submit-button" type="submit" disabled={isSubmitting} color="danger">
                                    Ingresar
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

const sendSms = async (requestBody, onSuccess, onFailure) => {
    let requester = new HttpRequester();
    const response = await requester.sendSMS(requestBody);
    if(response.status == 200) {
        if(response.data.message === 'BAD PARAMETERS INVALID PHONE') {
            onFailure();
        } else {
            onSuccess();
        }
    } else {
        onFailure();
    }
}

const mapStateToProps = state => ({
    ...state
});
  
const mapDispatchToProps = dispatch => ({
    addUserBasicData: (payload) => dispatch(addUserBasicData(payload))
});
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InputData));