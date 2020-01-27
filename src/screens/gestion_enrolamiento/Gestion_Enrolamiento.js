import React from 'react';
import APHeader from '../../components/header/Header';
import GestionEnrolamiento from '../../components/GestionEnrolamiento/GestionEnrolamiento.js';

class Gestion_Enrolamiento extends React.Component {
  render() {
    return (
        <div>
            <APHeader />
            <GestionEnrolamiento />
        </div>
    );
  }
}
  
export default Gestion_Enrolamiento;