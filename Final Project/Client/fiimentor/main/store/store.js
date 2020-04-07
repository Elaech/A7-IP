import {
  applyMiddleware,
  combineReducers,
  createStore,
  Reducer,
  Store
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { AppState } from './AppState';
import { userReducer } from './User/userReducer';

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  user: userReducer,

});

export const initializeStore = (initialState?: AppState): Store<AppState> =>
  createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk)),
  );

