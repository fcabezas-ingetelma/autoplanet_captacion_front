import React from 'react';
import { withRouter } from 'react-router-dom';
import publicIp from 'public-ip';
import { Form, Row, Col, Container, InputGroup, Button, Table } from 'react-bootstrap'
import { Formik } from 'formik';

import { connect } from "react-redux";
import setTracker from '../../actions/setTracker';
import getShortUrl from '../../actions/getShortUrl';

import dataStore from '../../store';

class GestionEnrolamiento extends React.Component {
    constructor(props) {
        super(props);
        if(dataStore.getState()) {
            console.log(props);
        } else {
            this.props.history.push("/");
        }
    }

    getData(token){
        
    }

    render() {
        console.log('wena man');
        return (
            <div>
                <br />
                <Container>
                    <Row>
                        <Col align='left'>
                            <h2>
                                Gestion Enrolamiento
                            </h2>
                            <Button>Actualizar</Button>
                        </Col>
                        <Col align='right'>
                            <Button variant='danger' >Cerrar Session</Button>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                    <Col>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Canal</th>
                                <th>Cantidad Visitas</th>
                                <th>Cantidad Enrolamientos</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Vendedor</td>
                                <td> </td>
                                <td> </td>
                            </tr>
                            <tr>
                                <td>Premio Ilusión</td>
                                <td> </td>
                                <td> </td>
                            </tr>
                            <tr>
                                <td>Oferta Cliente</td>
                                <td> </td>
                                <td> </td>
                            </tr>
                        </tbody>
                    </Table>
                    </Col>
                    <Col>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Canal</th>
                                <th>Cantidad Visitas</th>
                                <th>Cantidad Enrolamientos</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td> </td>
                                <td> </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td> </td>
                                <td> </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td> </td>
                                <td> </td>
                            </tr>
                        </tbody>
                    </Table>
                    </Col>
                    </Row>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GestionEnrolamiento));