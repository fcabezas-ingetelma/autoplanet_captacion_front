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
        if (!dataStore.getState()) {
            this.props.history.push("/login");
        } else {
            this.state = {
                user: dataStore.getState().userData.user,
                token: dataStore.getState().userData.token,
                adminType: dataStore.getState().userData.adminType, 
                data: undefined
            }
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        if (this.state && this.state.token && this.state.user) {
            this.props.getEnrolls(this.state,
                (data) => {
                    this.setState({ data: data });
                },
                () => {
                    alert('Hubo un problema al intentar obtener los datos. Por favor, intente nuevamente.');
                });
        }
        this.paintTime();
    }

    closeSession() {
        this.props.deleteSession();
        this.props.history.push("/login");
    }

    paintTime(){
        var d = new Date();
        var elem = document.getElementById('tiempo');
        if(typeof elem !== 'undefined' && elem !== null) {
            const date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
            const month = d.getMonth()+1 < 10 ? '0' + (d.getMonth()+1) : d.getMonth()+1;
            const hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
            const minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
            const seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
            elem.innerHTML = 'Actualizado al ' + date + '/'+ month +'/'+d.getFullYear()+' '+ hours +':'+ minutes +':'+ seconds;
        }
    }
    

    render() {
        return (
            <div>
                <br />
                <Container>
                    <Row>
                        <Col align='left'>
                            <h2>
                                Gestión Enrolamiento
                            </h2>
                            <Button onClick={this.fetchData.bind(this)}>Actualizar</Button>
                            <br/>
                            <small id='tiempo'></small>
                        </Col>
                        <Col align='right'>
                            <Button variant='danger' onClick={this.closeSession.bind(this)}>Cerrar Sesión</Button>
                        </Col>
                    </Row>
                    <br />
                    <br />
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
                                        <th colSpan='4' className='text-center text-white' style={{backgroundColor:'#E36924'}}>Nº de Visitas por IP Única</th>
                                    </tr>
                                    <tr>
                                        <th>Día</th>
                                        <th>QR Vendedor</th>
                                        <th>QR IPAD</th>
                                        <th>QR Limpia Tapiz</th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th><small>Tienda V. Mackenna</small></th>
                                        <th><small>Tienda Maipú</small></th>
                                        <th><small>Tienda Quilicura</small></th>
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
                                            </tr>
                                        ))
                                        :
                                        (<tr>
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
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th colSpan='4' className='text-center text-white' style={{backgroundColor:'#B60B14'}}>Nº de Enrolamientos</th>
                                    </tr>
                                    <tr>
                                        <th>Día</th>
                                        <th>QR Vendedor</th>
                                        <th>QR IPAD</th>
                                        <th>QR Limpia Tapiz</th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th><small>Tienda V. Mackenna</small></th>
                                        <th><small>Tienda Maipú</small></th>
                                        <th><small>Tienda Quilicura</small></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(this.state && this.state.data && this.state.data.dailyStatus) ?
                                        this.state.data.dailyStatus.map(obj => (
                                            <tr key={`${obj.dia}`}>
                                                <td>{`${obj.dia}` != 'null' ? `${obj.dia}` : ''}</td>
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
                                        </tr>)
                                    }
                                </tbody>
                            </Table>
                        </Col>
                        </Row>
                        <Row>
                        <Col>
                        <br/>
                        <br/>
                            <Row>
                                <Col>
                                    <h5>Resultado por hora (Día Actual)</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th colSpan='4' className='text-center text-white' style={{backgroundColor:'#E36924'}}>Nº de Visitas por IP Única</th>
                                    </tr>
                                    <tr>
                                        <th>Hora</th>
                                        <th>QR Vendedor</th>
                                        <th>QR IPAD</th>
                                        <th>QR Limpia Tapiz</th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th><small>Tienda V. Mackenna</small></th>
                                        <th><small>Tienda Maipú</small></th>
                                        <th><small>Tienda Quilicura</small></th>
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
                                            </tr>
                                        ))
                                        :
                                        (<tr>
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
                                <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th colSpan='4' className='text-center text-white' style={{backgroundColor:'#B60B14'}}>Nº de Enrolamientos</th>
                                    </tr>
                                    <tr>
                                        <th>Hora</th>
                                        <th>QR Vendedor</th>
                                        <th>QR IPAD</th>
                                        <th>QR Limpia Tapiz</th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th><small>Tienda V. Mackenna</small></th>
                                        <th><small>Tienda Maipú</small></th>
                                        <th><small>Tienda Quilicura</small></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(this.state && this.state.data && this.state.data.hourlyStatus) ?
                                        this.state.data.hourlyStatus.map(obj => (
                                            <tr key={`${obj.Hora}`}>
                                                <td>{`${obj.Hora}` != 'null' ? `${obj.Hora}` : ''}</td>
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
                                        </tr>)
                                    }
                                </tbody>
                            </Table>
                                </Col>
                            </Row>
                            
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