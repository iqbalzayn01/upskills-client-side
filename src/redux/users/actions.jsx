import { createAction } from '@reduxjs/toolkit';
import {
  signup,
  getAllUsers,
  updateUsers,
  deleteUser,
} from '../../utils/fetch';

export const setUsers = createAction('users/setUsers');
export const setOneUser = createAction('users/setOneUser');
export const createUser = createAction('users/createUser');
export const updateUser = createAction('users/updateUser');
export const removeUser = createAction('users/removeUser');

export const signUp = (userData) => async (dispatch) => {
  try {
    const res = await signup(userData);
    const dataCreateUser = res.data;
    dispatch(createUser(dataCreateUser));
  } catch (error) {
    console.error('Sign Up Error:', error);
  }
};

// ADMIN
export const fetchCreateUser = (userData) => async (dispatch) => {
  try {
    const res = await signup(userData);
    const dataCreateUser = res.data;
    dispatch(createUser(dataCreateUser));
  } catch (error) {
    console.error('Create User Error:', error);
  }
};

export const fetchAllUsers = () => async (dispatch) => {
  try {
    const res = await getAllUsers();
    const dataUsers = res.data;
    dispatch(setUsers(dataUsers));
  } catch (error) {
    console.error('Get All User Error:', error);
  }
};

export const fetchUpdateUser = (id, userData) => async (dispatch) => {
  try {
    const res = await updateUsers(id, userData);
    const dataUpdateUser = res.data;
    dispatch(updateUser(dataUpdateUser));
  } catch (error) {
    console.error('Update User Error:', error);
  }
};

export const fetchDeleteUser = (id) => async (dispatch) => {
  try {
    await deleteUser(id);
    dispatch(removeUser(id));
  } catch (error) {
    console.error('Delete User Error:', error);
  }
};
