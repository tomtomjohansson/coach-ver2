// Dependencies
import React, {Component} from 'React';
import {View,Text,Button,TextInput, TouchableOpacity, TouchableHighlight, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Actions as NavigationActions} from 'react-native-router-flux';
import * as Anim from 'react-native-animatable';
// Styles
import {objects,metrics} from '../../themes';

class AddPlayer extends Component {
  constructor(props) {
    super(props);
  }
  openModal =() => {
    console.log('doing')
    NavigationActions.thingModal({error: "Network failed...", hide: false})
  }

  render() {
    return (
      <View style={{flex:1}}>
        <TextInput/>
        <View style={[objects.addingForm]}>
            <TouchableHighlight onPress={this.openModal}>
            <Icon 
              style={[objects.addingIcon]}
              name="add-circle"
              size={metrics.icons.large}
            />
            </TouchableHighlight>
            <Text style={[objects.addPlayer]}>Lägg till spelare</Text> 
        </View>
      </View>
    );
  }
}

export default AddPlayer;

