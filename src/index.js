import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux';
import dataStore from './store';

import './index.css';

import App from './screens/input_data/App';
import Sms from './screens/sms_send/Sms';
import Confirmation from './screens/confirmation/Confirmation';

import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

const routing = (
    <Provider store={dataStore}>
        <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/sms" component={Sms} />
                <Route path="/confirmation" component={Confirmation} />
            </Switch>
        </Router>
    </Provider>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
