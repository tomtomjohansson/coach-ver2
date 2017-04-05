import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function playerReducer(state = initialState.players, action) {
  switch (action.type) {
    case types.LOGIN_USER_DONE:
      return action.players;
    case types.REGISTER_USER_DONE:
      return action.players;
    case types.LOGOUT_USER_SUCCESS:
      return [
        ...initialState.players
      ];
    case types.ADD_PLAYER_SUCCESS:
      return [
        ...action.players
      ];
    case types.REMOVE_PLAYER_SUCCESS:
      return [
        ...state.filter( player => player._id !== action.playerID )
      ];
    default:
      return state;
  }
}
