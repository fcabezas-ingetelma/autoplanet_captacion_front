import React from 'react';
import APHeader from '../../components/header/Header';
import GestionEnrolamientoLaFlorida from '../../components/GestionEnrolamiento/GestionEnrolamientoLaFlorida';

class Gestion_Enrolamiento_La_Florida extends React.Component {
  render() {
    return (
        <div>
            <APHeader />
            <GestionEnrolamientoLaFlorida />
        </div>
    );
  }
}
  
export default Gestion_Enrolamiento_La_Florida;