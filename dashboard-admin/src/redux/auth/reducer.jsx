import { createReducer } from '@reduxjs/toolkit';
import { setToken, clearToken, setOneUser } from './actions';

const initialState = {
  users: [],
  user: {},
  token: localStorage.getItem('token') || '',
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setToken, (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    })
    .addCase(clearToken, (state) => {
      state.token = '';
      localStorage.removeItem('token');
    })
    .addCase(setOneUser, (state, action) => {
      state.user = action.payload;
    });
});

export default authReducer;
