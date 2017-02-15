// Dependencies
import React from 'React';
import {View,Text,TouchableOpacity,ScrollView} from 'react-native';
// Components
import PlayerItem from '../../common/PlayerItem';
// Styles
import {objects,colors,metrics} from '../../themes';

export default function TeamStats({teamStats}) {
  return (
    <View>
      <View style={[objects.listitems.header, {flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-end'}]} >
        <Text style={[objects.listitems.headerText, {fontSize:16, flex:1}]} >{ teamStats.club }</Text>
        <Text style={[objects.listitems.headerText, {flex:1}]} >Spelade matcher: { teamStats.count }</Text>
      </View>
      <View style={[objects.listitems.container, {justifyContent:'flex-start'}]} >
        <Text style={[objects.listitems.text, {flex:1, color:colors.grassy}]} >OFFENSIVT</Text>
        <Text style={[objects.listitems.text, {flex:1, color:colors.grassy} ]} >DEFENSIVT</Text>
      </View>
      <View style={[objects.listitems.container, objects.listitems.green, objects.listitems.narrow]} >
        <Text style={[objects.listitems.text, {flex:1}]} >Mål totalt: <Text style={{fontWeight:'400'}} >{ teamStats.totalGoalsFor }</Text></Text>
        <Text style={[objects.listitems.text, {flex:1} ]} >Insläppta totalt: <Text style={{fontWeight:'400'}} >{ teamStats.totalGoalsAgainst }</Text></Text>
      </View>
      <View style={[objects.listitems.container,objects.listitems.narrow]} >
        <Text style={[objects.listitems.text, {flex:1}]} >Mål i snitt: <Text style={{fontWeight:'400'}} >{ Math.round(teamStats.avgGoalsFor * 100) / 100 }</Text></Text>
        <Text style={[objects.listitems.text, {flex:1}]} >Insläppta i snitt: <Text style={{fontWeight:'400'}} >{ Math.round(teamStats.avgGoalsAgainst * 100) / 100 }</Text></Text>
      </View>
      <View style={[objects.listitems.container, objects.listitems.green, objects.listitems.narrow]} >
        <Text style={[objects.listitems.text, {flex:1}]} >Avslut i snitt: <Text style={{fontWeight:'400'}} >{ Math.round(teamStats.avgShotsFor * 100) / 100 }</Text></Text>
        <Text style={[objects.listitems.text, {flex:1}]} >Avslut mot i snitt: <Text style={{fontWeight:'400'}} >{ Math.round(teamStats.avgShotsAgainst * 100) / 100 }</Text></Text>
      </View>
      <View style={[objects.listitems.container, objects.listitems.narrow]} >
        <Text style={[objects.listitems.text, {flex:1}]} >Avslut i mål: <Text style={{fontWeight:'400'}} >{ Math.round(teamStats.shotConversionFor * 1000) / 10 }%</Text></Text>
        <Text style={[objects.listitems.text, {flex:1}]} >Avslut mot i mål: <Text style={{fontWeight:'400'}} >{ Math.round(teamStats.shotConversionAgainst * 1000) / 10 }%</Text></Text>
      </View>
      <View style={[objects.listitems.container, objects.listitems.green, objects.listitems.narrow]} >
        <Text style={[objects.listitems.text, {flex:1}]} >Hörnor i snitt: <Text style={{fontWeight:'400'}} >{ Math.round(teamStats.avgCornerFor * 100) / 100 }</Text></Text>
        <Text style={[objects.listitems.text, {flex:1}]} >Hörnor mot i snitt: <Text style={{fontWeight:'400'}} >{ Math.round(teamStats.avgCornerAgainst * 100) / 100 }</Text></Text>
      </View>
      <View style={[objects.listitems.container, {justifyContent:'flex-start',borderBottomWidth:0.5}]} >
        <Text style={[objects.listitems.text, {flex:1, color:colors.grassy}]} >DISCIPLIN</Text>
      </View>
      <View style={[objects.listitems.container, objects.listitems.green, objects.listitems.narrow]} >
        <Text style={[objects.listitems.text]} >Gula kort per match: <Text style={{fontWeight:'400'}} >{ Math.round(teamStats.avgYellowFor * 100) / 100 }</Text></Text>
      </View>
      <View style={[objects.listitems.container, objects.listitems.narrow, {borderBottomWidth:0}]} >
        <Text style={[objects.listitems.text]} >Röda kort per match: <Text style={{fontWeight:'400'}} >{ Math.round(teamStats.avgRedFor * 100) / 100 }</Text></Text>
      </View>
    </View>
  );
}

