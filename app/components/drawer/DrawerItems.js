import React, {Component} from 'React';
import {Text,Image,View,TouchableHighlight} from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';

class DrawerItems extends Component {
  render() {
    const {navigateToRoute, items} = this.props;
    return (
      <View>
        {items.map((item,index) => {
          return (
            <TouchableHighlight key={index} onPress={()=>navigateToRoute(item.function)}>
              <Text style={{ color: 'white' }} >{ item.name }</Text>
            </TouchableHighlight>
          );
        })}
      </View>
    );
  }
}

export default DrawerItems;