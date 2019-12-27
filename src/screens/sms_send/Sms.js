import React from 'react';
import APHeader from '../../components/header/Header';
import PhoneValidation from '../../components/phone_validation/phoneValidation';

class Sms extends React.Component {
  render() {
    return (
        <div className="Sms">
            <APHeader />
            <PhoneValidation />
        </div>
    );
  }
}
export default Sms;