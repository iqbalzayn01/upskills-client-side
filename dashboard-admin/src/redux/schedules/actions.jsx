import { createAction } from '@reduxjs/toolkit';
import {
  getAllSchedules,
  createSchedules,
  deleteSchedules,
} from '../../utils/fetch';

export const setSchedules = createAction('schedules/setSchedules');
export const setOneSchedule = createAction('schedules/setOneSchedule');
export const createSchedule = createAction('schedules/createSchedule');
export const updateSchedule = createAction('schedules/updateSchedule');
export const removeSchedule = createAction('schedules/removeSchedule');

export const fetchAllSchedules = () => async (dispatch) => {
  try {
    const res = await getAllSchedules();
    const dataSchedules = res.data;
    dispatch(setSchedules(dataSchedules));
  } catch (error) {
    console.error('Get All Schedules Error:', error);
  }
};

export const fetchCreateSchedule = (scheduleData) => async (dispatch) => {
  try {
    const res = await createSchedules(scheduleData);
    const dataSchedules = res.data;
    dispatch(createSchedule(dataSchedules));
  } catch (error) {
    console.error('Create Schedules Error:', error);
  }
};

export const fetchDeleteSchedule = (id) => async (dispatch) => {
  try {
    await deleteSchedules(id);
    dispatch(removeSchedule(id));
  } catch (error) {
    console.error('Delete Schedules Error:', error);
  }
};
