import { combineReducers } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authReducer from '../auth/reducer';
import usersReducer from '../users/reducer';
import talentsReducer from '../talents/reducer';
import schedulesReducer from '../schedules/reducer';
import eventsReducer from '../events/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  talents: talentsReducer,
  schedules: schedulesReducer,
  events: eventsReducer,
  loadingBar: loadingBarReducer,
});

export default rootReducer;
