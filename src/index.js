import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux';
import dataStore from './store';

import './index.css';

import App from './screens/input_data/App';
import Sms from './screens/sms_send/Sms';
import Confirmation from './screens/confirmation/Confirmation';
import Change_Phone from './screens/change_phone/Change_Phone'
import Envio_Whatsapp from './screens/envio_whatsapp/Envio_Whatsapp'
import Gestion_Enrolamiento from './screens/gestion_enrolamiento/Gestion_Enrolamiento'

import Login from './screens/login/Login'

import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

const routing = (
    <Provider store={dataStore}>
        <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/sms" component={Sms} />
                <Route path="/confirmation" component={Confirmation} />
                <Route path="/change_phone" component={Change_Phone} />
                <Route path="/envioWhatsapp" component={Envio_Whatsapp} />
                <Route path="/login" component={Login} />
                <Route path="/gestion_enrolamiento" component={Gestion_Enrolamiento} />
            </Switch>
        </Router>
    </Provider>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
