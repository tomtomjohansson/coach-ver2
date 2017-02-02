import * as types from './actionTypes';
import storage from 'react-native-simple-store';
import {Actions as NavigationActions} from 'react-native-router-flux';

export function goToRoute(route,props,save) {
  NavigationActions[route](props);
  if (save) {
    storage.update('route', {route, props});
  }
}
