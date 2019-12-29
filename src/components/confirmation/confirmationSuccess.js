import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Container, Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import dataStore from '../../store';
import './confirmationSuccess.css';

import { connect } from "react-redux";
import confirmOptions from '../../actions/confirmOptions';

class ConfirmationSuccess extends React.Component {
    constructor(props) {
        super(props);
        if(dataStore.getState()) {
            this.state = { rut: dataStore.getState().userData.rut !== '' ? dataStore.getState().userData.rut : '', 
                           cellphone: dataStore.getState().userData.cellphone !== '' ? dataStore.getState().userData.cellphone : '', 
                           clientType: dataStore.getState().userData.clientType !== '' ? dataStore.getState().userData.clientType : '', 
                           attenderRut: dataStore.getState().userData.attenderRut !== '' ? dataStore.getState().userData.attenderRut : '', 
                           code: dataStore.getState().userData.code !== '' ? dataStore.getState().userData.code : '',
                           confirmationChoice: '' };
        } else {
            this.props.history.push("/");
        }
    }

    render() {
        if(dataStore.getState()) {
            return(
                <div className="InputForm">
                    <Container>
                        <Row>
                            <Col>
                                <div className="attender-field-spacing">
                                    <p id="attendedText">{(this.state.attenderRut !== '' && this.state.attenderRut !== undefined) ? 'Ejecutivo Comercial: ' + this.state.attenderRut : ''}</p>
                                </div>
                            </Col>
                            <Col>
                                <div className="attender-field-spacing">
                                    <p id="userText">{(this.state.rut !== '' && this.state.rut !== undefined) ? 'Identificado como: ' + this.state.rut : ''}</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <Formik
                    initialValues = {{ rut: this.state.rut, 
                                    cellphone: this.state.cellphone, 
                                    clientType: this.state.clientType, 
                                    attenderRut: this.state.attenderRut, 
                                    code: this.state.code,
                                    confirmationChoice: '' }}
                    validate = {values => {
                        const errors = {};
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        this.props.confirmOptions(values);
                        setSubmitting(false);
                        window.location.href = 'https://www.autoplanet.cl/'; 
                    }}
                    >
                    {({ isSubmitting }) => (
                        <Form className="Form-spacing">
                            <Container>
                                <Row>
                                    <h2>FELICITACIONES</h2>
                                </Row>
                                <Row>
                                    <label className="Phone-description-label">Usted ya puede acceder a descuentos por esta compra. Le invitamos a participar en futuras campañas promocionales donde habrán mayores descuentos y beneficios.</label>
                                </Row>
                                <Row className="Client-type-row">
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
                                    <Col><Button className="Submit-button" type="submit" disabled={isSubmitting} color="danger">
                                        Confirmar
                                    </Button></Col>
                                </Row>
                            </Container>
                        </Form>
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
    confirmOptions: (payload) => dispatch(confirmOptions(payload))
});
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfirmationSuccess));