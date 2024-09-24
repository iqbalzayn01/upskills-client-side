import { createReducer } from '@reduxjs/toolkit';
import {
  setTalents,
  setOneTalent,
  createTalent,
  updateTalent,
  removeTalent,
} from './actions';

const initialState = {
  talents: [],
  talent: {},
};

const talentsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setTalents, (state, action) => {
      state.talents = action.payload;
    })
    .addCase(setOneTalent, (state, action) => {
      const index = state.talents.findIndex(
        (talent) => talent._id === action.payload._id
      );
      if (index !== -1) {
        state.talents[index] = action.payload;
      }
    })
    .addCase(createTalent, (state, action) => {
      state.talents.push(action.payload);
    })
    .addCase(updateTalent, (state, action) => {
      const index = state.talents.findIndex(
        (talent) => talent._id === action.payload._id
      );
      if (index !== -1) {
        state.talents[index] = action.payload;
      }
    })
    .addCase(removeTalent, (state, action) => {
      state.talents = state.talents.filter(
        (talent) => talent._id !== action.payload
      );
    });
});

export default talentsReducer;
