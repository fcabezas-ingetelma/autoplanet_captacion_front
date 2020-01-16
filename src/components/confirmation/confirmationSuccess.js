import React from 'react';
import { Formik, Field } from 'formik';
import { Button} from 'reactstrap';
import {Form, Row, Col, Container, InputGroup} from 'react-bootstrap'


import { withRouter } from 'react-router-dom';
import dataStore from '../../store';
import './confirmationSuccess.css';

import { connect } from "react-redux";
import updateAttendanceInfo from '../../actions/updateAttendanceInfo'
import getSinacofiData from '../../actions/getSinacofiData';

import { getConfirmationState } from '../../utils/utils';

import SessionHeader from '../session/session';

class ConfirmationSuccess extends React.Component {
    constructor(props) {
        super(props);
        if(dataStore.getState()) {
            this.state = getConfirmationState(dataStore);
        } else {
            this.props.history.push("/");
        }
    }

    componentDidMount() {
        if(this.state) {
            let requestBody = {
                rut: this.state.rut, 
                attenderRut: this.state.attenderRut, 
                canal: this.state.canal
            }
            this.props.getSinacofiData(requestBody, () => {
                if(this.state.attenderRut || this.state.canal) {
                    this.props.updateAttendanceInfo(requestBody, () => {}, () => {});
                }
            }, () => {
                if(this.state.attenderRut || this.state.canal) {
                    this.props.updateAttendanceInfo(requestBody, () => {}, () => {});
                }
            });
        }
    }

    render() {
        if(dataStore.getState()) {
            return(
                <div className="InputForm">
                    <SessionHeader attenderRut={this.state.attenderRut} rut={this.state.rut} canal={this.state.canal} />
                    <Formik
                        initialValues = {{ rut: this.state.rut, 
                                        cellphone: this.state.cellphone, 
                                        ip: this.state.ip, 
                                        clientType: this.state.clientType, 
                                        attenderRut: this.state.attenderRut, 
                                        canal: this.state.canal, 
                                        code: this.state.code,
                                        confirmationChoice: this.state.confirmationChoice, 
                                        email: this.state.email, 
                                        estados: this.state.estados }}
                        validate = {values => {
                            const errors = {};
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setSubmitting(false);
                            window.location.href = 'https://www.autoplanet.cl/'; 
                        }}
                    >
                    {({ isSubmitting, handleSubmit }) => (
                        <Container>
                            <h2>FELICITACIONES</h2>
                                
                            <h5 >Bienvenido(a) al Club Autoplanet. Usted podrá acceder a promociones y descuentos presentando su RUT en las cajas de nuestras sucursales.</h5>
                                
                            <Form onSubmit={handleSubmit} >
                                <Row align="center">
                                    <Col><Button type="submit" disabled={isSubmitting} color="danger">
                                        Finalizar
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
    updateAttendanceInfo: (payload, onSuccess, onFailure) => dispatch(updateAttendanceInfo(payload, onSuccess, onFailure)), 
    getSinacofiData: (payload, onSuccess, onFailure) => dispatch(getSinacofiData(payload, onSuccess, onFailure))
});
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfirmationSuccess));