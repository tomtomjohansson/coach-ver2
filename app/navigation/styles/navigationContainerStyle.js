import {metrics, colors,fonts} from '../../themes/';
import {Platform} from 'react-native';
import {StyleSheet} from 'react-native';

const NavbarHeight = Platform.OS === 'ios' ? 44 : 56;
const statusMargin = Platform.OS === 'ios' ? -20 : 0;

export default StyleSheet.create({
  container: {
    flex: 1
  },
  navBar: {
    backgroundColor: colors.grassy,
    flex:1,
    height: NavbarHeight
  },
  title: {
    marginTop: statusMargin,
    color: colors.snow,
    fontFamily: fonts.type.title,
    fontWeight: '600',
    fontSize: 18
  },
  leftButton: {
    marginTop: statusMargin,
    color: colors.snow
  },
  rightButton: {
    marginTop: statusMargin,
    color: colors.snow
  }
});