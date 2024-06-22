import { createReducer } from '@reduxjs/toolkit';
import {
  setEvents,
  setOneEvent,
  createEvent,
  updateEvent,
  removeEvent,
} from './actions';

const initialState = {
  events: [],
  event: {},
};

const eventsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setEvents, (state, action) => {
      state.events = action.payload;
    })
    .addCase(setOneEvent, (state, action) => {
      const index = state.events.findIndex(
        (event) => event._id === action.payload._id
      );
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    })
    .addCase(createEvent, (state, action) => {
      state.events.push(action.payload);
    })
    .addCase(updateEvent, (state, action) => {
      const index = state.events.findIndex(
        (event) => event._id === action.payload._id
      );
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    })
    .addCase(removeEvent, (state, action) => {
      state.events = state.events.filter(
        (event) => event._id !== action.payload
      );
    });
});

export default eventsReducer;
