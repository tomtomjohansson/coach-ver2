import {StyleSheet} from 'react-native';
import {metrics, colors,fonts} from '../../../themes/';
import {Platform} from 'react-native';

export default StyleSheet.create({
  drawerHeader: {
    height: 180,
  },
  drawerImage: {
    flex:1,
    width: undefined,
    height: undefined
  },
  drawerItem: {
    height: 42,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderBottomColor: colors.greyishBlue,
  },
  drawerItemText: {
    color: colors.black,
    fontFamily: fonts.type.nav,
    fontSize: fonts.size.regular,
    paddingHorizontal: metrics.baseMargin
  },
  drawerIcon: {
    color: colors.darkBlue,
    paddingHorizontal: metrics.baseMargin
  }
});