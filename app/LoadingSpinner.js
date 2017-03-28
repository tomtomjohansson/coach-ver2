import React from 'React';
import Spinner from 'react-native-loading-spinner-overlay';
import {colors} from './themes';

function LoadingSpinner({loading}) {
  return <Spinner visible={loading} textContent={'Laddar...'} textStyle={{color: colors.grassy}} color={colors.grassy} overlayColor={colors.semiPlusTransparentBlack} />;
}

export default LoadingSpinner;
