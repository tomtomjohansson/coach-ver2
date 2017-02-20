import * as types from '../actions/actionTypes';
import initialState from './initialState';

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === '_SUCCESS';
}

export default function ajaxStatusReducer(state = initialState.numAjaxCallsInProgress, action) {
  if (action.type === types.BEGIN_AJAX_CALL) {
    return state + 1;
  } else if (action.type === types.LOGOUT_USER_SUCCESS) {
    console.log('loggar ut där');
    return initialState.numAjaxCallsInProgress;
  } else if (action.type === 'AJAX_CALL_ERROR' || actionTypeEndsInSuccess(action.type)) {
    return state - 1;
  }
  return state;
}
