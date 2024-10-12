import { createReducer } from '@reduxjs/toolkit';
import {
  setUsers,
  setOneUser,
  createUser,
  updateUser,
  removeUser,
} from './actions';

const initialState = {
  users: [],
  user: {},
};

const usersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUsers, (state, action) => {
      state.users = action.payload;
    })
    .addCase(setOneUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(createUser, (state, action) => {
      state.users.push(action.payload);
    })
    .addCase(updateUser, (state, action) => {
      const index = state.users.findIndex(
        (user) => user._id === action.payload._id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    })
    .addCase(removeUser, (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    });
});

export default usersReducer;
