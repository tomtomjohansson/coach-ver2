// Dependencies
import React from 'React';
import { View, Text, LayoutAnimation } from 'react-native';
import PlayerCard from '../../common/PlayerCard';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Styles
import {objects,colors,metrics} from '../../themes';

function PlayerStats({playerStats,teamStats}) {
  const stats = playerStats[0];
  const teamExists = teamStats[0].hasOwnProperty('avgGoalsFor');
  const exists = stats.hasOwnProperty('goalsAvg');
  const { avgShotsFor, totalGoalsFor } = teamStats[0];
  const { assists, games, gamesAsSub, gamesStarted, goalOnShotsAvg, goals, goalsAvg, minutesPerGame, minutesPerGoal, red, shots, shotsAvg, totalMinutes, yellow } = stats;
  if (exists && teamExists) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    return (
      <View style={{justifyContent: 'center'}}>
        <View style={{paddingBottom: 10}}>
          <Text style={[objects.listitems.text, {flex:1, color:colors.grassy,textAlign:'center', marginVertical: metrics.baseMargin}]} >TOTALT</Text>
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-around', marginBottom: metrics.baseMargin}}>
            <PlayerCard title="Mål" number={goals} total={totalGoalsFor} />
            <PlayerCard title="Assists" number={assists} total={totalGoalsFor} />
            <PlayerCard title="Avslut" number={shots} total={avgShotsFor * games} />
          </View>
          <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
            <PlayerCard title="Min per mål" number={minutesPerGoal} noBar />
            <PlayerCard title="Procent i mål" number={Math.round(goalOnShotsAvg * 1000) / 10} total="100" />
          </View>
        </View>
        <View style={{paddingBottom: 5, borderTopWidth: 1, borderTopColor: colors.darken, backgroundColor: colors.semiDarken}}>
          <Text style={[objects.listitems.text, {flex:1, color:colors.grassy,textAlign:'center', marginVertical: metrics.baseMargin}]} >PER MATCH</Text>
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-around'}}>
            <PlayerCard title="Mål" number={goalsAvg} noBar />
            <PlayerCard title="Assists" number={assists / games} noBar />
            <PlayerCard title="Avslut" number={shotsAvg} noBar />
          </View>
        </View>
        <View style={{paddingBottom: 10, borderTopWidth: 1, borderTopColor: colors.darken}}>
          <Text style={[objects.listitems.text, {flex:1, color:colors.grassy,textAlign:'center', marginVertical: metrics.baseMargin}]} >KORT</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', margin: metrics.baseMargin }}>
            <View style={{ flexDirection: 'row'}}>
                <Icon
                  name="book"
                  size={metrics.icons.xl}
                  style={[objects.listitems.icon,{ color: 'gold', paddingHorizontal: 0, paddingLeft: -10, paddingRight: 0 }]}
                />
                <Text style={{ fontSize: metrics.icons.large }}>{yellow}</Text>
            </View>
            <View style={{ flexDirection: 'row'}}>
                <Icon
                  name="book"
                  size={metrics.icons.xl}
                  style={[objects.listitems.icon,{ color: colors.danger }]}
                />
                <Text style={{ fontSize: metrics.icons.large }}>{red}</Text>
            </View>
          </View>
        </View>
        <View style={{paddingBottom: 5, borderTopWidth: 1, borderTopColor: colors.darken, backgroundColor: colors.semiDarken}}>
          <Text style={[objects.listitems.text, {flex:1, color:colors.grassy,textAlign:'center', marginVertical: metrics.baseMargin}]} >SPELTID</Text>
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-around'}}>
            <PlayerCard title="Spelade matcher" number={games} noBar />
            <PlayerCard title="Spelade minuter" number={totalMinutes} noBar />
            <PlayerCard title="Minuter per match" number={minutesPerGame} noBar />
          </View>
          <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
            <PlayerCard title="Matcher från start" number={gamesStarted} noBar />
            <PlayerCard title="Inhoppare" number={gamesAsSub} noBar />
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={{justifyContent: 'center'}}>
      <View style={{paddingBottom: 10}}>
        <Text style={[objects.listitems.text, {flex:1, color:colors.grassy,textAlign:'center', marginVertical: metrics.baseMargin}]} >TOTALT</Text>
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-around', marginBottom: metrics.baseMargin}}>
          <PlayerCard title="Mål" />
          <PlayerCard title="Assists" />
          <PlayerCard title="Avslut" />
        </View>
        <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
          <PlayerCard title="Min per mål" noBar />
          <PlayerCard title="Procent i mål" />
        </View>
      </View>
      <View style={{paddingBottom: 5, borderTopWidth: 1, borderTopColor: colors.darken, backgroundColor: colors.semiDarken}}>
        <Text style={[objects.listitems.text, {flex:1, color:colors.grassy,textAlign:'center', marginVertical: metrics.baseMargin}]} >PER MATCH</Text>
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-around'}}>
          <PlayerCard title="Mål" noBar />
          <PlayerCard title="Assists" noBar />
          <PlayerCard title="Avslut" noBar />
        </View>
      </View>
      <View style={{paddingBottom: 10, borderTopWidth: 1, borderTopColor: colors.darken}}>
        <Text style={[objects.listitems.text, {flex:1, color:colors.grassy,textAlign:'center', marginVertical: metrics.baseMargin}]} >KORT</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', margin: metrics.baseMargin }}>
          <View style={{ flexDirection: 'row'}}>
              <Icon
                name="book"
                size={metrics.icons.xl}
                style={[objects.listitems.icon,{ color: 'gold', paddingHorizontal: 0, paddingLeft: -10, paddingRight: 0 }]}
              />
              <Text style={{ fontSize: metrics.icons.large }}>0</Text>
          </View>
          <View style={{ flexDirection: 'row'}}>
              <Icon
                name="book"
                size={metrics.icons.xl}
                style={[objects.listitems.icon,{ color: colors.danger }]}
              />
              <Text style={{ fontSize: metrics.icons.large }}>0</Text>
          </View>
        </View>
      </View>
      <View style={{paddingBottom: 5, borderTopWidth: 1, borderTopColor: colors.darken, backgroundColor: colors.semiDarken}}>
        <Text style={[objects.listitems.text, {flex:1, color:colors.grassy,textAlign:'center', marginVertical: metrics.baseMargin}]} >SPELTID</Text>
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-around'}}>
          <PlayerCard title="Spelade matcher" noBar />
          <PlayerCard title="Spelade minuter" noBar />
          <PlayerCard title="Minuter per match" noBar />
        </View>
        <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
          <PlayerCard title="Matcher från start" noBar />
          <PlayerCard title="Inhoppare" noBar />
        </View>
      </View>
    </View>
  );
}

export default PlayerStats;
