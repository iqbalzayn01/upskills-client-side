import { createAction } from '@reduxjs/toolkit';
import {
  createEvents,
  getAllEvents,
  updateEvents,
  deleteEvent,
} from '../../utils/fetch';

export const setEvents = createAction('events/setEvents');
export const setOneEvent = createAction('events/setOneEvent');
export const createEvent = createAction('events/createEvent');
export const updateEvent = createAction('events/updateEvent');
export const removeEvent = createAction('events/removeEvent');

export const fetchAllEvents = () => async (dispatch) => {
  try {
    const res = await getAllEvents();
    const dataEvents = res.data;
    dispatch(setEvents(dataEvents));
  } catch (error) {
    console.error('Get All Events Error:', error);
  }
};

export const fetchCreateEvent = (eventData) => async (dispatch) => {
  try {
    const res = await createEvents(eventData);
    const dataCreateEvent = res.data;
    dispatch(createEvent(dataCreateEvent));
  } catch (error) {
    console.error('Create Event Error:', error);
  }
};

export const fetchUpdateEvent = (id, eventData) => async (dispatch) => {
  try {
    const res = await updateEvents(id, eventData);
    const dataUpdateEvent = res.data;
    dispatch(updateEvent(dataUpdateEvent));
  } catch (error) {
    console.error('Update Event Error:', error);
  }
};

export const fetchDeleteEvent = (id) => async (dispatch) => {
  try {
    await deleteEvent(id);
    dispatch(removeEvent(id));
  } catch (error) {
    console.error('Delete Event Error:', error);
  }
};
