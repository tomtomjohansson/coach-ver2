// Dependencies
import React, {Component} from 'React';
import {Text,Image,View,TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Styles
import styles from './styles/styles';
import {metrics} from '../../themes'

class DrawerItems extends Component {
  render() {
    const {navigateToRoute, items, logOut, active} = this.props;
    return (
      <View >
        {items.map((item,index) => {
          return (
            <TouchableHighlight key={index} onPress={()=>navigateToRoute(item.key,index)}>
              <View style={[styles.drawerItem, active === item.key && styles.drawerActive]} >
                <Icon name={item.icon}
                  size={metrics.icons.medium}
                  style={styles.drawerIcon}
                />
                <Text style={[styles.drawerItemText]} >{ item.name }</Text>
              </View>
            </TouchableHighlight>
          );
        })}
        <TouchableHighlight onPress={logOut}>
          <View style={[styles.drawerItem]} >
            <Icon name="power-settings-new"
              size={metrics.icons.medium}
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