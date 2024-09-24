import { createReducer } from '@reduxjs/toolkit';
import { createUploadImage, setImages } from './actions';

const initialState = {
  images: [],
};

const uploadImagesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createUploadImage, (state, action) => {
      state.images.push(action.payload);
    })
    .addCase(setImages, (state, action) => {
      state.images = action.payload;
    });
});

export default uploadImagesReducer;
