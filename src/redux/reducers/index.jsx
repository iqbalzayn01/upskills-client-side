import { combineReducers } from '@reduxjs/toolkit';
// import { loadingBarReducer } from 'react-redux-loading-bar';
import authReducer from '../auth/reducer';
import schedulesReducer from '../schedules/reducer';
import usersReducer from '../users/reducer';
import uploadDocumentsReducer from '../uploadDocument/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  schedules: schedulesReducer,
  users: usersReducer,
  uploadDocuments: uploadDocumentsReducer,
});

export default rootReducer;
