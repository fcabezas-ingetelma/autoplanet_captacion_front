import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import userDataReducer from './reducers/userDataReducer';

let dataStore = createStore(userDataReducer, applyMiddleware(logger));

export default dataStore;