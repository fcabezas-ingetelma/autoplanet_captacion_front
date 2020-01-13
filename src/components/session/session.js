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
            <Container align='right' >
                <label id="attendedText">{(this.props.attenderRut !== '' && this.props.attenderRut !== undefined) ? 'Ejecutivo Comercial: ' + this.props.attenderRut : ''}</label>
                {this.props.rut && 
                    <div >
                        <label id="userText">{(this.props.rut !== '' && this.props.rut !== undefined) ? 'Cliente: ' + this.props.rut : ''  } 
                        <Button variant='danger' onClick={this.handleDeleteSession.bind(this)}>Salir</Button></label>
                    </div>
                }
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