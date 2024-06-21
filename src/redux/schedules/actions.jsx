import { createAction } from '@reduxjs/toolkit';
import { getAllSchedules, getOneSchedule } from '../../utils/fetch';

export const setSchedules = createAction('schedules/setSchedules');
export const setOneSchedule = createAction('schedule/setOneSchedule');

export const fetchAllSchedules = () => async (dispatch) => {
  try {
    const res = await getAllSchedules();
    const dataSchedules = res.data;
    dispatch(setSchedules(dataSchedules));
  } catch (error) {
    console.error('Get All Schedules Error:', error);
  }
};

export const fetchOneSchedule = (id) => async (dispatch) => {
  try {
    const res = await getOneSchedule(id);
    const dataSchedule = res.data;
    dispatch(setOneSchedule(dataSchedule));
  } catch (error) {
    console.error('Get One Schedule Error:', error);
  }
};
