import React from 'react';
import APHeader from '../../components/header/Header';
import GestionEnrolamientoQuilicura from '../../components/GestionEnrolamiento/GestionEnrolamientoQuilicura';

class Gestion_Enrolamiento_Quilicura extends React.Component {
  render() {
    return (
        <div>
            <APHeader />
            <GestionEnrolamientoQuilicura />
        </div>
    );
  }
}
  
export default Gestion_Enrolamiento_Quilicura;