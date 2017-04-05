import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function gameReducer(state = initialState.games, action) {
  switch (action.type) {
    case types.LOGIN_USER_DONE:
      return action.games;
    case types.REGISTER_USER_DONE:
      return action.games;
    case types.LOGOUT_USER_SUCCESS:
      return [
        ...initialState.games
      ];
    case types.ADD_GAME_SUCCESS:
      return [
        ...action.games
      ];
    case types.SAVE_ELEVEN_SUCCESS:
      const index = state.findIndex(game => game._id === action.game._id);
      return [
        ...state.slice(0,index),
        {...action.game},
        ...state.slice(index + 1)
      ];
    case types.UPDATE_STAT_SUCCESS:
      return [
        ...state.filter(game => game._id !== action.game._id),
        {...action.game}
      ];
    case types.DELETE_GAME_SUCCESS:
      const i = state.findIndex(game => game._id === action.gameID);
      return [
        ...state.filter(game => game._id !== action.gameID)
      ];
    default:
      return state;
  }
}
