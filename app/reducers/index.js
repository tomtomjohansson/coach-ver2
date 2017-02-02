import {combineReducers} from 'redux';

import players from './playerReducer';
import user from './userReducer';
import trainings from './trainingReducer';
import games from './gameReducer';

const rootReducer = combineReducers({
  players,
  user,
  trainings,
  games
});

export default rootReducer;
