import { createAction } from '@reduxjs/toolkit';
import {
  createTalents,
  getAllTalents,
  updateTalents,
  deleteTalent,
} from '../../utils/fetch';

export const setTalents = createAction('talents/setTalents');
export const setOneTalent = createAction('talents/setOneTalent');
export const createTalent = createAction('talents/createTalent');
export const updateTalent = createAction('talents/updateTalent');
export const removeTalent = createAction('talents/removeTalent');

export const fetchAllTalents = () => async (dispatch) => {
  try {
    const res = await getAllTalents();
    const dataTalents = res.data;
    dispatch(setTalents(dataTalents));
  } catch (error) {
    console.error('Get All Talents Error:', error);
  }
};

export const fetchCreateTalent = (talentData) => async (dispatch) => {
  try {
    const res = await createTalents(talentData);
    const dataCreateTalent = res.data;
    dispatch(createTalent(dataCreateTalent));
  } catch (error) {
    console.error('Create Talent Error:', error);
  }
};

export const fetchUpdateTalent = (id, talentData) => async (dispatch) => {
  try {
    const res = await updateTalents(id, talentData);
    const dataUpdateTalent = res.data;
    dispatch(updateTalent(dataUpdateTalent));
  } catch (error) {
    console.error('Update Talent Error:', error);
  }
};

export const fetchDeleteTalent = (id) => async (dispatch) => {
  try {
    await deleteTalent(id);
    dispatch(removeTalent(id));
  } catch (error) {
    console.error('Delete Talent Error:', error);
  }
};
