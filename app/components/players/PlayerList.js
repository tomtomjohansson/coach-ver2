// Dependencies
import React from 'React';
import {ScrollView} from 'react-native';
// Components
import PlayerItem from '../../common/PlayerItem';
// Styles
import {objects} from '../../themes';

function PlayerList({players,goToSinglePlayer}) {
  return (
    <ScrollView style={[objects.screen.topContainer]}>
      {players.map((player,i) => 
        <PlayerItem key={i} index={i} player={player} onPress={goToSinglePlayer}  />
      )}
    </ScrollView>
  );
}

export default PlayerList;

