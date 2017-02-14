// Dependencies
import React from 'React';
import {View,Text,TouchableOpacity,ScrollView} from 'react-native';
// Components
import PlayerItem from '../../common/PlayerItem';
// Styles
import {objects,colors,metrics} from '../../themes';

export default function AddStatList({stat,players,selected,selectedAss,onPress,onPressAss}) {
  if(stat === "goals") {
    return (
    <ScrollView style={[objects.screen.scrollViewContainer, {marginBottom:10}]}>
      <View style={[objects.listitems.header]} >
        <Text style={[objects.listitems.headerText]} > MÅLSKYTT </Text>
      </View>
      {players.map((player,i) =>
        <PlayerItem key={i} index={i} player={player} onPress={onPress} checkArray={selected} />
      )}
      <View style={[objects.listitems.header]} >
        <Text style={[objects.listitems.headerText]} > ASSISTLÄGGARE </Text>
      </View>
      {players.map((player,i) =>
        <PlayerItem key={i} index={i} player={player} onPress={onPressAss} checkArray={selectedAss} />
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
    return "AVSLUTARE";
  } else if (stat === 'yellow') {
    return "VARNAD SPELARE";
  } else {
    return "UTVISAD SPELARE";
  }
}
