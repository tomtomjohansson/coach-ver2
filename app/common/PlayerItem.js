// Dependencies
import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Styles
import {objects, metrics} from '../themes';

export default function PlayerItem({index, player, onPress }) {
  return (
    <TouchableOpacity index={index} onPress={()=>onPress(player._id)} >
      <View style={[objects.listitems.container,checkUneven(index) ? objects.listitems.green : objects.listitems.white]} >
        <Icon name="person"
          size={metrics.icons.medium}
          style={objects.listitems.icon}
        />
        <Text style={objects.listitems.text} >{player.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

function checkUneven(i) {
  return i % 2 !== 0;
}
