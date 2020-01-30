import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Container, Button, Table } from 'react-bootstrap'

import { connect } from "react-redux";
import getEnrolls from '../../actions/getEnrolls';
import deleteSession from '../../actions/deleteSession';

import dataStore from '../../store';

class GestionEnrolamiento extends React.Component {
    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
        this.closeSession = this.closeSession.bind(this);
        if(!dataStore.getState()) {
            this.props.history.push("/login");
        } else {
            this.state = {
                user: dataStore.getState().userData.user, 
                token: dataStore.getState().userData.token, 
                data: undefined
            }
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        if(this.state && this.state.token && this.state.user) {
            this.props.getEnrolls(this.state, 
                (data) => {
                    this.setState({ data: data });
                }, 
                () => {
                    alert('Hubo un problema al intentar obtener los datos. Por favor, intente nuevamente.');
                });
        }
    }

    closeSession() {
        this.props.deleteSession();
        this.props.history.push("/login");
    }

    render() {
        return (
            <div>
                <br />
                <Container>
                    <Row>
                        <Col align='left'>
                            <h2>
                                Gestion Enrolamiento
                            </h2>
                            <Button onClick={this.fetchData.bind(this)}>Actualizar</Button>
                        </Col>
                        <Col align='right'>
                            <Button variant='danger' onClick={this.closeSession.bind(this)}>Cerrar Sesión</Button>
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
                                <td>{this.state && this.state.data ? this.state.data.visitCounter : ''}</td>
                                <td>{this.state && this.state.data ? this.state.data.enrollmentCounter : ''}</td>
                            </tr>
                            <tr>
                                <td>Premio Ilusión</td>
                                <td>{this.state && this.state.data ? this.state.data.illussionsGiftVisitCounter : ''}</td>
                                <td>{this.state && this.state.data ? this.state.data.illussionsGiftEnrollmentCounter : ''}</td>
                            </tr>
                            <tr>
                                <td>Oferta Cliente</td>
                                <td>{this.state && this.state.data ? this.state.data.clientOfferVisitCounter : ''}</td>
                                <td>{this.state && this.state.data ? this.state.data.clientOfferEnrollmentCounter : ''}</td>
                            </tr>
                        </tbody>
                    </Table>
                    </Col>
                    <Col>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Rut Captador</th>
                                <th>Cantidad Visitas</th>
                                <th>Cantidad Enrolamientos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(this.state && this.state.data && this.state.data.sellerDetail) ?
                                this.state.data.sellerDetail.map(obj => (
                                    <tr key={`${obj.rut_captador}`}>
                                        <td>{`${obj.rut_captador}`}</td>
                                        <td>{`${obj.Visits}` != 'null' ? `${obj.Visits}` : 0}</td>
                                        <td>{`${obj.Enrollment}` != 'null' ? `${obj.Enrollment}` : 0}</td>
                                    </tr>
                                )) 
                                :
                                (<tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>)
                            }
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
    getEnrolls: (payload, onSuccess, onFailure) => dispatch(getEnrolls(payload, onSuccess, onFailure)), 
    deleteSession: () => dispatch(deleteSession())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GestionEnrolamiento));