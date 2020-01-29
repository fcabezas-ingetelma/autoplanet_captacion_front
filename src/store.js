import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import userDataReducer from './reducers/userDataReducer';

const middlewares = [];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

const dataStore = compose(applyMiddleware(...middlewares))(createStore)(userDataReducer);

export default dataStore;