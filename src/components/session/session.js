import React from 'react';
import {Button, Container, Row, Col} from 'react-bootstrap'
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import deleteSession from '../../actions/deleteSession';

import './session.css';

class SessionHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    handleDeleteSession() {
        var path = '/';
        if(this.props.attenderRut) {
            path = path + '?r=' + this.props.attenderRut;
            if(this.props.canal) {
                path = path + '&c=' + this.props.canal;
            }
        } else if(this.props.canal) {
            path = path + '?c=' + this.props.canal;
        }
        this.props.deleteSession();
        this.props.history.push(path);
    }

    render() {
        return (
            <Container >
                <Row>
                    <Col className="my-auto" >
                    <div align='left' >
                        <label id="attendedText" >{(this.props.attenderRut !== '' && this.props.attenderRut !== undefined) ? 'Ejecutivo Comercial: ' + this.props.attenderRut : ''}</label>
                    </div>
                    </Col>
                    {this.props.rut && 
                        <Col className="my-auto" >
                            <div align='right' >
                                <label id="userText" >{(this.props.rut !== '' && this.props.rut !== undefined) ? 'Cliente: ' + this.props.rut : ''  }</label>
                                <Button variant='danger' onClick={this.handleDeleteSession.bind(this)}>Salir</Button>
                            </div>
                        </Col>
                    }
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    ...state
});
  
const mapDispatchToProps = dispatch => ({
    deleteSession: () => dispatch(deleteSession())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionHeader));