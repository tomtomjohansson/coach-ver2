// Dependencies
import React, {Component} from 'React';
import {View,Text} from 'react-native';
import {Actions as NavigationActions} from 'react-native-router-flux';
// Styles
import {objects} from '../../themes';

class TrainingContainer extends Component {
  render() {
    return (
      <View style={[objects.screen.mainContainer, objects.screen.container]}>
        <Text>Training container</Text>
        <Text onPress={NavigationActions.singleTraining} >Gå till träning</Text>
      </View>
    );
  }
}

export default TrainingContainer;
