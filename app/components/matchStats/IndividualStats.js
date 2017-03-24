// Dependencies
import React from 'React';
import {View,Text} from 'react-native';
// Styles
import {objects} from '../../themes';

export default function MatchStats({players,goals}) {
  return (
    <View>
      <View style={[objects.listitems.header, {flexDirection:'row',justifyContent:'center',alignItems:'flex-end'}]} >
        <Text style={[objects.listitems.headerText, {textAlign:'center',fontSize:16}]} >Individuell statistik:</Text>
      </View>
      <View style={[objects.listitems.container, {minHeight:56, height:undefined, paddingVertical:5, justifyContent:'flex-start'}]} >
        <Text style={[objects.listitems.text]} >Mål: <Text style={{fontWeight:'400'}} >{ getPlayersWithStat(players,'goals',goals) }</Text></Text>
      </View>
      <View style={[objects.listitems.container, {minHeight:56, height:undefined, paddingVertical:5, justifyContent:'flex-start'}]} >
        <Text style={[objects.listitems.text]} >Assist: <Text style={{fontWeight:'400'}} >{ getPlayersWithStat(players,'assists') }</Text></Text>
      </View>
      <View style={[objects.listitems.container, {minHeight:56, height:undefined, paddingVertical:5, justifyContent:'flex-start'}]} >
        <Text style={[objects.listitems.text]} >Avslut: <Text style={{fontWeight:'400'}} >{ getPlayersWithStat(players,'shots') }</Text></Text>
      </View>
      <View style={[objects.listitems.container, {minHeight:56, height:undefined, paddingVertical:5, justifyContent:'flex-start'}]} >
        <Text style={[objects.listitems.text]} >Gula kort: <Text style={{fontWeight:'400'}} >{ getPlayersWithStat(players,'yellow') }</Text></Text>
      </View>
      <View style={[objects.listitems.container, {minHeight:56, height:undefined, paddingVertical:5, justifyContent:'flex-start'}]} >
        <Text style={[objects.listitems.text]} >Röda kort: <Text style={{fontWeight:'400'}} >{ getPlayersWithStat(players,'red') }</Text></Text>
      </View>
      <View style={[objects.listitems.header, {flexDirection:'row',justifyContent:'center',alignItems:'flex-end'}]} >
        <Text style={[objects.listitems.headerText, {textAlign:'center',fontSize:16}]} >Speltid:</Text>
      </View>
      <View style={[objects.listitems.container, {minHeight:56, height:undefined, paddingVertical:5, justifyContent:'flex-start'}]} >
        <Text style={[objects.listitems.text]} >Startelva: <Text style={{fontWeight:'400'}} >{ getStartingEleven(players) }</Text></Text>
      </View>
      <View style={[objects.listitems.container, {minHeight:56, height:undefined, paddingVertical:5, justifyContent:'flex-start'}]} >
        <Text style={[objects.listitems.text]} >Inhoppare: <Text style={{fontWeight:'400'}} >{ getSubs(players) }</Text></Text>
      </View>
    </View>
  );
}

function checkForOwngoal(players,stat,goals) {
  if (stat === 'goals') {
    const goalCount = players.reduce((sum,player)=>{
      return sum + player[stat]
    },0);
    const ownGoals = goals - goalCount;
    if (ownGoals) {
      return ownGoals > 1 ? `Självmål ${ownGoals}` : 'Självmål';
    }
    return null;
  }
  return null;
}

function getPlayersWithStat(players,stat,goals) {
  const playersWithStat = players.filter(player => player[stat] > 0)
  .sort((a,b) => b[stat] -  a[stat])
  .map(player => player[stat] > 1 ? `${player.name} ${player[stat]}` : player.name)
  .concat(checkForOwngoal(players,stat,goals))
  .join(', ');
  return playersWithStat;
}

function getStartingEleven(players) {
  const startingEleven = players.filter(player => player.minutes.played[0] === 0)
    .map(player => {
      if (player.minutes.played.length === 2 && player.minutes.played[1] === 90 || player.minutes.played.length === 1) {
        return player.name;
      } else {
        return `${player.name} (${getSubTimesStarter(player.minutes.played)})`;
      }
    })
    .join(', ');
  return startingEleven;
}

function getSubs(players) {
  const subs = players.filter(player => player.minutes.played[0] !== 0)
    .map(player => {
      if (player.minutes.played.length) {
        return `${player.name} (${getSubTimesSub(player.minutes.played)})`;
      } else {
        return `${player.name}`;
      }
    })
    .join(', ');
  return subs;
}

function getSubTimesSub(subTimes) {
  if (subTimes.length === 2 && subTimes[1] === 90 || subTimes.length === 1) {
    return `in: ${subTimes[0]}`;
  } else if (subTimes.length >= 2 && subTimes[1] !== 90) {
    let arr = [];
    subTimes.forEach((time,i)=> {
      if (i % 2 === 0) {
        arr.push(`in: ${time}`);
      } else if (time !== 90) {
        arr.push(`ut: ${time}`);
      }
    });
    return arr.join(', ');
  } else {
    return;
  }
}

function getSubTimesStarter(subTimes) {
  if (subTimes.length === 2 && subTimes[1] !== 90) {
    return `ut: ${subTimes[1]}`;
  } else if (subTimes.length > 2) {
    let arr = [];
    subTimes.forEach((time,i)=> {
      if (i % 2 === 0 && i !== 0) {
        arr.push(`in: ${time}`);
      } else if ([0,90].indexOf(time) < 0) {
        arr.push(`ut: ${time}`);
      }
    });
    return arr.join(', ');
  } else {
    return;
  }
}
