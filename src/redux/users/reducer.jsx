import { createReducer } from '@reduxjs/toolkit';
import { createUser } from './actions';

const initialState = {
  users: [],
};

const usersReducer = createReducer(initialState, (builder) => {
  builder.addCase(createUser, (state, action) => {
    state.users.push(action.payload);
  });
});

export default usersReducer;
