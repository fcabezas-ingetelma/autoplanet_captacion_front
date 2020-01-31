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
                            <h5>Resultado por día</h5>
                        </Col>
                    </Row>
                    <Row>
                    <Col>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Día</th>
                                <th>Visita Vendedor</th>
                                <th>Visita IPAD</th>
                                <th>Visita Limpia Tapiz</th>
                                <th>Enrolado Vendedor</th>
                                <th>Enrolado IPAD</th>
                                <th>Enrolado Limpia Tapiz</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(this.state && this.state.data && this.state.data.dailyStatus) ?
                                this.state.data.dailyStatus.map(obj => (
                                    <tr key={`${obj.dia}`}>
                                        <td>{`${obj.dia}` != 'null' ? `${obj.dia}` : ''}</td>
                                        <td>{`${obj.Visita_Vendedor}` != 'null' ? `${obj.Visita_Vendedor}` : 0}</td>
                                        <td>{`${obj.Visita_Ipad}` != 'null' ? `${obj.Visita_Ipad}` : 0}</td>
                                        <td>{`${obj.Visita_Limpia_Tapiz}` != 'null' ? `${obj.Visita_Limpia_Tapiz}` : 0}</td>
                                        <td>{`${obj.Enrolado_Vendedor}` != 'null' ? `${obj.Enrolado_Vendedor}` : 0}</td>
                                        <td>{`${obj.Enrolado_Ipad}` != 'null' ? `${obj.Enrolado_Ipad}` : 0}</td>
                                        <td>{`${obj.Enrolado_Limpia_Tapiz}` != 'null' ? `${obj.Enrolado_Limpia_Tapiz}` : 0}</td>
                                    </tr>
                                )) 
                                :
                                (<tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>)
                            }
                        </tbody>
                    </Table>
                    </Col>
                    <Col>
                    <Row>
                        <Col>
                            <h5>Resultado por hora (Día Actual)</h5>
                        </Col>
                    </Row>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Hora</th>
                                <th>Visita Vendedor</th>
                                <th>Visita IPAD</th>
                                <th>Visita Limpia Tapiz</th>
                                <th>Enrolado Vendedor</th>
                                <th>Enrolado IPAD</th>
                                <th>Enrolado Limpia Tapiz</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(this.state && this.state.data && this.state.data.hourlyStatus) ?
                                this.state.data.hourlyStatus.map(obj => (
                                    <tr key={`${obj.Hora}`}>
                                        <td>{`${obj.Hora}` != 'null' ? `${obj.Hora}` : ''}</td>
                                        <td>{`${obj.Visita_Vendedor}` != 'null' ? `${obj.Visita_Vendedor}` : 0}</td>
                                        <td>{`${obj.Visita_Ipad}` != 'null' ? `${obj.Visita_Ipad}` : 0}</td>
                                        <td>{`${obj.Visita_Limpia_Tapiz}` != 'null' ? `${obj.Visita_Limpia_Tapiz}` : 0}</td>
                                        <td>{`${obj.Enrolado_Vendedor}` != 'null' ? `${obj.Enrolado_Vendedor}` : 0}</td>
                                        <td>{`${obj.Enrolado_Ipad}` != 'null' ? `${obj.Enrolado_Ipad}` : 0}</td>
                                        <td>{`${obj.Enrolado_Limpia_Tapiz}` != 'null' ? `${obj.Enrolado_Limpia_Tapiz}` : 0}</td>
                                    </tr>
                                )) 
                                :
                                (<tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
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