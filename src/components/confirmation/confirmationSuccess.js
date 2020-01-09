import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Container, Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import dataStore from '../../store';
import './confirmationSuccess.css';

import { connect } from "react-redux";
import confirmOptions from '../../actions/confirmOptions';

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

    render() {
        if(dataStore.getState()) {
            return(
                <div className="InputForm">
                    <SessionHeader attenderRut={this.state.attenderRut} rut={this.state.rut} />
                    <Formik
                        initialValues = {{ rut: this.state.rut, 
                                        cellphone: this.state.cellphone, 
                                        ip: this.state.ip, 
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