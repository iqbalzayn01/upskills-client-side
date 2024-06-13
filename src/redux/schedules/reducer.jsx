import { createReducer } from '@reduxjs/toolkit';
import { setSchedules, setOneSchedule } from './actions';

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
    });
});

export default schedulesReducer;
