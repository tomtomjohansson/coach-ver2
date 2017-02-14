// Dependencies
import React, {Component} from 'React';
import {View,Text} from 'react-native';
import {Actions as NavigationActions} from 'react-native-router-flux';
import {goToRoute} from '../actions/routeActions';

class SingleGame extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    console.log(this.props);
    
  }
  render() {
    return (
      <View style={{flex:1}} >
      {this.props.children[0]}
      </View>
    );
  }
}

export default SingleGame;
