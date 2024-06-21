import { createReducer } from '@reduxjs/toolkit';
import { uploadDocument } from './actions';

const initialState = {
  documents: [],
  loading: false,
  error: null,
};

const uploadDocumentsReducer = createReducer(initialState, (builder) => {
  builder.addCase(uploadDocument, (state, action) => {
    state.documents.push(action.payload);
    state.loading = false;
    state.error = null;
  });
  // .addMatcher(
  //   (action) => action.type.endsWith('/pending'),
  //   (state) => {
  //     state.loading = true;
  //   }
  // )
  // .addMatcher(
  //   (action) => action.type.endsWith('/rejected'),
  //   (state, action) => {
  //     state.loading = false;
  //     state.error = action.error.message;
  //   }
  // )
});

export default uploadDocumentsReducer;
