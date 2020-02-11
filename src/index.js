import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux';
import dataStore from './store';

import * as Sentry from '@sentry/browser';

import './index.css';

import App from './screens/input_data/App';
import Sms from './screens/sms_send/Sms';
import Confirmation from './screens/confirmation/Confirmation';
import Change_Phone from './screens/change_phone/Change_Phone'
import Envio_Whatsapp from './screens/envio_whatsapp/Envio_Whatsapp'
import Gestion_Enrolamiento from './screens/gestion_enrolamiento/Gestion_Enrolamiento'
import Gestion_Enrolamiento_La_Florida from './screens/gestion_enrolamiento/Gestion_Enrolamiento_La_Florida';
import Gestion_Enrolamiento_Maipu from './screens/gestion_enrolamiento/Gestion_Enrolamiento_Maipu';
import Gestion_Enrolamiento_Quilicura from './screens/gestion_enrolamiento/Gestion_Enrolamiento_Quilicura';
import Terminos from './screens/terms/Terms';

import Login from './screens/login/Login'

import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

Sentry.init({dsn: "https://e5b194b4756745eab31a6087a40a8e0a@sentry.io/2439769"});

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
                <Route path="/gestion_enrolamiento_la_florida" component={Gestion_Enrolamiento_La_Florida} />
                <Route path="/gestion_enrolamiento_maipu" component={Gestion_Enrolamiento_Maipu} />
                <Route path="/gestion_enrolamiento_quilicura" component={Gestion_Enrolamiento_Quilicura} />
                <Route path="/terms" component={Terminos} />
            </Switch>
        </Router>
    </Provider>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
