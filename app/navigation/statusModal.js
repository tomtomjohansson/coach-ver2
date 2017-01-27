import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {Actions as NavigationActions} from 'react-native-router-flux';

export default class StatusModal extends Component {

  constructor(props) {
    super(props);
    // set state with passed in props
    this.state = {
      message: props.error,
      hide: props.hide,
    };
    // bind functions
    this.dismissModal = this.dismissModal.bind(this);
  }

  dismissModal() {
    NavigationActions.pop();
  }

  // show or hide Modal based on 'hide' prop
  render() {
        return (
          <View style={{flex:1, backgroundColor: 'purple'}} >
          <TouchableOpacity onPress={this.dismissModal}>
            <Text>asdfasdfasd asdfasdfa asdfasdfasdfasdf asdfasd</Text>
            <Text>asdfasdfasd asdfasdfa asdfasdfasdfasdf asdfasd</Text>
            <Text>asdfasdfasd asdfasdfa asdfasdfasdfasdf asdfasd</Text>
            <Text>asdfasdfasd asdfasdfa asdfasdfasdfasdf asdfasd</Text>
            <Text>asdfasdfasd asdfasdfa asdfasdfasdfasdf asdfasd</Text>
            <Text>asdfasdfasd asdfasdfa asdfasdfasdfasdf asdfasd</Text>
          </TouchableOpacity>
          </View>
        );

  }
}
