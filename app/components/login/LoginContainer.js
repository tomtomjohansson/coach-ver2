// Dependencies
import React, { Component } from 'React';
import { View, Text } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
// Styles
import {objects} from '../../themes';

class LoginContainer extends Component {
  render() {
    console.log(NavigationActions);
    return (
      <View style={[objects.screen.mainContainer, objects.screen.container]}>
        <Text>Login container</Text>
      </View>
    );
  }
}

export default LoginContainer;
