import { combineReducers } from '@reduxjs/toolkit';
// import { loadingBarReducer } from 'react-redux-loading-bar';
import authReducer from '../auth/reducer';
import schedulesReducer from '../schedules/reducer';
import usersReducer from '../users/reducer';
import uploadDocumentsReducer from '../uploadDocument/reducer';
import registrationReducer from '../registration/reducer';
import paymentReducer from '../payments/reducer';
// ADMIN
import eventsReducer from '../events/reducer';
import talentsReducer from '../talents/reducer';
import uploadImagesReducer from '../uploadImages/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  schedules: schedulesReducer,
  users: usersReducer,
  uploadDocuments: uploadDocumentsReducer,
  registration: registrationReducer,
  events: eventsReducer,
  images: uploadImagesReducer,
  talents: talentsReducer,
  payments: paymentReducer,
  // loadingBar: loadingBarReducer,
});

export default rootReducer;
