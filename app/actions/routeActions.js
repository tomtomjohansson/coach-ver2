import * as types from './actionTypes';
import storage from 'react-native-simple-store';
import {Actions as NavigationActions} from 'react-native-router-flux';

export function goToRoute(route,props) {
  NavigationActions[route](props);
  route = cleanRoute(route);
  storage.update('route', {route, props});
}

function cleanRoute(route) {
   switch (route) {
    case 'singlePlayer':
    case 'addPlayer':
      return 'players';
    case 'singleTraining':
    case 'addTraining':
      return 'trainings';
    case 'addGame':
      return 'games';
    default: 
      return route;
  }
}
