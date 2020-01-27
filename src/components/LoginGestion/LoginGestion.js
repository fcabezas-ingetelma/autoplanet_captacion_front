import React from 'react';
import { withRouter } from 'react-router-dom';
import publicIp from 'public-ip';
import { Form, Row, Col, Container, InputGroup, Button } from 'react-bootstrap'
import { Formik } from 'formik';

import { connect } from "react-redux";
import setTracker from '../../actions/setTracker';
import getShortUrl from '../../actions/getShortUrl';

class Login extends React.Component {
    render() {
        return (
            <div>
                <br/>
                <Container>
                    <h2 sm={2}>
                        Detalle de Enrolamiento de Clientes
                    </h2>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Ingrese Usuario</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese usuario" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Contraseña" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                    </Button>
                    </Form>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    setTracker: (payload, onSuccess, onFailure) => dispatch(setTracker(payload, onSuccess, onFailure)),
    getShortUrl: (payload, onSuccess, onFailure) => dispatch(getShortUrl(payload, onSuccess, onFailure))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));