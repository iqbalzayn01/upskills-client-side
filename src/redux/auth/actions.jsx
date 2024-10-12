import { createAction } from '@reduxjs/toolkit';
import { login, getUserLogged } from '../../utils/fetch';

export const setToken = createAction('auth/setToken');
export const clearToken = createAction('auth/clearToken');
export const setOneUser = createAction('auth/setOneUser');

export const userLogged = () => async (dispatch) => {
  try {
    const res = await getUserLogged();
    const dataUser = res.data;
    dispatch(setOneUser(dataUser));
  } catch (error) {
    console.error('Get User Logged Error:', error);
  }
};

export const signIn = (formData) => async (dispatch) => {
  try {
    const res = await login(formData);
    const { token, refreshToken, _id, role } = res.data;
    dispatch(setToken({ token, refreshToken, _id, role }));
  } catch (error) {
    console.error('Login Error:', error);
  }
};
