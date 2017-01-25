// Dependencies
import React, {Component} from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { View, StatusBar, StyleSheet, Platform, AsyncStorage } from 'react-native';
import {persistStore} from 'redux-persist';
// Containers, Components
import Routes from './navigation/routes';
import AppStatusBar from './components/statusBar/StatusBar';
// Styles
import {colors} from './themes'

async function setItem(item, value) {
  await AsyncStorage.setItem(item, value);
  const thing = await AsyncStorage.getItem('thing')
  console.log(thing);
  await AsyncStorage.removeItem("thing");
  console.log('Done');
  const allKeys = await AsyncStorage.getItem('reduxPersist:players');
  console.log(allKeys);
}

setItem('thing','thingy');

const store = configureStore();
persistStore(store, {storage: AsyncStorage});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
        <AppStatusBar backgroundColor={colors.black} barStyle="light-content"  />
        <Routes />
        </View>
      </Provider>
    )
  }
}

export default App;
