import React from 'react';
import { withRouter } from 'react-router-dom';
import publicIp from 'public-ip';
import { Form, Row, Col, Container, InputGroup, Button } from 'react-bootstrap'
import { Formik, ErrorMessage } from 'formik';

import { validaRut, rutChecker, getUrlParam, decodeFromBase64 } from '../../utils/utils';

import { connect } from "react-redux";

import SessionHeader from '../session/session';

import setTracker from '../../actions/setTracker';
import validateToken from '../../actions/validateToken';

import * as CONSTANTS from '../../utils/constants';

class ValidacionWhatsapp extends React.Component {
    constructor(props) {
        super(props);
        this.setButtonState = this.setButtonState.bind(this);
        this.state = {
            attenderRut: getUrlParam(window.location.href, 'r', ''), 
            canal: getUrlParam(window.location.href, 'c', ''), 
            canalPromotor: getUrlParam(window.location.href, 'cp', ''), 
            sku: getUrlParam(window.location.href, 'sku', ''), 
            encodedData: getUrlParam(window.location.href, 'encodedData', ''), 
            token: '', 
            userAgent: window.navigator.userAgent, 
            os: window.navigator.platform, 
            ip: '', 
            page: 'WhatsApp Validation', 
            isDisabled: false
        };
    }

    componentDidMount() {
        let cellphone = undefined;
        if(this.state.encodedData) {
            let decodedData = '?' + decodeFromBase64(this.state.encodedData);
            cellphone = getUrlParam(decodedData, 'telefono', '');
            this.setState({ 
                attenderRut: getUrlParam(decodedData, 'r', ''), 
                canal: getUrlParam(decodedData, 'c', '').replace('C\\', ''), 
                canalPromotor: getUrlParam(decodedData, 'cp', ''), 
                cellphone: getUrlParam(decodedData, 'telefono', ''), 
                token: getUrlParam(decodedData, 'token', '')
            });
        }

        if(cellphone == undefined) {
            alert('La validación es incorrecta debido a que el número telefónico no está presente;');
            this.props.history.push("/");
        }

        (async () => {
            let ipv4 = await publicIp.v4();
            this.setState({ ip: ipv4 });
            this.props.setTracker(this.state, () => {}, () => {});
        })();
    }

    setButtonState(value) {
        this.setState({ isDisabled: value })
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
                                        sku: this.state.sku, 
                                        attenderRut: this.state.attenderRut, 
                                        canal: this.state.canal, 
                                        canalPromotor: this.state.canalPromotor }}
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
                        this.setButtonState(true);
                        if(!this.errors) {
                            values.ip = this.state.ip;
                            values.cellphone = this.state.cellphone;
                            values.validationMethod = CONSTANTS.WHATSAPP;
                            values.token = this.state.token;
                            values.attenderRut = this.state.attenderRut;
                            values.canal = this.state.canal;
                            values.canalPromotor = this.state.canalPromotor;
                            
                            setSubmitting(false);
                            this.setButtonState(false);
                        } else {
                            alert('Uno o más campos tienen inconsistencias. Por favor, intente nuevamente');
                            setSubmitting(false);
                            this.setButtonState(false);
                        } 
                    }}
                >
                {({ handleSubmit, values, handleChange }) => (
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
                                                    maxLength='9'
                                                    aria-describedby="inputGroupPrepend"
                                                    required
                                                    type="tel" 
                                                    name="cellphone" 
                                                    value={this.state.cellphone}
                                                    onChange={handleChange}
                                                    onBlur={this.validate}
                                                    placeholder="Ingrese los últimos 8 digitos" 
                                                />
                                            )
                                            :
                                            (
                                                <Form.Control 
                                                    required
                                                    maxLength='9'
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
                                    <Form.Text>
                                        <ErrorMessage name="cellphone" component="div" />
                                    </Form.Text>
                                </Col>
                            </Form.Group>
                                
                            <input type="hidden" value="" name="attender_rut" id="hiddenRut" />
                            <input type="hidden" value="" name="codeToValidate" id="hiddenCode" />
                            <input type="hidden" value="" name="expires_at" id="hiddenExpiration" />
                                    
                            <Button block type="submit" disabled={this.state.isDisabled} variant="danger">
                                Continuar
                            </Button>
                        </Form>
                    </Container>
                )}
                </Formik>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    setTracker: (payload, onSuccess, onFailure) => dispatch(setTracker(payload, onSuccess, onFailure)), 
    validateToken: (payload, onSuccess, onFailure) => dispatch(validateToken(payload, onSuccess, onFailure))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ValidacionWhatsapp));