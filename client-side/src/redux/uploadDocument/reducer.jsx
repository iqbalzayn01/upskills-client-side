import { createReducer } from '@reduxjs/toolkit';
import { uploadDocument, setDocuments, removeDocument } from './actions';

const initialState = {
  documents: [],
  loading: false,
  error: null,
};

const uploadDocumentsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(uploadDocument, (state, action) => {
      state.documents.push(action.payload);
      state.loading = false;
      state.error = null;
    })
    .addCase(setDocuments, (state, action) => {
      state.documents = action.payload;
    })
    .addCase(removeDocument, (state, action) => {
      state.documents = state.documents.filter(
        (document) => document._id !== action.payload
      );
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
