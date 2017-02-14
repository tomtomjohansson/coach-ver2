// Dependencies
import React from 'React';
import {View,Text,TouchableOpacity,ScrollView} from 'react-native';
// Components
import PlayerItem from '../../common/PlayerItem';
// Styles
import {objects,colors,metrics} from '../../themes';

export default function TeamStats({teamStats}) {
  console.log(teamStats)
  return (
    <View>
      <View style={[objects.listitems.header, {flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end'}]} >
        <Text style={[objects.listitems.headerText, {fontSize:16}]} >{ teamStats.club }</Text>
        <Text style={[objects.listitems.headerText]} >Spelade matcher: { teamStats.count }</Text>
      </View>
      <View style={[objects.listitems.container, {justifyContent:'flex-start'}]} >
        <Text style={[objects.listitems.text]} >Mål totalt: <Text style={{fontWeight:'400'}} >{ teamStats.totalGoalsFor }</Text></Text>
      </View>
      <View style={[objects.listitems.container, {justifyContent:'flex-start'}]} >
        <Text style={[objects.listitems.text]} >Insläppta totalt: <Text style={{fontWeight:'400'}} >{ teamStats.totalGoalsAgainst }</Text></Text>
      </View>
      <View style={[objects.listitems.container, {justifyContent:'flex-start'}]} >
        <Text style={[objects.listitems.text]} >Mål i snitt: <Text style={{fontWeight:'400'}} >{ Math.round(teamStats.avgGoalsFor * 100) / 100 }</Text></Text>
      </View>
      <View style={[objects.listitems.container, {justifyContent:'flex-start'}]} >
        <Text style={[objects.listitems.text]} >Insläppta i snitt: <Text style={{fontWeight:'400'}} >{ Math.round(teamStats.avgGoalsAgainst * 100) / 100 }</Text></Text>
      </View>
      <View style={[objects.listitems.container, {justifyContent:'flex-start'}]} >
        <Text style={[objects.listitems.text]} >Avslut i snitt: <Text style={{fontWeight:'400'}} >{ Math.round(teamStats.avgShotsFor * 100) / 100 }</Text></Text>
      </View>
      <View style={[objects.listitems.container, {justifyContent:'flex-start'}]} >
        <Text style={[objects.listitems.text]} >Avslut mot i snitt: <Text style={{fontWeight:'400'}} >{ Math.round(teamStats.avgShotsAgainst * 100) / 100 }</Text></Text>
      </View>
      <View style={[objects.listitems.container, {justifyContent:'flex-start'}]} >
        <Text style={[objects.listitems.text]} >Avslut i mål: <Text style={{fontWeight:'400'}} >{ Math.round(teamStats.shotConversionFor * 1000) / 10 }%</Text></Text>
      </View>
      <View style={[objects.listitems.container, {justifyContent:'flex-start'}]} >
        <Text style={[objects.listitems.text]} >Avslut mot i mål: <Text style={{fontWeight:'400'}} >{ Math.round(teamStats.shotConversionAgainst * 1000) / 10 }%</Text></Text>
      </View>
      <View style={[objects.listitems.container, {justifyContent:'flex-start'}]} >
        <Text style={[objects.listitems.text]} >Hörnor i snitt: <Text style={{fontWeight:'400'}} >{ Math.round(teamStats.avgCornerFor * 100) / 100 }</Text></Text>
      </View>
      <View style={[objects.listitems.container, {justifyContent:'flex-start'}]} >
        <Text style={[objects.listitems.text]} >Hörnor mot i snitt: <Text style={{fontWeight:'400'}} >{ Math.round(teamStats.avgCornerAgainst * 100) / 100 }</Text></Text>
      </View>
      <View style={[objects.listitems.container, {justifyContent:'flex-start'}]} >
        <Text style={[objects.listitems.text]} >Gula kort per match: <Text style={{fontWeight:'400'}} >{ Math.round(teamStats.avgYellowFor * 100) / 100 }</Text></Text>
      </View>
      <View style={[objects.listitems.container, {justifyContent:'flex-start'}]} >
        <Text style={[objects.listitems.text]} >Röda kort per match: <Text style={{fontWeight:'400'}} >{ Math.round(teamStats.avgRedFor * 100) / 100 }</Text></Text>
      </View>
    </View>
  );
}
