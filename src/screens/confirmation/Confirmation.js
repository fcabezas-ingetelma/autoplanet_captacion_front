import React from 'react';
import APHeader from '../../components/header/Header';
import ConfirmationSuccess from '../../components/confirmation/confirmationSuccess';

class Confirmation extends React.Component {
  render() {
    return (
        <div className="Confirmation">
            <APHeader />
            <ConfirmationSuccess />
        </div>
    );
  }
}
  
export default Confirmation;