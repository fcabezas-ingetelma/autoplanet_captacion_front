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
import createSolicitud from '../../actions/createSolicitud';
import setTracker from '../../actions/setTracker';

import SessionHeader from '../session/session';

import './InputData.css';

class InputData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                        attenderRut: getUrlParam(window.location.href, 'r', ''), 
                        canal: getUrlParam(window.location.href, 'c', ''), 
                        ip: '', 
                        estados: undefined
                     };
    }

    componentDidMount() {
        (async () => {
            let ipv4 = await publicIp.v4();
            this.setState({ ip: ipv4 });

            this.props.setTracker(this.state, () => {}, () => {});
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
                                        canal: this.state.canal, 
                                        codeToValidate: '', 
                                        expires_at: '',
                                        confirmationChoice: '', 
                                        email: '', 
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
                                    //This commented code has no sense since solcitud don't keep track of states
                                    //In the near future we should have a 'move_to' table
                                    /*if(values.cellphone) {
                                        this.props.createSolicitud(values, 4, () => {}, () => {});
                                    }
                                    if(values.confirmationChoice) {
                                        switch (values.confirmationChoice) {
                                            case 'Si': this.props.createSolicitud(values, 7, () => {}, () => {});
                                                       break;
                                            case 'No': this.props.createSolicitud(values, 8, () => {}, () => {});
                                                       break;
                                        }
                                    }*/
                                    this.props.createSolicitud(values, 3, () => {
                                        //Solicitud created successfully
                                        this.props.history.push("/sms");
                                    }, () => {
                                        //Solicitud creation error
                                        //TODO Manage this state
                                        this.props.history.push("/sms");
                                    });
                                }, (error) => {
                                    if(error == '160') {
                                        //SMS Sended and validated, must finish process
                                        this.props.history.push("/confirmation");
                                    } else if(error.split('-')[0] == '170') {
                                        alert(error.split('-')[1]);
                                    } else {
                                        //Error
                                        alert(error ? error : 'Hubo un error al procesar la solicitud. Por favor, intente nuevamente');
                                    }
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
                            <Row className="Rut-row">
                                <Col><label className="Rut-label">Email</label></Col>
                                <Col>
                                    <Field className="Rut-field" type="text" name="email" placeholder="Ingrese Email"/>
                                    <ErrorMessage className="error-label" name="email" component="div" />
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
                                        <label className="Client-type-label">¿Desea participar en campañas promocionales?</label>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className="confirmationChoice">
                                                <Field className="Client-type-field" type="radio" value="Si" name="confirmationChoice" id="si" />
                                                <label className="Client-type-label">Sí</label>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="confirmationChoice">
                                                <Field className="Client-type-field" type="radio" value="No" name="confirmationChoice" id="no" />
                                                <label className="Client-type-label">No</label>
                                            </div>
                                        </Col>
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
    setEstados: (payload) => dispatch(setEstados(payload)), 
    createSolicitud: (payload, estado_id, onSuccess, onFailure) => dispatch(createSolicitud(payload, estado_id, onSuccess, onFailure)), 
    setTracker: (payload, onSuccess, onFailure) => dispatch(setTracker(payload, onSuccess, onFailure))
});
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InputData));