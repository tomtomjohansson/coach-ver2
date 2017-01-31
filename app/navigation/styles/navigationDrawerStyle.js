import {colors, metrics} from '../../themes';
import {Platform} from 'react-native';

const statusBarHeight = Platform.OS === 'ios' ? 0 : 20;

export const drawer = {
  drawer: {
    backgroundColor: colors.snow,
  },
  main: {
    backgroundColor: colors.black,
    paddingLeft: 3
  }
}
export const overlay = {
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: statusBarHeight,
    width: metrics.screenWidth + 10,
    height: metrics.screenHeight,
    opacity: 0,
    backgroundColor: 'black',
    zIndex: -1
  },
};
