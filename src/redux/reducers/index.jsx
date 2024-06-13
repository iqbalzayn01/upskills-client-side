import { combineReducers } from '@reduxjs/toolkit';
// import { loadingBarReducer } from 'react-redux-loading-bar';
import authReducer from '../auth/reducer';
import schedulesReducer from '../schedules/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  schedules: schedulesReducer,
});

export default rootReducer;
