import {StyleSheet} from 'react-native';
import {metrics, colors,fonts} from '../../../themes/';

export default StyleSheet.create({
  venueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    borderBottomColor: colors.greyishBlue,
    borderBottomWidth: 2,
    marginBottom: metrics.baseMargin
  },
  venueChoice: {
    flex:1,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
