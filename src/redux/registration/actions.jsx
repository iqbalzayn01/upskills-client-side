import { createAction } from '@reduxjs/toolkit';
import { validateUser, userStatus } from '../../utils/fetch';

export const setRegistrationStatus = createAction('SET_REGISTRATION_STATUS');

export const validateUserAction = (userID) => async (dispatch) => {
  try {
    const data = await validateUser(userID);
    dispatch(setRegistrationStatus(data.status));
    localStorage.removeItem('registrationStatus');
  } catch (error) {
    console.error('Error validating user:', error);
  }
};

export const fetchUserStatusAction = (userID) => async (dispatch) => {
  try {
    const data = await userStatus(userID);
    dispatch(setRegistrationStatus(data.status));
    localStorage.setItem('registrationStatus', data.status);
  } catch (error) {
    console.error('Error fetching user status:', error);
  }
};
