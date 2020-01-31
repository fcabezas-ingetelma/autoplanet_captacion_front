import React from 'react';
import APHeader from '../../components/header/Header';
import TerminosAndCond from '../../components/terminos/terminos';

class Terms extends React.Component {
  render() {
    return (
        <div className="Terms">
            <APHeader />
            <TerminosAndCond />
        </div>
    );
  }
}
  
export default Terms;