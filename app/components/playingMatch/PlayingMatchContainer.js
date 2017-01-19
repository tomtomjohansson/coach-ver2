// Dependencies
import React, {Component} from 'React';
import {View,Text} from 'react-native';
// Styles
import {objects} from '../../themes';

class PlayingMatchContainer extends Component {
  render() {
    return (
      <View style={[objects.screen.mainContainer, objects.screen.container]}>
        <Text>Playing Match container</Text>
      </View>
    );
  }
}

export default PlayingMatchContainer;
