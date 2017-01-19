// Dependencies
import React, {Component} from 'React';
import {View,Text} from 'react-native';
// Styles
import {objects} from '../../themes';

function PlayerStats({player}) {
  return (
      <View style={[objects.screen.mainContainer, objects.screen.container]}>
        <Text>Single Player container</Text>
        <Text>Name: {player.name}</Text>
        <Text>Name: {player.age}</Text>
      </View>
    );
}

export default PlayerStats;
