import { createReducer } from '@reduxjs/toolkit';
import { createUploadImage, setImages, removeImage } from './actions';

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
    })
    .addCase(removeImage, (state, action) => {
      state.images = state.images.filter(
        (image) => image._id !== action.payload
      );
    });
});

export default uploadImagesReducer;
