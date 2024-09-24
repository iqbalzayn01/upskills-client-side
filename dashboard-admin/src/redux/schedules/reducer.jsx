import { createReducer } from '@reduxjs/toolkit';
import {
  setSchedules,
  setOneSchedule,
  createSchedule,
  updateSchedule,
  removeSchedule,
} from './actions';

const initialState = {
  schedules: [],
  schedule: {},
};

const schedulesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setSchedules, (state, action) => {
      state.schedules = action.payload;
    })
    .addCase(setOneSchedule, (state, action) => {
      const index = state.schedules.findIndex(
        (schedule) => schedule._id === action.payload._id
      );
      if (index !== -1) {
        state.schedules[index] = action.payload;
      }
    })
    .addCase(createSchedule, (state, action) => {
      state.schedules.push(action.payload);
    })
    .addCase(updateSchedule, (state, action) => {
      const index = state.schedules.findIndex(
        (schedule) => schedule._id === action.payload._id
      );
      if (index !== -1) {
        state.schedules[index] = action.payload;
      }
    })
    .addCase(removeSchedule, (state, action) => {
      state.schedules = state.schedules.filter(
        (schedule) => schedule._id !== action.payload
      );
    });
});

export default schedulesReducer;
