import { createAction } from '@reduxjs/toolkit';
import { uploadDocuments } from '../../utils/fetch';

export const uploadDocument = createAction(
  'uploadDocument/createUploadDocument'
);

export const fetchUploadDocument = (document) => async (dispatch) => {
  try {
    const res = await uploadDocuments(document);
    if (res.error) {
      throw new Error(res.data);
    }
    const dataUploadDocument = res.data;
    dispatch(uploadDocument(dataUploadDocument));
  } catch (error) {
    console.error('Upload Document Error:', error);
  }
};
