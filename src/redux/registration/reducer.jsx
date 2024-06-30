import { createReducer } from '@reduxjs/toolkit';
import { setRegistrationStatus } from './actions';

const initialState = {
  status: 'not_registered',
};

const registrationReducer = createReducer(initialState, (builder) => {
  builder.addCase(setRegistrationStatus, (state, action) => {
    state.status = action.payload;
  });
});

export default registrationReducer;
