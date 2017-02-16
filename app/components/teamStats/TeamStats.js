// Dependencies
import React from 'React';
import {View,Text} from 'react-native';
// Components
// Styles
import {objects,colors} from '../../themes';

export default function TeamStats({teamStats, club}) {
  const stats = teamStats[0];
  const exists = stats.hasOwnProperty('totalGoalsFor');
  return (
    <View>
      <View style={[objects.listitems.header, {flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-end'}]} >
        <Text style={[objects.listitems.headerText, {fontSize:16, flex:1}]} >{ club }</Text>
        <Text style={[objects.listitems.headerText, {flex:1}]} >Spelade matcher: { exists ? stats.count : 0 }</Text>
      </View>
      <View style={[objects.listitems.container, {justifyContent:'flex-start'}]} >
        <Text style={[objects.listitems.text, {flex:1, color:colors.grassy}]} >OFFENSIVT</Text>
        <Text style={[objects.listitems.text, {flex:1, color:colors.grassy} ]} >DEFENSIVT</Text>
      </View>
      <View style={[objects.listitems.container, objects.listitems.green, objects.listitems.narrow]} >
        <Text style={[objects.listitems.text, {flex:1}]} >Mål totalt: <Text style={{fontWeight:'400'}} >{ exists ? stats.totalGoalsFor : 0 }</Text></Text>
        <Text style={[objects.listitems.text, {flex:1} ]} >Insläppta totalt: <Text style={{fontWeight:'400'}} >{ exists ? stats.totalGoalsAgainst : 0 }</Text></Text>
      </View>
      <View style={[objects.listitems.container,objects.listitems.narrow]} >
        <Text style={[objects.listitems.text, {flex:1}]} >Mål i snitt: <Text style={{fontWeight:'400'}} >{ exists ? Math.round(stats.avgGoalsFor * 100) / 100 : 0 }</Text></Text>
        <Text style={[objects.listitems.text, {flex:1}]} >Insläppta i snitt: <Text style={{fontWeight:'400'}} >{ exists ? Math.round(stats.avgGoalsAgainst * 100) / 100 : 0 }</Text></Text>
      </View>
      <View style={[objects.listitems.container, objects.listitems.green, objects.listitems.narrow]} >
        <Text style={[objects.listitems.text, {flex:1}]} >Avslut i snitt: <Text style={{fontWeight:'400'}} >{ exists ? Math.round(stats.avgShotsFor * 100) / 100 : 0 }</Text></Text>
        <Text style={[objects.listitems.text, {flex:1}]} >Avslut mot i snitt: <Text style={{fontWeight:'400'}} >{ exists ? Math.round(stats.avgShotsAgainst * 100) / 100 : 0 }</Text></Text>
      </View>
      <View style={[objects.listitems.container, objects.listitems.narrow]} >
        <Text style={[objects.listitems.text, {flex:1}]} >Avslut i mål: <Text style={{fontWeight:'400'}} >{ exists ? Math.round(stats.shotConversionFor * 1000) / 10 : 0 }%</Text></Text>
        <Text style={[objects.listitems.text, {flex:1}]} >Avslut mot i mål: <Text style={{fontWeight:'400'}} >{ exists ? Math.round(stats.shotConversionAgainst * 1000) / 10 : 0 }%</Text></Text>
      </View>
      <View style={[objects.listitems.container, objects.listitems.green, objects.listitems.narrow]} >
        <Text style={[objects.listitems.text, {flex:1}]} >Hörnor i snitt: <Text style={{fontWeight:'400'}} >{ exists ? Math.round(stats.avgCornerFor * 100) / 100 : 0 }</Text></Text>
        <Text style={[objects.listitems.text, {flex:1}]} >Hörnor mot i snitt: <Text style={{fontWeight:'400'}} >{ exists ? Math.round(stats.avgCornerAgainst * 100) / 100 : 0 }</Text></Text>
      </View>
      <View style={[objects.listitems.container, {justifyContent:'flex-start',borderBottomWidth:0.5}]} >
        <Text style={[objects.listitems.text, {flex:1, color:colors.grassy}]} >DISCIPLIN</Text>
      </View>
      <View style={[objects.listitems.container, objects.listitems.green, objects.listitems.narrow]} >
        <Text style={[objects.listitems.text]} >Gula kort per match: <Text style={{fontWeight:'400'}} >{ exists ? Math.round(stats.avgYellowFor * 100) / 100 : 0 }</Text></Text>
      </View>
      <View style={[objects.listitems.container, objects.listitems.narrow, {borderBottomWidth:0}]} >
        <Text style={[objects.listitems.text]} >Röda kort per match: <Text style={{fontWeight:'400'}} >{ exists ? Math.round(stats.avgRedFor * 100) / 100 : 0 }</Text></Text>
      </View>
    </View>
  );
}

