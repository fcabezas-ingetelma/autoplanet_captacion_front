// Render Prop
import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { withRouter } from 'react-router-dom';
import { validaRut, validaPhoneLength, getUrlParam } from '../../utils/utils';
import publicIp from 'public-ip';
import {Form, Row, Col, Container, InputGroup, Button, Alert} from 'react-bootstrap'

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
        function validRut(e){
            let value = e.target.value.replace(/\./g, '').replace('-', '');
  
            if (value.match(/^(\d{2})(\d{3}){2}(\w{1})$/)) {
              value = value.replace(/^(\d{2})(\d{3})(\d{3})(\w{1})$/, '$1$2$3-$4');
            }
            else if (value.match(/^(\d)(\d{3}){2}(\w{0,1})$/)) {
              value = value.replace(/^(\d)(\d{3})(\d{3})(\w{0,1})$/, '$1$2$3-$4');
            }
            else if (value.match(/^(\d)(\d{3})(\d{0,2})$/)) {
              value = value.replace(/^(\d)(\d{3})(\d{0,2})$/, '$1$2$3');
            }
            else if (value.match(/^(\d)(\d{0,2})$/)) {
              value = value.replace(/^(\d)(\d{0,2})$/, '$1$2');
            }
            e.target.value = value;
        }

        return (
            <div>
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
                {({ isSubmitting, handleSubmit, values, handleChange }) => (
                    <Container >
                        <Form onSubmit={handleSubmit}>
                            <Form.Group as={Row} controlId='rut'>
                                <Col align='left'>
                                <Form.Label sm={2}  >
                                    RUT
                                </Form.Label>
                                </Col>
                                <Col sm={10}>
                                    <Form.Control 
                                        required
                                        maxLength='10'
                                        type="text" 
                                        onChange={handleChange}
                                        onInput={validRut}
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

                            <Form.Group as={Row} controlId='email'>
                                <Col align='left'>
                                <Form.Label >
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
                                    <Form.Label column sm={2}>
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
                                            value='No'
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
                                            value='Si'
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
    setTracker: (payload, onSuccess, onFailure) => dispatch(setTracker(payload, onSuccess, onFailure))
});
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InputData));