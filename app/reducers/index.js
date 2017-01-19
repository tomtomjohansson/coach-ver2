import {combineReducers} from 'redux';

import players from './playerReducer';

const rootReducer = combineReducers({
  players,
  rootAPI: 'localhost:3000'
});

export default rootReducer;
