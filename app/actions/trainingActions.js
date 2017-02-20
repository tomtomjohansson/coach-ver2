import * as types from './actionTypes';
import {rootUrl,getHeaders} from './ajaxConfig';
import {beginAjaxCall, ajaxCallError} from './ajaxActions';

export function addTrainingSuccess(trainings) {
  return {
    type: types.ADD_TRAINING_SUCCESS,
    trainings
  };
}

export function deleteTrainingSuccess(trainingID) {
  return {
    type: types.DELETE_TRAINING_SUCCESS,
    trainingID
  };
}

export function updateTrainingSuccess(training,attending) {
  return {
    type: types.UPDATE_TRAINING_SUCCESS,
    training,
    attending
  };
}

export function addTraining(training) {
  const url = `${rootUrl}/api/trainings`;
  return async (dispatch,getState) => {
    const headers = await getHeaders();
    dispatch(beginAjaxCall());
    try {
      const response = await fetch(url,{
        method: 'POST',
        headers,
        body: JSON.stringify(training)
      });
      const json = await response.json();
      await dispatch(addTrainingSuccess(json.trainings));
      return { success: json.success, message: json.message };
    }
    catch (e) {
      dispatch(ajaxCallError);
      return { success: false, message: e };
    }
  };
}

export function deleteTraining(trainingID) {
  const url = `${rootUrl}/api/trainings/${trainingID}`;
  return async (dispatch,getState) => {
    const headers = await getHeaders();
    dispatch(beginAjaxCall());
    try {
      const response = await fetch(url,{
        method: 'DELETE',
        headers
      });
      const json = await response.json();
      if (json.success) {
        await dispatch(deleteTrainingSuccess(trainingID));
        return { success: json.success };
      } else {
        return { success: json.success, message: json.message };
      }
    }
    catch (e) {
      dispatch(ajaxCallError);
      return { success: false, message: e };
    }
  };
}

export function updateTraining(training,attending) {
  const url = `${rootUrl}/api/trainings`;
  return async (dispatch,getState) => {
    const headers = await getHeaders();
    dispatch(beginAjaxCall());
    try {
      const response = await fetch(url,{
        method: 'PUT',
        headers,
        body: JSON.stringify({training,attending})
      });
      const json = await response.json();
      if (json.success) {
        await dispatch(updateTrainingSuccess(training,attending));
        return { success: json.success };
      } else {
        return { success: json.success, message: json.message };
      }
    }
    catch (e) {
      dispatch(ajaxCallError);
      return { success: false, message: e };
    }
  };
}

export function getTrainings() {
  const url = `${rootUrl}/api/trainings`;
  return async (dispatch,getState) => {
    const headers = await getHeaders();
    dispatch(beginAjaxCall());
    try {
      const response = await fetch(url,{
        method: 'GET',
        headers
      });
      const json = await response.json();
      return { success: json.success, message: json.message, trainings: json.trainings };
    }
    catch (e) {
      dispatch(ajaxCallError);
      return { success: false, message: e };
    }
  };
}
