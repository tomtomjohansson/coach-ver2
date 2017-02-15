// Dependencies
import React, {Component} from 'React';
import {View,Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Styles
import {objects,colors,metrics} from '../../themes';

function PlayerStats({player,playerStats}) {
  const stats = playerStats[0];
  const exists = Object.keys(stats).length !== 0
  return (
      <View>
        <View style={[objects.listitems.header, {flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}]} >
          <Text style={[objects.listitems.headerText, {fontSize:16, flex:1}]} >{ player.name.toUpperCase() }</Text>
          <View style={[objects.buttons.button,objects.buttons.cta,{marginBottom:0,flexDirection:'row'}]} >
            <Icon name="phone"
            size={metrics.icons.medium}
            style={[objects.listitems.icon,{color:colors.offWhite}]}
          />
          <Text style={{color:colors.offWhite,paddingRight:10}} >{player.phone}</Text>
          </View>
        </View>
        <View style={[objects.listitems.container, {justifyContent:'flex-start'}]} >
          <Text style={[objects.listitems.text, {flex:1, color:colors.grassy}]} >OFFENSIVT</Text>
        </View>
        <View style={[objects.listitems.container, objects.listitems.green, objects.listitems.narrow]} >
          <Text style={[objects.listitems.text, {flex:1}]} >Mål: <Text style={{fontWeight:'400'}} >{ exists ? stats.goals : 0 }</Text></Text>
          <Text style={[objects.listitems.text, {flex:1} ]} >Assist: <Text style={{fontWeight:'400'}} >{ exists ? stats.assists : 0 }</Text></Text>
        </View>
        <View style={[objects.listitems.container, objects.listitems.narrow]} >
          <Text style={[objects.listitems.text, {flex:1}]} >Avslut totalt: <Text style={{fontWeight:'400'}} >{ exists ? stats.shots : 0 }</Text></Text>
          <Text style={[objects.listitems.text, {flex:1} ]} >Avslut per match: <Text style={{fontWeight:'400'}} >{ exists ? Math.round(stats.shotsAvg * 100) / 100 : 0}</Text></Text>
        </View>
        <View style={[objects.listitems.container, objects.listitems.green, objects.listitems.narrow]} >
          <Text style={[objects.listitems.text, {flex:1}]} >Mål per match: <Text style={{fontWeight:'400'}} >{ exists ? Math.round(stats.goalsAvg * 100) / 100 : 0 }</Text></Text>
        </View>
        <View style={[objects.listitems.container, objects.listitems.narrow]} >
          <Text style={[objects.listitems.text, {flex:1}]} >Procent av avslut i mål: <Text style={{fontWeight:'400'}} >{ exists ? Math.round(stats.goalOnShotsAvg * 1000) / 10 : 0 }%</Text></Text>
        </View>
        <View style={[objects.listitems.container, objects.listitems.green, objects.listitems.narrow]} >
          <Text style={[objects.listitems.text, {flex:1}]} >Spelade minuter per mål: <Text style={{fontWeight:'400'}} >{ exists ? typeof stats.minutesPerGoal === 'number' ? Math.round(stats.minutesPerGoal * 100) / 100 : stats.minutesPerGoal : 0 }</Text></Text>
        </View>
        <View style={[objects.listitems.container, {justifyContent:'flex-start'}]} >
          <Text style={[objects.listitems.text, {flex:1, color:colors.grassy}]} >DISCIPLIN</Text>
        </View>
        <View style={[objects.listitems.container, objects.listitems.green, objects.listitems.narrow]} >
          <Text style={[objects.listitems.text, {flex:1}]} >Gula kort: <Text style={{fontWeight:'400'}} >{ exists ? stats.yellow : 0 }</Text></Text>
          <Text style={[objects.listitems.text, {flex:1}]} >Gula kort: <Text style={{fontWeight:'400'}} >{ exists ? stats.red : 0 }</Text></Text>
        </View>
        <View style={[objects.listitems.container, {justifyContent:'flex-start'}]} >
          <Text style={[objects.listitems.text, {flex:1, color:colors.grassy}]} >SPELTID</Text>
        </View>
        <View style={[objects.listitems.container, objects.listitems.green, objects.listitems.narrow]} >
          <Text style={[objects.listitems.text, {flex:1}]} >Spelade matcher: <Text style={{fontWeight:'400'}} >{ exists ? stats.games : 0 }</Text></Text>
          <Text style={[objects.listitems.text, {flex:1}]} >Spelade minuter: <Text style={{fontWeight:'400'}} >{ exists ? stats.totalMinutes : 0 }</Text></Text>
        </View>
        <View style={[objects.listitems.container, objects.listitems.narrow]} >
          <Text style={[objects.listitems.text, {flex:1}]} >Matcher från start: <Text style={{fontWeight:'400'}} >{ exists ? stats.gamesStarted : 0 }</Text></Text>
          <Text style={[objects.listitems.text, {flex:1}]} >Inhopp: <Text style={{fontWeight:'400'}} >{ exists ? stats.gamesAsSub : 0 }</Text></Text>
        </View>
        <View style={[objects.listitems.container, objects.listitems.green, objects.listitems.narrow]} >
          <Text style={[objects.listitems.text, {flex:1}]} >Minuter per spelad match: <Text style={{fontWeight:'400'}} >{ exists ? Math.round(stats.minutesPerGame * 100) / 100 : 0 }</Text></Text>
        </View>
      </View>
    );
}

export default PlayerStats;
