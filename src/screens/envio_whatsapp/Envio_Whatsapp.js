import React from 'react';
import APHeader from '../../components/header/Header';
import EnvioWhatsapp from '../../components/EnvioWhatsapp/EnvioWhatsapp';

class Envio_Whatsapp extends React.Component {
  render() {
    return (
        <div>
            <APHeader />
            <EnvioWhatsapp />
        </div>
    );
  }
}
  
export default Envio_Whatsapp;