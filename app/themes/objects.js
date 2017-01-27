import fonts from './fonts';
import metrics from './metrics';
import colors from './colors';

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const objects = {
  screen: {
    mainContainer: {
      flex: 1,
      justifyContent: 'center',
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
      flex: 1,
      paddingTop: metrics.baseMargin,
      paddingBottom: metrics.baseMargin,
      backgroundColor: colors.offWhite
    },
    marginContainer: {
      margin: metrics.baseMargin,
    }
  },
  addingForm: {
    padding: metrics.marginHorizontal,
    backgroundColor: colors.semiTransparent,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute'
  },
  addingIcon: {
    color: colors.grassy,
    marginRight: metrics.baseMargin,
  },
  addPlayer: {
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
      height:40,
      marginBottom: metrics.baseMargin,
      paddingVertical: metrics.baseMargin,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 2
    },
    alert: {
      backgroundColor: colors.danger
    },
    cta: {
      backgroundColor: colors.grassy,
    },
    text: {
      color: colors.offWhite,
      fontFamily: fonts.type.buttons,
      fontWeight: '600'
    }
  },
  listitems: {
    container: {
      height: 42,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.greyishBlue,
    },
    green: {
      backgroundColor: colors.lightGreen
    },
    white: {
      backgroundColor: colors.offWhite
    },
    text: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.black,
      paddingHorizontal: metrics.baseMargin
    },
    icon: {
      color: colors.darkBlue,
      paddingHorizontal: metrics.baseMargin
    }
  }
};

export default objects;
