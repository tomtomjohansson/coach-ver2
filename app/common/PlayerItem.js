// Dependencies
import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Styles
import {objects, metrics} from '../themes';

export default function PlayerItem({index, player, onPress, checkArray = null }) {
  let checkIcon = null;
  if (checkArray) {
    checkIcon = <Icon name={getCheckIcon(player._id, checkArray)} size={metrics.icons.medium} style={objects.listitems.icon}/>
  }
  return (
    <TouchableOpacity index={index} onPress={()=>onPress(player._id)} >
      <View style={[objects.listitems.container,checkUneven(index) ? objects.listitems.green : objects.listitems.white]} >
        <View style={{flexDirection:'row', alignItems: 'center'}} >
          <Icon name="person"
            size={metrics.icons.medium}
            style={objects.listitems.icon}
          />
          <Text style={objects.listitems.text} >{player.name}</Text>
        </View>
        { checkIcon }
      </View>
    </TouchableOpacity>
  );
}

function getCheckIcon(id,array) {
  if (typeof array[0] === 'string') {
    return array.indexOf(id) >= 0 ? 'check-circle' : 'radio-button-unchecked';
  } else if (typeof array[0] === 'object' || !array.length ) {
    return array.find(i => i._id === id) ? 'check-circle' : 'radio-button-unchecked';
  }
}

function checkUneven(i) {
  return i % 2 !== 0;
}
