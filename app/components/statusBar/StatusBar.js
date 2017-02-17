// Dependencies
import React from 'react';
import { View, StatusBar } from 'react-native';
// styles
import styles from './styles/statusBarStyle';


const AppStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar backgroundColor={backgroundColor} {...props} />
  </View>
);

export default AppStatusBar;
