import React from 'react';
import APHeader from '../../components/header/Header';
import GestionEnrolamientoMaipu from '../../components/GestionEnrolamiento/GestionEnrolamientoMaipu';

class Gestion_Enrolamiento_Maipu extends React.Component {
  render() {
    return (
        <div>
            <APHeader />
            <GestionEnrolamientoMaipu />
        </div>
    );
  }
}
  
export default Gestion_Enrolamiento_Maipu;