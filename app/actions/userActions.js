import * as types from './actionTypes';
import {rootUrl,getHeaders,saveToken} from './ajaxConfig';

export function loginUserSuccess(response) {
  return {
    type: types.LOGIN_USER_SUCCESS,
    user: response.user,
    players: response.players,
    trainings: response.trainings,
    games: response.games
  };
}

export function registerUserSuccess(response) {
  return {
    type: types.REGISTER_USER_SUCCESS,
    user: response.user,
    players: response.players,
    trainings: response.trainings,
    games: response.games
  };
}

export function logoutUser() {
  return {
    type: types.LOGOUT_USER_SUCCESS
  };
}

export function loginUser(credentials) {
  const url = `${rootUrl}/api/authenticate/login`;
  return async (dispatch,getState) => {
    const headers = await getHeaders();
    // dispatch(beginAjaxCall());
    try {
      const response = await fetch(url,{
        method: 'POST',
        headers,
        body: JSON.stringify(credentials)
      });
      const json = await response.json();
      if (json.success) {
        await dispatch(loginUserSuccess(json));
        await saveToken(json.token);
        return {
          success: json.success
        };
      } else {
        return {
          success: json.success,
          message: json.message
        };
      }
    }
    catch (e) {
      // dispatch(ajaxCallError)
      console.error(e);
    }
  };
}

export function registerUser (credentials) {
  const url = `${rootUrl}/api/authenticate/register`;
  return async (dispatch,getState) => {
    const headers = await getHeaders();
    // dispatch(beginAjaxCall());
    try {
      const response = await fetch(url,{
        method: 'POST',
        headers,
        body: JSON.stringify(credentials)
      });
      const json = await response.json();
      if (json.success) {
        await dispatch(registerUserSuccess(json));
        await saveToken(json.token);
        return {
          success: json.success
        };
      } else {
        return {
          success: json.success,
          message: json.message
        };
      }
    }
    catch (e) {
      // dispatch(ajaxCallError)
      console.error(e);
    }
  };
}
