// Dependencies
import React, {Component} from 'React';
import {View,Text} from 'react-native';
import {Actions as NavigationActions} from 'react-native-router-flux';
// Styles
import { objects } from '../themes';

class PlayerContainer extends Component {
  render() {
    return (
      <View style={[objects.screen.mainContainer, objects.screen.container]}>
        <Text>Player container</Text>
        <Text onPress={NavigationActions.singlePlayer} >Gå till spelare</Text>
      </View>
    );
  }
}

export default PlayerContainer;
