import { combineReducers } from 'redux';
import userReducer from './userSlice';
import postReducer from './postSlice';

const rootReducer = combineReducers({
  userReducer,
  postReducer,
});

export default rootReducer;
