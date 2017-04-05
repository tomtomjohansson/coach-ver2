import React from 'React';
import Spinner from 'react-native-loading-spinner-overlay';	
// Styles
import {colors} from './themes';

function InitialSpinner({loading}) {
  return <Spinner visible={loading} textContent={'Laddar...'} textStyle={{color: colors.grassy}} color={colors.grassy} overlayColor={colors.semiPlusTransparentBlack} />;
}

export default InitialSpinner;
