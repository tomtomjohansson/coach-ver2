// Dependencies
import React, {Component} from 'React';
import {View,Text} from 'react-native';
// Styles
import { objects } from '../themes';

class StartingElevenContainer extends Component {
  render() {
    return (
      <View style={[objects.screen.mainContainer, objects.screen.container]}>
        <Text>Starting Eleven container</Text>
      </View>
    );
  }
}

export default StartingElevenContainer;
