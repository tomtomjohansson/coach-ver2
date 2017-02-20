import {combineReducers} from 'redux';

import players from './playerReducer';
import user from './userReducer';
import trainings from './trainingReducer';
import games from './gameReducer';
import ajax from './ajaxReducer';

const rootReducer = combineReducers({
  players,
  user,
  trainings,
  games,
  ajax
});

export default rootReducer;
