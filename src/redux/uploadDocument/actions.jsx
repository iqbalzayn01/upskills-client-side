import { createAction } from '@reduxjs/toolkit';
import {
  uploadDocuments,
  getAllDocuments,
  updateDocuments,
  deleteDocument,
} from '../../utils/fetch';

export const setDocuments = createAction('uploadDocument/setDocuments');
export const uploadDocument = createAction(
  'uploadDocument/createUploadDocument'
);
export const updateDocument = createAction('uploadDocument/updateDocument');
export const removeDocument = createAction('uploadDocument/removeDocument');

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
    return dataUploadDocument;
  } catch (error) {
    console.error('Upload Document Error:', error);
    throw error;
  }
};

export const fetchUpdateDocument = (id, dataDocument) => async (dispatch) => {
  try {
    const res = await updateDocuments(id, dataDocument);
    const dataUpdateDocument = res.data;
    dispatch(updateDocument(dataUpdateDocument));
  } catch (error) {
    console.error('Update Document Error:', error);
  }
};

export const fetchDeleteDocument = (id) => async (dispatch) => {
  try {
    await deleteDocument(id);
    dispatch(removeDocument(id));
  } catch (error) {
    console.error('Delete Document Error:', error);
  }
};
