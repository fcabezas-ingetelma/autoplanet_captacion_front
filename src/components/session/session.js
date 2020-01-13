import React from 'react';
import {Button, Container} from 'react-bootstrap'
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import deleteSession from '../../actions/deleteSession';

import './session.css';

class SessionHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    handleDeleteSession() {
        this.props.deleteSession();
        this.props.history.push("/");
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
                                <Button variant='danger'>Salir</Button>
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