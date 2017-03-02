import React from 'react';
import { ScrollView } from 'react-native';
import PlayerItem from '../../common/PlayerItem';
import { objects } from '../../themes';

function AddPlayerToEleven ({ startingEleven, players, checkPlayer }) {
  let playerList = [];
  players.forEach(function(e) {
      if (!startingEleven.some(s => s._id === e._id)) {
          playerList.push(e);
      }
  });
  return (
    <ScrollView style={objects.screen.scrollViewContainer}>
      {playerList.map((player,i) => <PlayerItem key={i} index={i} player={player} onPress={checkPlayer} />)}
    </ScrollView>
  );
}

export default AddPlayerToEleven;
