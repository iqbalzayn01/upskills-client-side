import { combineReducers } from '@reduxjs/toolkit';
// import { loadingBarReducer } from 'react-redux-loading-bar';
import authReducer from '../auth/reducer';
import schedulesReducer from '../schedules/reducer';
import usersReducer from '../users/reducer';
import uploadDocumentsReducer from '../uploadDocument/reducer';
// ADMIN
import eventsReducer from '../events/reducer';
import talentsReducer from '../talents/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  schedules: schedulesReducer,
  users: usersReducer,
  uploadDocuments: uploadDocumentsReducer,
  events: eventsReducer,
  talents: talentsReducer,
  // loadingBar: loadingBarReducer,
});

export default rootReducer;
