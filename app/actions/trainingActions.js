import * as types from './actionTypes';
import {rootUrl,getHeaders,saveToken} from './ajaxConfig';

export function addTraining(training) {
  const url = `${rootUrl}/api/trainings`;
  return async (dispatch,getState) => {
    const headers = await getHeaders();
    // dispatch(beginAjaxCall());
    try {
      const response = await fetch(url,{
        method: 'POST',
        headers,
        body: JSON.stringify(training)
      });
      const json = await response.json();
      return { success: json.success, message: json.message };
    }
    catch (e) {
      // dispatch(ajaxCallError)
      console.error(e);
    }
  };
}

export function getTrainings() {
  const url = `${rootUrl}/api/trainings`;
  return async (dispatch,getState) => {
    const headers = await getHeaders();
    // dispatch(beginAjaxCall());
    try {
      const response = await fetch(url,{
        method: 'GET',
        headers
      });
      const json = await response.json();
      console.log(json);
      return { success: json.success, message: json.message, trainings: json.trainings };
    }
    catch (e) {
      // dispatch(ajaxCallError)
      console.error(e);
    }
  };
}
