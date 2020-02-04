import React from 'react';
import { withRouter } from 'react-router-dom';
import publicIp from 'public-ip';
import {Form, Row, Col, Container, InputGroup, Button} from 'react-bootstrap'
import {Formik} from 'formik';

import { getUrlParam } from '../../utils/utils';

import { connect } from "react-redux";
import setTracker from '../../actions/setTracker';
import getShortUrl from '../../actions/getShortUrl';

import SessionHeader from '../session/session';

class EnvioWhatsapp extends React.Component {
    url =  '';
    constructor(props) {
        super(props);
        this.state = {
            attenderRut: getUrlParam(window.location.href, 'r', ''), 
            userAgent: window.navigator.userAgent, 
            os: window.navigator.platform, 
            ip: '', 
            page: 'WhatsApp Page'
        };
    }

    componentDidMount() {
        (async () => {
            let ipv4 = await publicIp.v4();
            this.setState({ ip: ipv4 });
            this.props.setTracker(this.state, () => {}, () => {});
        })();
    }

    render(){
        return(
            <div>
                <SessionHeader attenderRut={this.state.attenderRut} />
                <Formik
                    initialValues = {{
                        cellphone:'',
                    }}
                    onSubmit = {(values, {setSubmitting}) => {
                        if(!values.cellphone){
                            alert('Ingrese un número de teléfono válido');
                            setSubmitting(false);
                        } else {
                            this.props.getShortUrl(
                                {
                                    url: window.location.origin,
                                    attenderRut: this.state.attenderRut, 
                                    cellphone: values.cellphone
                                }, 
                                (shortUrl) => {
                                    setSubmitting(false);
                                    window.location.href = `https://api.whatsapp.com/send?phone=569${values.cellphone}&text=${encodeURIComponent(shortUrl)}`; 
                                }, 
                                () => {
                                    setSubmitting(false);
                                    alert('Hubo un error al procesar la solicitud, intente nuevamente');
                                }
                            );
                        }
                    }}
                >
                {({ isSubmitting, handleSubmit, values, handleChange}) => (
                    <Container>
                        <br sm={2}/>
                        <h2>Ingrese Teléfono Celular del Cliente:</h2>
                    <Form onSubmit={handleSubmit} >
                        <Form.Group as={Row} controlID='cellphone'>
                            <Col align='left'>
                                <br/>
                                <Form.Label  >
                                    Teléfono Celular
                                </Form.Label>
                            </Col>
                            <Col sm={10}>
                                <InputGroup>
                                
                                    <InputGroup.Prepend id="inputGroupPrepend">
                                        <br/>
                                        <InputGroup.Text>+569</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control 
                                        required
                                        maxLength='8'
                                        aria-describedby="inputGroupPrepend"
                                        required
                                        type="tel" 
                                        name="cellphone" 
                                        value={values.cellphone}
                                        onChange={handleChange}
                                        placeholder="Ingrese los últimos 8 digitos" 
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Group>
                            <br/>
                            <Button block type="submit" disabled={isSubmitting} variant="success">
                                Enviar Link por WhatsApp
                            </Button>
                    </Form>
                    </Container>

                )}
                </Formik>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EnvioWhatsapp));