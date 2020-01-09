// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Container, Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { validaRut, validaPhoneLength, getUrlParam } from '../../utils/utils';
import publicIp from 'public-ip';

import { connect } from "react-redux";
import addUserBasicData from '../../actions/addUserBasicData';
import getEstados from '../../actions/getEstados';
import setEstados from '../../actions/setEstados';

import SessionHeader from '../session/session';

import './InputData.css';

class InputData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                        attenderRut: getUrlParam(window.location.href, 'r', ''), 
                        ip: '', 
                        estados: undefined
                     };
    }

    componentDidMount() {
        (async () => {
            let ipv4 = await publicIp.v4();
            this.setState({ ip: ipv4 });
        })();

        this.props.getEstados((estados) => {
            this.setState({ estados: estados });
            this.props.setEstados(this.state);
        }, () => {});
    }

    render() {
        return (
            <div className="InputForm">
                <SessionHeader attenderRut={this.state.attenderRut} />
                <Formik
                    initialValues = {{  rut: '', 
                                        cellphone: '', 
                                        ip: this.state.ip, 
                                        clientType: '', 
                                        attenderRut: this.state.attenderRut, 
                                        codeToValidate: '', 
                                        expires_at: '',
                                        confirmationChoice: '', 
                                        estados: this.state.estados }}
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
                    onSubmit = {(values, { setSubmitting }) => {
                        if(!this.errors) {
                            values.ip = this.state.ip;
                            values.estados = this.state.estados;
                            this.props.addUserBasicData(values, 
                                () => {
                                    //Success
                                    setSubmitting(false);
                                    this.props.history.push("/sms");
                                }, (error) => {
                                    //Error
                                    alert(error ? error : 'Hubo un error al procesar la solicitud. Por favor, intente nuevamente');
                                    setSubmitting(false);
                                }
                            );
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
                                <Col>
                                    <Field className="Rut-field" type="text" name="rut" placeholder="Ingrese Rut sin puntos y con guión"/>
                                    <ErrorMessage className="error-label" name="rut" component="div" />
                                </Col>
                            </Row>
                            <Row className="Cellphone-row">
                                <Col><label className="Cellphone-label">Teléfono Celular</label></Col>
                                <Col>
                                    <Row>
                                        <span className="Cellphone-span">+569</span>
                                        <Field className="Cellphone-field" type="phone" name="cellphone" placeholder="Ingrese los últimos 8 digitos" />
                                    </Row>
                                    <ErrorMessage className="error-label" name="cellphone" component="div" />
                                </Col>
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
                            <Row className="Client-selection-row">
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

const mapStateToProps = state => ({
    ...state
});
  
const mapDispatchToProps = dispatch => ({
    addUserBasicData: (payload, onSuccess, onFailure) => dispatch(addUserBasicData(payload, onSuccess, onFailure)), 
    getEstados: (onSuccess, onFailure) => dispatch(getEstados(onSuccess, onFailure)), 
    setEstados: (payload) => dispatch(setEstados(payload))
});
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InputData));