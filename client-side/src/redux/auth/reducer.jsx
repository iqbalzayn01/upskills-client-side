import { createReducer } from '@reduxjs/toolkit';
import { setToken, clearToken, setOneUser } from './actions';

const initialAuthState = localStorage.getItem('auth')
  ? JSON.parse(localStorage.getItem('auth'))
  : { token: null, refreshToken: null, _id: null, role: null };

const initialState = {
  user: {},
  ...initialAuthState,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setToken, (state, action) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.refreshToken = action.payload._id;
      state.role = action.payload.role;
      localStorage.setItem(
        'auth',
        JSON.stringify({
          token: action.payload.token,
          refreshToken: action.payload.refreshToken,
          _id: action.payload._id,
          role: action.payload.role,
        })
      );
    })
    .addCase(clearToken, (state) => {
      state.token = null;
      state.refreshToken = null;
      state._id = null;
      state.role = null;
      localStorage.removeItem('auth');
    })
    .addCase(setOneUser, (state, action) => {
      state.user = action.payload;
    });
});

export default authReducer;
