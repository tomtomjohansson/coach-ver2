// Dependencies
import React from 'React';
import {View,Text,ScrollView} from 'react-native';
// Components
import PlayerItem from '../../common/PlayerItem';
// Styles
import {objects} from '../../themes';

export default function AddStatList({stat,players,selected,selectedAss,onPress,onPressAss}) {
  if (stat === 'goals') {
    return (
    <ScrollView style={[objects.screen.scrollViewContainer, {marginBottom:10}]}>
      <View style={[objects.listitems.header]} >
        <Text style={[objects.listitems.headerText]} > MÅLSKYTT </Text>
      </View>
      {players.map((player,i) => {
          if (i === 10) {
            return (
              <View key={i + 1}>
                <PlayerItem key={i} index={i} player={player} onPress={onPress} checkArray={selected} />
                <PlayerItem key="owngoal" index={i + 1} player={{_id:'owngoal', name: 'Självmål'}} onPress={onPress} checkArray={selected} />
              </View>
            );
          } else {
            return <PlayerItem key={i} index={i} player={player} onPress={onPress} checkArray={selected} />;
          }
        }
      )}
      <View style={[objects.listitems.header]} >
        <Text style={[objects.listitems.headerText]} > ASSISTLÄGGARE </Text>
      </View>
      {players.map((player,i) => {
        if (i === 10) {
            return (
              <View key={i + 1}>
                <PlayerItem key={i} index={i} player={player} onPress={onPressAss} checkArray={selectedAss} />
                <PlayerItem key="noAss" index={i + 1} player={{_id:'noAssist', name: 'Ingen Assist'}} onPress={onPressAss} checkArray={selectedAss} />
              </View>
            );
          } else {
            return <PlayerItem key={i} index={i} player={player} onPress={onPressAss} checkArray={selectedAss} />;
          }
        }
      )}
    </ScrollView>
  );
  } else {
    return (
      <ScrollView style={[objects.screen.scrollViewContainer, {marginBottom:10}]}>
        <View style={[objects.listitems.header]} >
          <Text style={[objects.listitems.headerText]} > { getType(stat) } </Text>
        </View>
        {players.map((player,i) =>
          <PlayerItem key={i} index={i} player={player} onPress={onPress} checkArray={selected} />
        )}
      </ScrollView>
    );
  }
}

function getType(stat) {
  if (stat === 'shots') {
    return 'AVSLUTARE';
  } else if (stat === 'yellow') {
    return 'VARNAD SPELARE';
  } else {
    return 'UTVISAD SPELARE';
  }
}
