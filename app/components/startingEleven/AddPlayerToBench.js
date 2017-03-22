import React from 'react';
import { ScrollView } from 'react-native';
import PlayerItem from '../../common/PlayerItem';
import { objects } from '../../themes';

function AddPlayerToBench ({ startingEleven, bench, players, checkBench }) {
  let playerList = [];
  players.forEach(function(e) {
    if (!bench.some(s => s._id === e._id) && !startingEleven.some(s => s._id === e._id)) {
      playerList.push(e);
    }
  });
  return (
    <ScrollView style={objects.screen.scrollViewContainer}>
      {playerList.map((player,i) => <PlayerItem key={i} index={i} player={player} onPress={checkBench} />)}
    </ScrollView>
  );
}

export default AddPlayerToBench;
