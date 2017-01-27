import * as types from './actionTypes';
import {rootUrl,headers} from './ajaxConfig';

export function loginUserSuccess (user) {
  return {
    type: types.LOGIN_USER_SUCCESS,
    user
  };
}

export function registerUserSuccess (user) {
  return {
    type: types.REGISTER_USER_SUCCESS,
    user
  };
}

export function loginUser (credentials) {
  const url = `${rootUrl}/api/authenticate/login`;
  return async (dispatch,getState) => {
    // dispatch(beginAjaxCall());
    try {
      const response = await fetch(url,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      const json = await response.json();
      await json.success && dispatch(loginUserSuccess(json));
      return json;
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
    // dispatch(beginAjaxCall());
    try {
      const response = await fetch(url,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      const json = await response.json();
      await json.success && dispatch(registerUserSuccess(json));
      return json;
    }
    catch (e) {
      // dispatch(ajaxCallError)
      console.error(e);
    }
  };
}
