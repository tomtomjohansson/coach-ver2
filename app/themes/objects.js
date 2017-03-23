import { Dimensions } from 'react-native';
import fonts from './fonts';
import metrics from './metrics';
import colors from './colors';

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const objects = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: colors.transparent
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      resizeMode: 'cover'
    },
    container: {
      marginTop: metrics.navBarHeight + metrics.baseMargin,
      height: 200,
      paddingTop: metrics.baseMargin,
      paddingBottom: metrics.baseMargin,
      borderRadius: 4,
      margin: metrics.baseMargin,
      backgroundColor: colors.offWhite
    },
    topContainer: {
      marginTop: metrics.navBarHeight,
      flex:1,
      justifyContent: 'flex-start',
      paddingTop: metrics.baseMargin,
      paddingBottom: metrics.baseMargin,
      backgroundColor: colors.offWhite
    },
    scrollViewContainer: {
      marginTop: metrics.navBarHeight,
      marginBottom: 62,
      flex: 1,
      backgroundColor: colors.offWhite
    },
    marginContainer: {
      margin: metrics.baseMargin,
    },
    field: {
      marginLeft: 3,
      marginRight: 3,
      marginTop: metrics.navBarHeight,
      marginBottom: 50,
      width: Dimensions.get('window').width,
      flex: 1,
      resizeMode: 'contain',
      flexDirection: 'column',
      backgroundColor: colors.lightGreen
    }
  },
  addingForm: {
    paddingVertical: metrics.smallMargin,
    paddingHorizontal: metrics.baseMargin,
    backgroundColor: colors.snow,
    opacity: 0.96,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    shadowColor: colors.semiTransparentBlack,
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 2
  },
  addingIcon: {
    color: colors.grassy,
    marginRight: metrics.baseMargin,
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowOffset: {width:1,height:1}
  },
  inputs: {
    container: {
      backgroundColor: colors.offWhite,
      height: 56,
      borderBottomColor: colors.greyishBlue,
      borderBottomWidth: 2,
      marginBottom: metrics.baseMargin
    },
    error: {
      borderBottomColor: colors.danger,
      borderBottomWidth: 2
    },
    label: {
      color: colors.greyishBlue,
      paddingHorizontal: metrics.baseMargin
    },
    input: {
      height: 38,
      paddingHorizontal: metrics.baseMargin,
      paddingVertical: metrics.smallMargin,
      backgroundColor: colors.offWhite
    },
    message: {
      paddingVertical: metrics.baseMargin,
      color: colors.danger,
      fontSize: fonts.size.small
    }
  },
  buttons: {
    button: {
      height: 40,
      marginBottom: metrics.baseMargin,
      paddingVertical: metrics.baseMargin,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 2,
      shadowColor: colors.black,
      shadowOpacity: 0.3,
      shadowOffset: {width:1,height:1},
      elevation: 2
    },
    round: {
      height: 50,
      width: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      shadowColor: colors.black,
      shadowOpacity: 0.3,
      shadowOffset: {width:1,height:1},
      elevation: 2

    },
    ctaRound: {
      backgroundColor: colors.grassy,
      height: 48,
      width: 48,
      borderRadius: 50
    },
    alertRound: {
      backgroundColor: colors.danger,
      height: 48,
      width: 48,
      borderRadius: 50
    },
    benchRound: {
      backgroundColor: 'maroon',
      height: 48,
      width: 48,
      borderRadius: 50
    },
    alert: {
      backgroundColor: colors.danger
    },
    cta: {
      backgroundColor: colors.grassy,
    },
    active: {
      backgroundColor: colors.darkBlue,
    },
    text: {
      color: colors.offWhite,
      fontFamily: fonts.type.buttons,
      fontWeight: '600'
    }
  },
  listitems: {
    container: {
      height: 48,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      borderBottomColor: colors.greyishBlue,
    },
    narrow: {
      height: 36,
      justifyContent: 'flex-start'
    },
    green: {
      backgroundColor: colors.lightGreen
    },
    white: {
      backgroundColor: colors.offWhite
    },
    header: {
      backgroundColor: colors.offBlack,
      padding: metrics.baseMargin,
    },
    headerText: {
      color: colors.snow,
      fontWeight: '600',
      fontFamily: fonts.type.title
    },
    matchStats: {
      height: 64,
      paddingHorizontal: metrics.baseMargin,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    text: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.offBlack,
      paddingHorizontal: metrics.baseMargin
    },
    smallerText: {
      fontWeight: '400',
      fontStyle: 'italic',
      paddingHorizontal: metrics.baseMargin
    },
    biggerText: {
      fontSize: 16
    },
    icon: {
      color: colors.darkBlue,
      paddingHorizontal: metrics.baseMargin
    },
    iconDelete: {
      color: colors.danger,
      paddingHorizontal: metrics.baseMargin
    }
  },
  stats: {
    header: {
      backgroundColor: colors.offBlack,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: metrics.baseMargin
    },
    barContainer: {
      height: 40,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    barFor: {
      height: 20,
      backgroundColor: colors.grassy,
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15
    },
    barDraws: {
      height: 20,
      backgroundColor: colors.neutral
    },
    barAgainst: {
      height: 20,
      backgroundColor: colors.danger,
      borderTopRightRadius: 15,
      borderBottomRightRadius: 15
    },
    barText: {
      textAlign: 'center',
      color: colors.black,
      fontWeight: '600'
    },
    leftText: {
      fontWeight: '600',
      fontSize: 14,
      textAlign: 'left',
      marginLeft: 10,
      textAlignVertical: 'center'
    },
    centerText: {
      fontWeight: '600',
      fontSize: 14,
      textAlign: 'center',
      textAlignVertical: 'center'
    },
    rightText: {
      fontWeight: '600',
      fontSize: 14,
      textAlign: 'right',
      marginRight: 10,
      textAlignVertical: 'center'
    },
    showFor: {
      borderTopRightRadius: 15,
      borderBottomRightRadius: 15
    },
    hide: {
      width: 0,
      opacity: 0
    },
    showAgainst: {
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15
    }
  }
};

export default objects;
