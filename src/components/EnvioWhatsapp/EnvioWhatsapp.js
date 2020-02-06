import React from 'react';
import { withRouter } from 'react-router-dom';
import publicIp from 'public-ip';
import {Form, Row, Col, Container, InputGroup, Button} from 'react-bootstrap'
import {Formik} from 'formik';

import { getUrlParam } from '../../utils/utils';

import { connect } from "react-redux";
import setTracker from '../../actions/setTracker';
import getShortUrl from '../../actions/getShortUrl';
import sendSMS from '../../actions/sendSMS';

import SessionHeader from '../session/session';

class EnvioWhatsapp extends React.Component {
    url =  '';
    constructor(props) {
        super(props);
        this.state = {
            attenderRut: getUrlParam(window.location.href, 'r', ''), 
            canal: getUrlParam(window.location.href, 'c', ''), 
            canalPromotor: getUrlParam(window.location.href, 'cp', ''), 
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
                        isSMSButton: false
                    }}
                    onSubmit = {(values, {setSubmitting}) => {
                        if(!values.cellphone || values.cellphone.length < 8){
                            alert('Ingrese un número de teléfono válido');
                            setSubmitting(false);
                        } else {
                            this.props.getShortUrl(
                                {
                                    url: window.location.origin,
                                    attenderRut: this.state.attenderRut, 
                                    canal: this.state.canal, 
                                    canalPromotor: this.state.canalPromotor, 
                                    cellphone: values.cellphone
                                }, 
                                (shortUrl) => {
                                    setSubmitting(false);
                                    if(values.isSMSButton) {
                                        values.link = shortUrl;
                                        this.props.sendSMS(values, 
                                            () => {
                                                alert('El mensaje de texto se ha enviado correctamente.');
                                            }, 
                                            () => {
                                                alert('Hubo un error al enviar el mensaje de texto. Por favor, intente nuevamente.');
                                            });
                                    } else {
                                        window.location.href = `https://api.whatsapp.com/send?phone=569${values.cellphone}&text=${encodeURIComponent(shortUrl)}`; 
                                    }
                                }, 
                                () => {
                                    setSubmitting(false);
                                    alert('Hubo un error al procesar la solicitud, intente nuevamente');
                                }
                            );
                        }
                    }}
                >
                {({ isSubmitting, handleSubmit, values, handleChange, setFieldValue }) => (
                    <Container>
                        <br sm={2}/>
                        <h2>Ingrese Teléfono Celular del Cliente:</h2>
                    <Form onSubmit={handleSubmit} >
                        <Form.Group as={Row} controlID='cellphone'>
                            <Col align='left'>
                                <br/>
                                <Form.Label>
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
                            <Button block 
                                    onClick={(e)=>{
                                        setFieldValue('isSMSButton', false)
                                        handleSubmit(e);
                                    }} 
                                    disabled={isSubmitting} variant="success">
                                    Enviar Link por WhatsApp
                            </Button>
                            <br/>
                            <Button block id="second-button"
                                    onClick={(e)=>{
                                        setFieldValue('isSMSButton', true)
                                        handleSubmit(e);
                                    }} 
                                    disabled={isSubmitting} 
                                    style={{backgroundColor:'#E36924', borderColor:'#E36924'}}>
                                    Enviar Link por SMS (Mensaje de Texto)
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
    getShortUrl: (payload, onSuccess, onFailure) => dispatch(getShortUrl(payload, onSuccess, onFailure)), 
    sendSMS: (payload, onSuccess, onFailure) => dispatch(sendSMS(payload, onSuccess, onFailure))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EnvioWhatsapp));