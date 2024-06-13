import { createAction } from '@reduxjs/toolkit';
import { getAllSchedules } from '../../utils/fetch';

export const setSchedules = createAction('schedules/setSchedules');
export const setOneSchedule = createAction('schedules/setOneSchedule');

export const fetchAllSchedules = () => async (dispatch) => {
  try {
    const res = await getAllSchedules();
    const dataSchedules = res.data;
    dispatch(setSchedules(dataSchedules));
  } catch (error) {
    console.error('Get All Schedules Error:', error);
  }
};
