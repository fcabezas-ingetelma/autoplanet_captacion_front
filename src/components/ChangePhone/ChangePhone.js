import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { Button} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import {Form, Row, Col, Container, InputGroup} from 'react-bootstrap'
import dataStore from '../../store';

import { connect } from "react-redux";
import setTracker from '../../actions/setTracker';
import updateCellphone from '../../actions/updateCellphone';

import { getPhoneValidationState } from '../../utils/utils';

import SessionHeader from '../session/session';

class ChangePhone extends React.Component {
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
                <div>
                    <SessionHeader attenderRut={this.state.attenderRut} rut={this.state.rut} canal={this.state.canal} />
                    <Formik
                        initialValues = {{ rut: this.state.rut, 
                                           cellphone: '', 
                                           ip: this.state.ip, 
                                           userAgent: this.state.userAgent, 
                                           os: this.state.os, 
                                           clientType: this.state.clientType, 
                                           attenderRut: this.state.attenderRut,
                                           canal: this.state.canal, 
                                           sku: this.state.sku, 
                                           expires_at: this.state.expires_at,
                                           confirmationChoice: this.state.confirmationChoice, 
                                           email: this.state.email, 
                                           code: '', 
                                           estados: this.state.estados 
                                        }}
                        validate = {values => {
                            const errors = {};
                            
                            if (values.cellphone == this.state.cellphone) {
                                errors.cellphone = 'El teléfono ingresado es el mismo. Intente nuevamente.';
                            }

                            return errors;
                        }}
                        onSubmit = {(values, { setSubmitting }) => {
                            setSubmitting(false);
                            if(!this.errors){
                                this.props.updateCellphone(values, () => {
                                    this.props.history.push("/sms");
                                }, () => {
                                    alert('Hubo un problema al actualizar la información. Por favor, intente nuevamente');
                                });
                            } else {
                                alert('Uno o más campos tienen inconsistencias. Por favor, intente nuevamente');
                            }                             
                        }}
                    >
                    {({ isSubmitting, handleSubmit, values, handleChange }) => (
                        <Container>
                            <h2>CAMBIO NÚMERO DE TELÉFONO</h2>
                            <label>Ingrese su nuevo número de teléfono</label>                                    
                            <Form onSubmit={handleSubmit} >
                                <Form.Group as={Row} controlID='ChangePhone'>
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
                                    <Form.Text>
                                            <ErrorMessage name="cellphone" component="div" />
                                    </Form.Text>
                                </Col>
                                </Form.Group>
                                <Row>
                                    <Col><Button  type="submit" disabled={isSubmitting} color="danger">
                                        Cambiar
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
    setTracker: (payload, onSuccess, onFailure) => dispatch(setTracker(payload, onSuccess, onFailure)), 
    updateCellphone: (payload, onSuccess, onFailure) => dispatch(updateCellphone(payload, onSuccess, onFailure))
});
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChangePhone));