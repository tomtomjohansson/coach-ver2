// Dependencies
import React, {Component} from 'React';
import {View,Text} from 'react-native';
// Styles
import {objects} from '../../themes';

class SingleTrainingContainer extends Component {
  render() {
    return (
      <View style={[objects.screen.mainContainer, objects.screen.container]}>
        <Text>Single Training container</Text>
      </View>
    );
  }
}

export default SingleTrainingContainer;
