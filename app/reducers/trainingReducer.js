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
    case types.ADD_TRAINING_SUCCESS:
      return [
        ...action.trainings
      ];
    case types.DELETE_TRAINING_SUCCESS:
      return [
        ...state.filter( training => training._id !== action.trainingID )
      ];
    case types.UPDATE_TRAINING_SUCCESS:
      const index = state.findIndex(training => training._id === action.training._id);
      return [
        ...state.slice(0,index),
        {...action.training},
        ...state.slice(index + 1)
      ];
    default:
      return state;
  }
}
