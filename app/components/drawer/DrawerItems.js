// Dependencies
import React, {Component} from 'React';
import {Text,Image,View,TouchableHighlight} from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Styles
import styles from './styles/styles';
import {metrics} from '../../themes'

class DrawerItems extends Component {
  render() {
    const {navigateToRoute, items, logOut} = this.props;
    return (
      <View style={{marginTop: 10}} >
        {items.map((item,index) => {
          return (
            <TouchableHighlight key={index} onPress={()=>navigateToRoute(item.function)}>
              <View style={[styles.drawerItem]} >
                <Icon name="person"
                  size={metrics.icons.small}
                  style={styles.drawerIcon}
                />
                <Text style={[styles.drawerItemText]} >{ item.name }</Text>
              </View>
            </TouchableHighlight>
          );
        })}
        <TouchableHighlight onPress={logOut}>
          <View style={[styles.drawerItem]} >
            <Icon name="person"
              size={metrics.icons.small}
              style={styles.drawerIcon}
            />
            <Text style={[styles.drawerItemText]} >Logga Ut</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default DrawerItems;