// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Container, Row, Col } from 'reactstrap';
import { validaRut, validaPhoneLength, getUrlParam } from '../../utils/utils'
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
                initialValues={{ rut: '', cellphone: '', clientType: '', attenderRut: this.state.attenderRut }}
                validate={values => {
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
                    setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                    }, 400);
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
                                <input type="hidden" value="" name="attender_rut" id="hiddenRut" />
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

export default InputData;