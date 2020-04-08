import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { userReducer } from './User/userReducer';
import type {AppState} from './AppState';

const rootReducer = combineReducers({
  User: userReducer,

});

export const initializeStore = (initialState?: AppState) =>
  createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk)),
  );

