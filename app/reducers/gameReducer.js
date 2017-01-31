import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function gameReducer(state = initialState.games, action) {
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      return action.games;
    case types.REGISTER_USER_SUCCESS:
      return action.games;
    case types.LOGOUT_USER_SUCCESS:
      return [
        ...initialState.games
      ];
    default:
      return state;
  }
}
