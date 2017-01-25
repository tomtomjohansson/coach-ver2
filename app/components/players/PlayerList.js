// Dependencies
import React, {Component} from 'React';
import {View,Text,ScrollView,TouchableOpacity} from 'react-native';
// Styles
import {objects} from '../../themes';

function PlayerList({players,goToSinglePlayer}) {
  return (
    <ScrollView style={[objects.screen.container]}>
      {players.map((player,i) => 
        <TouchableOpacity key={i} onPress={()=>goToSinglePlayer(player._id)} >
          <Text>{player.name}</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

export default PlayerList;

