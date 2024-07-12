import { createAction } from '@reduxjs/toolkit';
import {
  registration,
  getAllRegistration,
  getOneRegistration,
  deleteRegistration,
} from '../../utils/fetch';

export const setRegistration = createAction('registration/setRegistration');
export const setOneRegistration = createAction(
  'registration/setOneRegistration'
);
export const createRegistration = createAction(
  'registration/createRegistration'
);
export const removeRegister = createAction('registration/removeRegister');

export const fetchAllRegistration = () => async (dispatch) => {
  try {
    const res = await getAllRegistration();
    const dataRegister = res.data;
    dispatch(setRegistration(dataRegister));
  } catch (error) {
    console.error('Get All Registrations Error:', error);
  }
};

export const fetchOneRegistration = (registrationID) => async (dispatch) => {
  try {
    const res = await getOneRegistration(registrationID);
    const dataRegister = res.data;
    dispatch(setOneRegistration(dataRegister));
    return dataRegister;
  } catch (error) {
    alert('Gagal Menampilkan Data Pendaftaran');
    console.error('Get One Registrations Error:', error);
  }
};

export const fetchCreateRegistration = (registerData) => async (dispatch) => {
  try {
    const res = await registration(registerData);
    const dataCreateRegistration = res.data;
    dispatch(createRegistration(dataCreateRegistration));
    return dataCreateRegistration;
  } catch (error) {
    console.error('Create Registration Error:', error);
  }
};

export const fetchDeleteRegister = (id) => async (dispatch) => {
  try {
    await deleteRegistration(id);
    dispatch(removeRegister(id));
  } catch (error) {
    console.error('Delete Registration Error:', error);
  }
};
