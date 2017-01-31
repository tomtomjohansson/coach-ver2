// Dependencies
import React, {Component} from 'React';
import {View,Text} from 'react-native';
// Styles
import {objects} from '../../themes';

function PlayerStats({player}) {
  return (
      <View style={{flex:1}} >
        <Text>Single Player container</Text>
        <Text>Name: {player.name}</Text>
        <Text>Phone: {player.phone}</Text>
      </View>
    );
}

export default PlayerStats;
