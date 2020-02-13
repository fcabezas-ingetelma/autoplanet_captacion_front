import React from 'react';
import APHeader from '../../components/header/Header';
import ValidacionWhatsapp from '../../components/EnvioWhatsapp/ValidacionWhatsapp';

class ValidacionWhatsappScreen extends React.Component {
  render() {
    return (
        <div>
            <APHeader />
            <ValidacionWhatsapp />
        </div>
    );
  }
}
  
export default ValidacionWhatsappScreen;