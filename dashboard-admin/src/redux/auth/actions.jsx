import { createAction } from '@reduxjs/toolkit';
import { getUserLogged } from '../../utils/fetch';

export const setToken = createAction('auth/setToken');
export const clearToken = createAction('auth/clearToken');
export const setOneUser = createAction('auth/setOneUser');

export const fetchUser = () => async (dispatch) => {
  try {
    const res = await getUserLogged();
    const dataUser = res.data;
    dispatch(setOneUser(dataUser));
  } catch (error) {
    console.error('Get One User Error:', error);
  }
};
