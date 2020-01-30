import React from 'react';
import APHeader from '../../components/header/Header';
import LoginGestion from '../../components/LoginGestion/LoginGestion';

class Login extends React.Component {
  render() {
    return (
        <div>
            <APHeader />
            <LoginGestion />
        </div>
    );
  }
}
  
export default Login;