import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { userReducer } from './User/userReducer';
import {tokenReducer} from './User/tokenReducer';
import type {AppState} from './AppState';
import {profesoriReducer} from './Profesor/profesorReducer';
import {searchPostReducer} from './Post/searchPostReducer';
import {postReducer} from './Post/postReducer';

const rootReducer = combineReducers({
  user: userReducer,
  token: tokenReducer,
  profesori: profesoriReducer,
  searchedPosts: searchPostReducer,
  post: postReducer,

});

export const initializeStore = (initialState?: AppState) =>
  createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk)),
  );

