import React from 'react';
import { withRouter } from 'react-router-dom';
import {Form, Row, Col, Container, InputGroup, Button} from 'react-bootstrap'
import dataStore from '../../store';
import {Formik} from 'formik';

import { connect } from "react-redux";
import addUserBasicData from '../../actions/addUserBasicData';
import getEstados from '../../actions/getEstados';
import setEstados from '../../actions/setEstados';
import createSolicitud from '../../actions/createSolicitud';
import setTracker from '../../actions/setTracker';

import { getPhoneValidationState } from '../../utils/utils';


import SessionHeader from '../session/session';


class EnvioWhatsapp extends React.Component {
    url =  '';
    constructor(props) {
        super(props);
        if(dataStore.getState()) {
            this.state = getPhoneValidationState(dataStore);
        } else {
            this.props.history.push("/");
        }
    }

    asignUrl(){
        this.url = window.location.origin + '/?r=' + this.state.attenderRut + '&telefono=' + this.cellphone + '&c=20';
    }

    render(){
        return(
            <div>
                <SessionHeader attenderRut={this.state.attenderRut} rut={this.state.rut} canal={this.state.canal} />
                <Formik
                    initialValues = {{
                        cellphone:'',
                    }}
                    onSubmit = {(values, {setSubmitting}) => {
                        if(!values.cellphone){
                            alert('Ingrese un numero de telefono valido');
                            setSubmitting(false);
                        }else{

                        }
                    }}
                >
                {({ isSubmitting, handleSubmit, values, handleChange}) => (
                    <Container>
                        <h2>Ingrese su Teléfono Celular:</h2>
                    <Form onSubmit={handleSubmit} >
                        <Form.Group as={Row} controlID='cellphone'>
                            <Col align='left'>
                                <Form.Label  >
                                    Teléfono Celular
                                </Form.Label>
                            </Col>
                            <Col sm={10}>
                                <InputGroup>
                                    <InputGroup.Prepend id="inputGroupPrepend">
                                        <InputGroup.Text>+569</InputGroup.Text>
                                    </InputGroup.Prepend>
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
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Row>
                            <Col>
                                <a onClick={this.asignUrl()} href={`https://api.whatsapp.com/send?phone=569${values.cellphone}&text=${encodeURIComponent(this.url)}`} class="btn btn-success btn-block">
                                    Enviar Link por WhatsApp
                                </a>   
                            </Col>
                        </Row>
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
setTracker: (payload, onSuccess, onFailure) => dispatch(setTracker(payload, onSuccess, onFailure))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EnvioWhatsapp));