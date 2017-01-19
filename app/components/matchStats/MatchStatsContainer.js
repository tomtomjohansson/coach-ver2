// Dependencies
import React, {Component} from 'React';
import {View,Text} from 'react-native';
// Styles
import {objects} from '../../themes';

class MatchStatsContainer extends Component {
  render() {
    return (
      <View style={[objects.screen.mainContainer, objects.screen.container]}>
        <Text>Match Stats container</Text>
      </View>
    );
  }
}

export default MatchStatsContainer;
