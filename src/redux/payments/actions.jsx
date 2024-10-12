import { createAction } from '@reduxjs/toolkit';
import {
  createPayments,
  getAllPayments,
  getOnePayments,
} from '../../utils/fetch';

export const setPay = createAction('payments/setPay');
export const setOnePay = createAction('payments/setOnePay');
export const createPay = createAction('payments/createPay');

export const fetchAllPay = () => async (dispatch) => {
  try {
    const res = await getAllPayments();
    const dataPay = res.data;
    dispatch(setPay(dataPay));
    return dataPay;
  } catch (error) {
    console.error('Get All Payments Error:', error);
  }
};

export const fetchOnePay = (paymentID) => async (dispatch) => {
  try {
    const res = await getOnePayments(paymentID);
    const dataPay = res.data;
    dispatch(setOnePay(dataPay));
    return dataPay;
  } catch (error) {
    alert('Gagal Menampilkan Data Pendaftaran');
    console.error('Get One Payment Error:', error);
  }
};

export const fetchCreatePay = (registrationID) => async (dispatch) => {
  try {
    const res = await createPayments(registrationID);
    const dataCreatePay = res.data;
    dispatch(createPay(dataCreatePay));
    return dataCreatePay;
  } catch (error) {
    console.error('Create Payment Error:', error);
  }
};
