import {combineReducers} from 'redux';

import players from './playerReducer';
import user from './userReducer';
import trainings from './trainingReducer';
import games from './gameReducer';
import route from './routeReducer';

const rootReducer = combineReducers({
  players,
  user,
  trainings,
  games,
  route
});

export default rootReducer;
