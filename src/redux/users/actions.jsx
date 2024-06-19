import { createAction } from '@reduxjs/toolkit';
import { signup } from '../../utils/fetch';

export const createUser = createAction('users/createUser');

export const signUp = (userData) => async (dispatch) => {
  try {
    const res = await signup(userData);
    const dataCreateUser = res.data;
    dispatch(createUser(dataCreateUser));
  } catch (error) {
    console.error('Sign Up Error:', error);
  }
};
