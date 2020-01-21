// Render Prop
import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { withRouter } from 'react-router-dom';
import { validaRut, rutChecker, getUrlParam, decodeFromBase64 } from '../../utils/utils';
import publicIp from 'public-ip';
import {Form, Row, Col, Container, InputGroup, Button, Alert} from 'react-bootstrap'

import { connect } from "react-redux";
import addUserBasicData from '../../actions/addUserBasicData';
import getEstados from '../../actions/getEstados';
import setEstados from '../../actions/setEstados';
import createSolicitud from '../../actions/createSolicitud';
import setTracker from '../../actions/setTracker';
import validateToken from '../../actions/validateToken';

import SessionHeader from '../session/session';

import * as CONSTANTS from '../../utils/constants';

import './InputData.css';

class InputData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                        attenderRut: getUrlParam(window.location.href, 'r', ''), 
                        canal: getUrlParam(window.location.href, 'c', ''), 
                        sku: getUrlParam(window.location.href, 'sku', ''), 
                        encodedData: getUrlParam(window.location.href, 'encodedData', ''), 
                        userAgent: window.navigator.userAgent, 
                        os: window.navigator.platform, 
                        ip: '', 
                        cellphone: '', 
                        page: 'Home Page', 
                        estados: undefined, 
                        token: ''
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

        if(this.state.encodedData) {
            let decodedData = '?' + decodeFromBase64(this.state.encodedData);
            this.setState({ 
                attenderRut: getUrlParam(decodedData, 'r', ''), 
                canal: getUrlParam(decodedData, 'c', '').replace('C\\', ''), 
                cellphone: getUrlParam(decodedData, 'telefono', ''), 
                token: getUrlParam(decodedData, 'token', '')
            });
        }
    }

    successResponseHandler(values) {
        if(this.state.encodedData && this.state.cellphone) {
            this.props.validateToken(values, () => {
                this.props.history.push("/confirmation");
            }, () => {
                alert('La información enviada via WhatsApp ha caducado. Por favor, repita el proceso nuevamente.');
            });
        } else {
            this.props.history.push("/sms");
        }
    }

    failureResponseHandler(values, error) {
        if(this.state.encodedData) {
            //User enter using WhatsApp
            this.props.validateToken(values, () => {
                this.props.history.push("/confirmation");
            }, () => {
                alert('La información enviada via WhatsApp ha caducado. Por favor, repita el proceso nuevamente.');
            });
        } else {
            alert(error ? error : 'Hubo un error al procesar la solicitud. Por favor, intente nuevamente');
        }
    }

    render() {
        return (
            <div>
                <SessionHeader attenderRut={this.state.attenderRut} />
                <Formik
                    initialValues = {{  rut: '', 
                                        cellphone: this.state.cellphone, 
                                        ip: this.state.ip, 
                                        userAgent: this.state.userAgent, 
                                        os: this.state.os, 
                                        clientType: '', 
                                        attenderRut: this.state.attenderRut, 
                                        canal: this.state.canal, 
                                        sku: this.state.sku, 
                                        codeToValidate: '', 
                                        expires_at: '',
                                        confirmationChoice: '', 
                                        email: '', 
                                        estados: this.state.estados }}
                    validate = {values => {
                        const errors = {};
                        if (!values.rut) {
                            errors.rut = 'Campo Requerido';
                        } else if (!validaRut(values.rut)) {
                            errors.rut = 'Rut Inválido';
                        }
                        return errors;
                    }}
                    onSubmit = {(values, { setSubmitting }) => {
                        if(!this.errors) {
                            values.ip = this.state.ip;
                            values.estados = this.state.estados;
                            if(this.state.encodedData && this.state.cellphone) {
                                values.cellphone = this.state.cellphone;
                                values.validationMethod = CONSTANTS.WHATSAPP;
                                values.token = this.state.token;
                                values.attenderRut = this.state.attenderRut;
                                values.canal = this.state.canal;
                            } else {
                                values.validationMethod = CONSTANTS.SMS;
                            }
                            
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
                                        this.successResponseHandler.bind(this, values);
                                    }, () => {
                                        //Solicitud creation error
                                        //TODO Manage this state
                                        this.successResponseHandler.bind(this, values);
                                    });
                                }, (error) => {
                                    if(error == '150') {
                                        //SMS Sended but not validated.
                                        this.failureResponseHandler.bind(this, values, error);
                                    } else if(error == '160') {
                                        //SMS Sended and validated, must finish process
                                        this.props.history.push("/confirmation");
                                    } else if(error && error.split('-')[0] == '170') {
                                        alert(error.split('-')[1]);
                                    } else {
                                        this.failureResponseHandler.bind(this, values, error);
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
                {({ isSubmitting, handleSubmit, values, handleChange }) => (
                    <Container >
                        <Form onSubmit={handleSubmit}>
                            <Form.Group as={Row} controlId='rut'>
                                <Col align='left'>
                                    <Form.Label sm={2} >
                                        RUT
                                    </Form.Label>
                                </Col>
                                <Col sm={10}>
                                    <Form.Control 
                                        required
                                        maxLength='10'
                                        type="text" 
                                        onChange={handleChange}
                                        onInput={rutChecker}
                                        onBlur={this.validate}
                                        value={values.rut}
                                        name="rut" 
                                        placeholder="Ingrese Rut sin puntos y sin guión"
                                    />
                                    <Form.Text>
                                            <ErrorMessage name="rut" component="div" />
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId='cellphone'>
                                <Col align='left'>
                                    <Form.Label sm={2} >
                                        Teléfono Celular
                                    </Form.Label>
                                </Col>
                                <Col sm={10}>
                                    <InputGroup>
                                        <InputGroup.Prepend id="inputGroupPrepend">
                                            <InputGroup.Text>+569</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        {this.state.cellphone ? (
                                                <Form.Control 
                                                    required
                                                    disabled
                                                    maxLength='8'
                                                    aria-describedby="inputGroupPrepend"
                                                    required
                                                    type="tel" 
                                                    name="cellphone" 
                                                    value={this.state.cellphone}
                                                    onChange={handleChange}
                                                    placeholder="Ingrese los últimos 8 digitos" 
                                                />
                                            )
                                            :
                                            (
                                                <Form.Control 
                                                    required
                                                    maxLength='8'
                                                    aria-describedby="inputGroupPrepend"
                                                    required
                                                    type="tel" 
                                                    name="cellphone" 
                                                    value={values.cellphone}
                                                    onChange={handleChange}
                                                    placeholder="Ingrese los últimos 8 digitos" 
                                                />
                                            )
                                        }
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId='email'>
                                <Col align='left'>
                                    <Form.Label sm={2} >
                                        Email  <label className="text-muted">(Opcional)</label>
                                    </Form.Label>
                                </Col>
                                <Col sm={10}>
                                    <Form.Control 
                                        type="email" 
                                        name="email" 
                                        value={values.email}
                                        onChange={handleChange}
                                        placeholder="Ingrese Email"
                                    />
                                </Col>
                            </Form.Group>
                            
                            <Form.Group as={Row} controlId='clientType' value={values.clientType}>
                                <Col align='left'>
                                    <Form.Label >
                                        Tipo de Cliente
                                    </Form.Label>
                                </Col>
                                <Col align='left' sm={10}>
                                    {['Cabify','Cornershop','Empleado','Taller','Otro'].map(type =>(
                                        <div key={`${type}`}>
                                            <Form.Check
                                                required
                                                type='radio'
                                                id={`${type}`}
                                                label={`${type}`}
                                                value={`${type}`}
                                                onChange={handleChange}
                                                name="clientType"
                                            />
                                        </div>
                                    ))}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId='confirmationChoice' value={values.confirmationChoice}>
                                <Form.Label sm={2} column >
                                    ¿Desea participar en campañas promocionales?
                                </Form.Label>
                                <Col>
                                    <Form.Check
                                        inline
                                        required
                                        type='radio'
                                        id='si'
                                        label='Sí'
                                        name='confirmationChoice'
                                        value='Si'
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        inline
                                        required
                                        type='radio'
                                        id='no'
                                        label='No'
                                        name='confirmationChoice'
                                        value='No'
                                        onChange={handleChange}
                                    />
                                </Col> 
                            </Form.Group>
                                
                            <input type="hidden" value="" name="attender_rut" id="hiddenRut" />
                            <input type="hidden" value="" name="codeToValidate" id="hiddenCode" />
                            <input type="hidden" value="" name="expires_at" id="hiddenExpiration" />
                                    
                            <Button block type="submit" disabled={isSubmitting} variant="danger">
                                Continuar
                            </Button>
                        </Form>
                    </Container>
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
    setTracker: (payload, onSuccess, onFailure) => dispatch(setTracker(payload, onSuccess, onFailure)), 
    validateToken: (payload, onSuccess, onFailure) => dispatch(validateToken(payload, onSuccess, onFailure))
});
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InputData));