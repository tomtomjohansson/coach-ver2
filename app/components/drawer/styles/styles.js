import {StyleSheet} from 'react-native';
import {metrics, colors,fonts} from '../../../themes/';

export default StyleSheet.create({
  drawerHeader: {
    height: 180,
  },
  drawerHeaderClub: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 26,
    left: 10,
    backgroundColor: colors.transparent,
  },
  drawerHeaderClubText: {
    color: colors.snow,
    textShadowColor: colors.semiTransparentBlack,
    textShadowOffset: {width: 1, height:1},
    fontFamily: fonts.type.title,
    fontSize: fonts.size.h5
  },
  drawerHeaderEmail: {
    backgroundColor: colors.transparent,
    position: 'absolute',
    left: 10,
    bottom: 10,
    color: colors.snow,
    textShadowColor: colors.semiTransparentBlack,
    textShadowOffset: {width: 1, height:1},
    fontFamily: fonts.type.nav,
    fontSize: fonts.size.small
  },
  drawerImage: {
    flex:1,
    width: undefined,
    height: undefined
  },
  drawerItem: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  drawerActive: {
    backgroundColor: colors.lightGreen
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
