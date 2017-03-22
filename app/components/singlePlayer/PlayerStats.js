// Dependencies
import React from 'React';
import {View,Text} from 'react-native';
import PlayerCard from '../../common/PlayerCard';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Styles
import {objects,colors,metrics} from '../../themes';

function PlayerStats({player,playerStats,teamStats}) {
  const stats = playerStats[0];
  const teamExists = teamStats[0].hasOwnProperty('avgGoalsFor');
  const exists = stats.hasOwnProperty('goalsAvg');
  const name = (player) ? player.name.toUpperCase() : null;
  const phone = (player) ? player.phone : null;
  const { avgGoalsFor, avgShotsFor, totalGoalsFor, count, shotConversionFor } = teamStats[0];
  const { assists, games, gamesAsSub, gamesStarted, goalOnShotsAvg, goals, goalsAvg, minutesPerGame, minutesPerGoal, red, shots, shotsAvg, totalMinutes, yellow } = stats;
  if (exists && teamExists) {
    return (
      <View>
        <View style={[objects.listitems.header, {flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}]} >
          <Text style={[objects.listitems.headerText, {fontSize:16, flex:1}]} >{ name }</Text>
          <View style={[objects.buttons.button,objects.buttons.cta,{marginBottom:0,flexDirection:'row'}]} >
            <Icon name="phone"
            size={metrics.icons.medium}
            style={[objects.listitems.icon,{color:colors.offWhite}]}
          />
          <Text style={{color:colors.offWhite,paddingRight:10}} >{ phone }</Text>
          </View>
        </View>
        <View style={[objects.listitems.container, {justifyContent:'flex-start', marginBottom: metrics.baseMargin }]} >
          <Text style={[objects.listitems.text, {flex:1, color:colors.grassy}]} >OFFENSIVT</Text>
        </View>
        <Text style={[objects.listitems.text, {flex:1, color:colors.grassy,textAlign:'center', marginBottom: metrics.baseMargin}]} >TOTALT</Text>
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-around', marginBottom: metrics.baseMargin}}>
          <PlayerCard title="Mål" number={goals} total={totalGoalsFor} />
          <PlayerCard title="Assists" number={assists} total={totalGoalsFor} />
          <PlayerCard title="Avslut" number={shots} total={avgShotsFor * games} />
        </View>
        <Text style={[objects.listitems.text, {flex:1, color:colors.grassy,textAlign:'center', marginBottom: metrics.baseMargin}]} >PER MATCH</Text>
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-around'}}>
          <PlayerCard title="Mål" number={goalsAvg} total={avgGoalsFor} noBar />
          <PlayerCard title="Assists" number={assists / games} total={avgGoalsFor} noBar />
          <PlayerCard title="Avslut" number={shotsAvg} total={avgShotsFor} noBar />
        </View>
      </View>
    );
  }
  return <View />;
}

export default PlayerStats;
