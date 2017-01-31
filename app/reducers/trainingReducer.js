import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function trainingReducer(state = initialState.trainings, action) {
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      return action.trainings;
    case types.REGISTER_USER_SUCCESS:
      return action.trainings;
    case types.LOGOUT_USER_SUCCESS:
      return [
        ...initialState.trainings
      ];
    default:
      return state;
  }
}
