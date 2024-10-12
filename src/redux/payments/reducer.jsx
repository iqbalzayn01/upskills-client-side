import { createReducer } from '@reduxjs/toolkit';
import { setPay, setOnePay, createPay } from './actions';

const initialState = {
  payments: [],
  pay: null,
};

const paymentReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setPay, (state, action) => {
      state.payments = action.payload;
    })
    .addCase(setOnePay, (state, action) => {
      state.pay = action.payload;
    })
    .addCase(createPay, (state, action) => {
      state.payments.push(action.payload);
    });
});

export default paymentReducer;
