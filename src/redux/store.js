  
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { loadingBarMiddleware } from 'react-redux-loading-bar'

import rootReducer from './root-reducer';

const middlewares = [thunkMiddleware, logger, loadingBarMiddleware()];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));