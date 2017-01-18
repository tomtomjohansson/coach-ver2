// Dependencies
import React, {Component} from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { View, StatusBar, StyleSheet, Platform } from 'react-native';
// Containers, Components
import Routes from './navigation/routes';

const store = configureStore();

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar backgroundColor={backgroundColor} {...props} />
  </View>
);


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
        <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
        <Routes />
        </View>
      </Provider>
    )
  }
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT
  },
});

export default App;
