// Dependencies
import React, {Component} from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { View, Text, StatusBar, Platform, AsyncStorage } from 'react-native';
import {persistStore} from 'redux-persist';
import storage from 'react-native-simple-store';
// Containers, Components
import Routes from './navigation/routes';
import AppStatusBar from './components/statusBar/StatusBar';
// Styles
import {colors} from './themes'

async function setItem(item, value) {
  await storage.save(item, value);
  const thing = await storage.get('thing')
  console.log(thing);
  await storage.update('thing','dingdong');
  const newThing = await storage.get('thing')
  console.log(newThing);
  await storage.delete("thing");
  console.log('Done');
  const allKeys = await AsyncStorage.getAllKeys();
  console.log(allKeys);
}

setItem('thing',{foo:'bar'});
const store = configureStore();

class App extends Component {
  constructor () {
    super();
    this.state = {rehydrated:false};
  }
  componentWillMount () {
    persistStore(store, {storage: AsyncStorage},() => {
      this.setState({rehydrated: true});
    });

    if (!__DEV__){
      this.defaultHandler = ErrorUtils.getGlobalHandler(); // eslint-disable-line no-undef
      ErrorUtils.setGlobalHandler(this.wrapGlobalHandler.bind(this)); // eslint-disable-line no-undef
    }
  }
  async wrapGlobalHandler (error, isFatal) {
    if (isFatal && !__DEV__) {AsyncStorage.clear(); }
    if (this.defaultHandler) {this.defaultHandler(error, isFatal)};
  }
  render() {
    if (!this.state.rehydrated) {
      return (
        <View style={{flex:1}}>
          <Text>Loading</Text>
        </View>
      );
    }
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
          <AppStatusBar backgroundColor={colors.black} barStyle="light-content" />
          <Routes />
        </View>
      </Provider>
    )
  }
}

export default App;
