import { createAction } from '@reduxjs/toolkit';
import { uploadDocuments, getAllDocuments } from '../../utils/fetch';

export const setDocuments = createAction('uploadDocument/setDocuments');
export const uploadDocument = createAction(
  'uploadDocument/createUploadDocument'
);

export const fetchAllDocuments = () => async (dispatch) => {
  try {
    const res = await getAllDocuments();
    const dataAllDocuments = res.data;
    dispatch(setDocuments(dataAllDocuments));
  } catch (error) {
    console.error('Get All Documents Error:', error);
  }
};

export const fetchUploadDocument = (document) => async (dispatch) => {
  try {
    const res = await uploadDocuments(document);
    if (res.error) {
      throw new Error(res.data);
    }
    const dataUploadDocument = res.data;
    dispatch(uploadDocument(dataUploadDocument));
    return dataUploadDocument; // Return the data
  } catch (error) {
    console.error('Upload Document Error:', error);
    throw error; // Propagate the error
  }
};
