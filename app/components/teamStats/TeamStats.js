import React from 'React';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { objects, colors, metrics } from '../../themes';

export default function TeamStats({teamStats, club, size}) {
  const stats = teamStats[0];
  const exists = stats.hasOwnProperty('totalGoalsFor');
  console.log(stats);
  if (exists && size) {
    const { width } = size;
    const {
      totalGoalsFor, totalGoalsAgainst,
      shotConversionFor, shotConversionAgainst,
      avgCornerFor, avgCornerAgainst,
      avgGoalsFor, avgGoalsAgainst,
      avgYellowFor, avgRedFor,
      avgShotsFor, avgShotsAgainst
    } = stats;
    
    const cornersTotal = avgCornerFor + avgCornerAgainst;
    const cornerFor =  avgCornerFor / cornersTotal * 100;
    const cornerAgainst = avgCornerAgainst / cornersTotal * 100;
    
    const totalGoals = totalGoalsFor + totalGoalsAgainst;
    const goalsFor = totalGoalsFor / totalGoals * 100;
    const goalsAgainst = totalGoalsAgainst / totalGoals * 100;

    return (
      <View>

        <View style={objects.stats.header}>
          <Text style={[objects.listitems.headerText,objects.stats.leftText,{fontSize: 16}]}>{ club }</Text>
          <Text style={[objects.listitems.headerText,objects.stats.rightText]}>Spelade matcher: { exists ? stats.count : 0 }</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: metrics.baseMargin}}>
          <Text style={[objects.stats.leftText, objects.listitems.headerText, {fontSize: 14,color:colors.grassy}]} >OFFENSIVT</Text>
          <Text style={[objects.stats.rightText, objects.listitems.headerText, {fontSize: 14,color:colors.grassy} ]} >DEFENSIVT</Text>
        </View>

        <View>
          <Text style={objects.stats.barText}>{totalGoalsFor} ({avgGoalsFor.toFixed(1)} per match) - Mål totalt - {totalGoalsAgainst} ({avgGoalsAgainst.toFixed(1)} per match)</Text>
          <View style={[objects.stats.barContainer,{ width }]}>
            <View style={{ backgroundColor: colors.grassy, width: (goalsFor / 100) * width - metrics.marginHorizontal, height: 15, borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }}>
              <Text style={objects.stats.leftText}>{goalsFor.toFixed(1)}%</Text>
            </View>
            <View style={{ backgroundColor: colors.danger, width: (goalsAgainst / 100) * width - metrics.marginHorizontal, height: 15, borderTopRightRadius: 15, borderBottomRightRadius: 15 }}>
              <Text style={objects.stats.rightText}>{goalsAgainst.toFixed(1)}%</Text>
            </View>
          </View>
        </View>

        <View>
          <Text style={objects.stats.barText}>{avgShotsFor.toFixed(1)}% - Avslut i snitt - {avgShotsAgainst.toFixed(1)}%</Text>
          <View style={[objects.stats.barContainer,{ width }]}>
            <View style={{ backgroundColor: colors.grassy, width: ((avgShotsFor / (avgShotsFor + avgShotsAgainst) * 100) / 100) * width - metrics.marginHorizontal, height: 15, borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }}>
              <Text style={objects.stats.leftText}>{(avgShotsFor / (avgShotsFor + avgShotsAgainst) * 100).toFixed(1)}%</Text>
            </View>
            <View style={{ backgroundColor: colors.danger, width: ((avgShotsAgainst / (avgShotsFor + avgShotsAgainst) * 100) / 100) * width - metrics.marginHorizontal, height: 15, borderTopRightRadius: 15, borderBottomRightRadius: 15 }}>
              <Text style={objects.stats.rightText}>{(avgShotsAgainst / (avgShotsFor + avgShotsAgainst) * 100).toFixed(1)}%</Text>
            </View>
          </View>
        </View>

        <View>
          <Text style={objects.stats.barText}>{(shotConversionFor * 100).toFixed(1)}% - Avslut i mål - {(shotConversionAgainst * 100).toFixed(1)}%</Text>
          <View style={[objects.stats.barContainer,{ width }]}>
            <View style={{ backgroundColor: colors.grassy, width: ((shotConversionFor / (shotConversionFor + shotConversionAgainst) * 100) / 100) * width - metrics.marginHorizontal, height: 15, borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }}>
              <Text style={objects.stats.leftText}>{(shotConversionFor / (shotConversionFor + shotConversionAgainst) * 100).toFixed(1)}%</Text>
            </View>
            <View style={{ backgroundColor: colors.danger, width: ((shotConversionAgainst / (shotConversionFor + shotConversionAgainst) * 100) / 100) * width - metrics.marginHorizontal, height: 15, borderTopRightRadius: 15, borderBottomRightRadius: 15 }}>
              <Text style={objects.stats.rightText}>{(shotConversionAgainst / (shotConversionFor + shotConversionAgainst) * 100).toFixed(1)}%</Text>
            </View>
          </View>
        </View>

        <View>
          <Text style={objects.stats.barText}>{avgCornerFor.toFixed(1)} - Hörnor i snitt - {avgCornerAgainst.toFixed(1)}</Text>
          <View style={[objects.stats.barContainer,{ width }]}>
            <View style={{ backgroundColor: colors.grassy, width: (cornerFor / 100) * width - metrics.marginHorizontal, height: 15, borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }}>
              <Text style={objects.stats.leftText}>{cornerFor.toFixed(1)}%</Text>
            </View>
            <View style={{ backgroundColor: colors.danger, width: (cornerAgainst / 100) * width - metrics.marginHorizontal, height: 15, borderTopRightRadius: 15, borderBottomRightRadius: 15 }}>
              <Text style={objects.stats.rightText}>{cornerAgainst.toFixed(1)}%</Text>
            </View>
          </View>
        </View>

        {/*avgYellowFor avgRedFor (ikon - book)*/}
        <View style={{marginBottom: metrics.baseMargin}}>
          <Text style={[objects.stats.leftText, objects.listitems.headerText, {fontSize: 14,color:colors.grassy}]} >DISCIPLIN</Text>
        </View>

        <View>
          <Text style={[objects.stats.leftText,objects.stats.headerText,{fontSize: 14,color:colors.black}]}>
            <Icon
              name="book"
              size={metrics.icons.small}
              style={[objects.listitems.icon,{color:'gold'}]}
            />
            Gula kort per match: {avgYellowFor.toFixed(1)}
          </Text>
        </View>

        <View>
          <Text style={[objects.stats.leftText,objects.stats.headerText,{fontSize: 14,color:colors.black}]}>
            <Icon
              name="book"
              size={metrics.icons.small}
              style={[objects.listitems.icon,{color:colors.danger}]}
            />
            Röda kort per match: {avgRedFor.toFixed(1)}
          </Text>
        </View>

      </View>
    );
  } else {
    return (
      <View>
        <Text>Kunde inte ladda data.</Text>
      </View>
    );
  }
}

