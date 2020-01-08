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
                           confirmationChoice: dataStore.getState().userData.confirmationChoice !== '' ? dataStore.getState().userData.confirmationChoice : '' };
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
                                    <p id="userText">{(this.state.rut !== '' && this.state.rut !== undefined) ? 'Cliente: ' + this.state.rut : ''}</p>
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
                                    confirmationChoice: this.state.confirmationChoice }}
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
                                    <h5 className="Phone-description-label">Bienvenido(a) al Club Autoplanet. Usted podrá acceder a promociones y descuentos presentando su RUT en las cajas de nuestras sucursales.</h5>
                                </Row>
                                <Row>
                                    <Col><Button className="Submit-button" type="submit" disabled={isSubmitting} color="danger">
                                        Finalizar
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