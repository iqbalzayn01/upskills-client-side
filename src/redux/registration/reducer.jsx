import { createReducer } from '@reduxjs/toolkit';
import {
  setRegistration,
  setOneRegistration,
  createRegistration,
  removeRegister,
} from './actions';

const initialState = {
  registrations: [],
  register: null,
};

const registrationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setRegistration, (state, action) => {
      state.registrations = action.payload;
    })
    .addCase(setOneRegistration, (state, action) => {
      state.register = action.payload;
    })
    .addCase(createRegistration, (state, action) => {
      state.registrations.push(action.payload);
    })
    .addCase(removeRegister, (state, action) => {
      state.registrations = state.registrations.filter(
        (register) => register._id !== action.payload
      );
    });
});

export default registrationReducer;
