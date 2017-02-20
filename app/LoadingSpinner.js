import React from 'React';
import {ActivityIndicator} from 'react-native';
import * as Animatable from 'react-native-animatable';
// Styles
import {colors} from './themes';

function LoadingSpinner({isLoading}) {
  const fadeIn = {
    from: {
      opacity: 0
    },
    to: {
      opacity:1
    }
  };
  const fadeOut = {
    from: {
      opacity: 1
    },
    to: {
      opacity: 0
    }
  };
  return (
  <Animatable.View duration={2000} animation={isLoading ? fadeIn : fadeOut} style={
    [{
      position:'absolute',right:0,top:0,bottom:0,left:0,
      zIndex: isLoading ? 2000 : 0,
      backgroundColor:colors.semiPlusTransparentBlack}]
  }>
      {isLoading &&
        <ActivityIndicator
          animating={isLoading}
          style={[{height: 580}]}
          size="large"
          color={colors.grassy}
        />
      }
  </Animatable.View>
  );
}
export default LoadingSpinner;
