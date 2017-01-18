// Dependencies
import React, {Component} from 'React';
import {View,Text} from 'react-native';
import {Actions as NavigationActions} from 'react-native-router-flux';
// Styles
import { objects } from '../themes';

class GamesContainer extends Component {
  render() {
    return (
      <View style={[objects.screen.mainContainer, objects.screen.container]}>
        <Text>Games container</Text>
        <Text onPress={NavigationActions.singleGame} >Go to game!!!</Text>
      </View>
    );
  }
}

export default GamesContainer;
