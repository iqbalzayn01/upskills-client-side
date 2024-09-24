import { createAction } from '@reduxjs/toolkit';
import { uploadImages, getAllImages } from '../../utils/fetch';

export const setImages = createAction('uploadImage/setImages');
export const setOneImages = createAction('uploadImage/setOneImages');
export const createUploadImage = createAction('uploadImage/createUploadImage');

export const fetchAllImages = () => async (dispatch) => {
  try {
    const res = await getAllImages();
    const dataAllImages = res.data;
    dispatch(setImages(dataAllImages));
  } catch (error) {
    console.error('Get All Images Error:', error);
  }
};

export const fetchUploadImages = (images) => async (dispatch) => {
  try {
    const res = await uploadImages(images);
    if (res.error) {
      throw new Error(res.data);
    }
    const dataImages = res.data;
    dispatch(createUploadImage(dataImages));
    return dataImages;
  } catch (error) {
    console.error('Upload Image Error:', error);
    throw error;
  }
};
