// Dependencies
import React from 'React';
import {View,Text} from 'react-native';
// Styles
import {objects} from '../../themes';

export default function MatchStats({game,club}) {
  return (
    <View>
      <View style={[objects.listitems.header, {flexDirection:'row',justifyContent:'center',alignItems:'flex-end'}]} >
        <Text style={[objects.listitems.headerText, {textAlign:'center',fontSize:16}]} >{ `${club} ${game.goals.for}-${game.goals.against} ${game.opponent}` }</Text>
      </View>
      <View style={[objects.listitems.container, {justifyContent:'center'}]} >
        <Text style={[objects.listitems.text]} >Avslut: <Text style={{fontWeight:'400'}} >{ `${game.shots.for}-${game.shots.against}` }</Text></Text>
      </View>
      <View style={[objects.listitems.container, {justifyContent:'center'}]} >
        <Text style={[objects.listitems.text]} >Hörnor: <Text style={{fontWeight:'400'}} >{ `${game.corners.for}-${game.corners.against}` }</Text></Text>
      </View>
      <View style={[objects.listitems.container, {justifyContent:'center'}]} >
        <Text style={[objects.listitems.text]} >Gula kort: <Text style={{fontWeight:'400'}} >{ `${game.yellow.for}-${game.yellow.against}` }</Text></Text>
      </View>
      <View style={[objects.listitems.container, {justifyContent:'center'}]} >
        <Text style={[objects.listitems.text]} >Röda kort: <Text style={{fontWeight:'400'}} >{ `${game.red.for}-${game.red.against}` }</Text></Text>
      </View>
    </View>
  );
}
