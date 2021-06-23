import { combineReducers } from 'redux';
import userReducer from './userSlice';
import postReducer from './postSlice';
// import loadingReducer from '../lib/loading';

const rootReducer = combineReducers({
  userReducer,
  postReducer,
  // loadingReducer,
});

export default rootReducer;
