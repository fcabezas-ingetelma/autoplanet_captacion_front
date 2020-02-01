import React from 'react';
import { withRouter } from 'react-router-dom';
import publicIp from 'public-ip';
import { Form, Row, Col, Container, InputGroup, Button } from 'react-bootstrap'
import { Formik } from 'formik';

import { connect } from "react-redux";
import validateUser from '../../actions/validateUser';
import { rutChecker, validaRut } from '../../utils/utils';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <br />
                <Container>
                    <h2 sm={2}>
                        Piloto Enrolamiento de Clientes
                    </h2>
                    <Formik
                        initialValues={{
                            user: '', 
                            password: ''
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setSubmitting(false);
                            if (!values.user) {
                                alert('Ingrese un rut');
                                setSubmitting(false);
                            } else if(!validaRut(values.user)) {
                                alert('Ingrese un rut válido');
                                setSubmitting(false);
                            } else if (!values.password) {
                                alert('Ingrese contraseña');
                                setSubmitting(false);
                            } else {
                                this.props.validateUser(values, 
                                (token) => {
                                    values.password = undefined;
                                    values.token = token;
                                    this.props.history.push('/gestion_enrolamiento');
                                }, () => {
                                    alert('Usuario o contraseña incorrecta');
                                    window.location.reload();
                                });
                                
                            }
                        }}
                    >
                        {({ isSubmitting, handleSubmit, values, handleChange }) => (
                            <Container>
                                <br sm={2} />
                                <Form onSubmit={handleSubmit} >
                                    <Form.Group controlId="user">
                                        <Form.Label>Ingrese Rut</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Ingrese Rut"
                                            name='user'
                                            value={values.user}
                                            onChange={handleChange}
                                            onInput={rutChecker}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="password">
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control
                                            required
                                            type="password"
                                            placeholder="Contraseña"
                                            name='password'
                                            value={values.password}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Button block variant="primary" type="submit" disabled={isSubmitting}>
                                        Ingresar
                                    </Button>
                                </Form>
                            </Container>

                        )}
                    </Formik>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    validateUser: (payload, onSuccess, onFailure) => dispatch(validateUser(payload, onSuccess, onFailure))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));