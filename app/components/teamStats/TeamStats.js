import React, { Component } from 'React';
import { View, Text, UIManager, LayoutAnimation, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { objects, colors, metrics } from '../../themes';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default class TeamStats extends Component {

  constructor(props) {
    super(props);
    this.state = {
      club: this.props.club || null,
      count: this.props.teamStats.count || 0
    };
  }

  renderDummy() {
    const width = Dimensions.get('window').width;
    return (
      <View>

        <View style={objects.stats.header}>
          <Text style={[objects.listitems.headerText,objects.stats.leftText,{fontSize: 16}]}>Klubb</Text>
          <Text style={[objects.listitems.headerText,objects.stats.rightText]}>Spelade matcher: </Text>
        </View>

        <View style={{backgroundColor: colors.semiDarken, paddingBottom: 5}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: metrics.baseMargin}}>
            <Text style={[objects.stats.leftText, objects.listitems.headerText, {fontSize: 14,color:colors.grassy}]} >VINST</Text>
            <Text style={[objects.stats.centerText, objects.listitems.headerText, {fontSize: 14,color:colors.neutralDark,marginLeft:20}]} >OAVGJORT</Text>
            <Text style={[objects.stats.rightText, objects.listitems.headerText, {fontSize: 14,color:colors.danger} ]} >FÖRLUST</Text>
          </View>

          <View>
            <View style={[objects.stats.barContainer,{ width }]}>
              <View style={[objects.stats.barFor, { width: width / 3 }]}>
                <Text style={objects.stats.leftText}/>
              </View>
              <View style={[objects.stats.barTies, { width: width / 3 }]}>
                <Text style={objects.stats.centerText}/>
              </View>
              <View style={[objects.stats.barAgainst, { width: width / 3 }]}>
                <Text style={objects.stats.rightText}/>
              </View>
            </View>
          </View>
        </View>

        <View style={{paddingBottom: 5, borderTopWidth: 1, borderTopColor: colors.darken}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: metrics.baseMargin}}>
            <Text style={[objects.stats.leftText, objects.listitems.headerText, {fontSize: 14,color:colors.grassy}]} >FÖR</Text>
            <Text style={[objects.stats.rightText, objects.listitems.headerText, {fontSize: 14,color:colors.danger} ]} >MOT</Text>
          </View>

          <View>
            <Text style={objects.stats.barText}>Mål totalt</Text>
            <View style={[objects.stats.barContainer,{ width }]}>
              <View style={[objects.stats.barFor, { width: width / 2 - metrics.baseMargin }]}>
                <Text style={objects.stats.leftText} />
              </View>
              <View style={[objects.stats.barAgainst, { width: width / 2 - metrics.baseMargin }]}>
                <Text style={objects.stats.rightText}/>
              </View>
            </View>
          </View>

          <View>
            <Text style={objects.stats.barText}>Mål i snitt</Text>
            <View style={[objects.stats.barContainer,{ width }]}>
              <View style={[objects.stats.barFor, { width: width / 2 - metrics.baseMargin }]}>
                <Text style={objects.stats.leftText}/>
              </View>
              <View style={[objects.stats.barAgainst, { width: width / 2 - metrics.baseMargin }]}>
                <Text style={objects.stats.rightText}/>
              </View>
            </View>
          </View>

          <View>
            <Text style={objects.stats.barText}>Avslut i snitt</Text>
            <View style={[objects.stats.barContainer,{ width }]}>
              <View style={[objects.stats.barFor, { width: width / 2 - metrics.baseMargin }]}>
                <Text style={objects.stats.leftText}/>
              </View>
              <View style={[objects.stats.barAgainst, { width: width / 2 - metrics.baseMargin }]}>
                <Text style={objects.stats.rightText}/>
              </View>
            </View>
          </View>

          <View>
            <Text style={objects.stats.barText}>Avslut i mål</Text>
            <View style={[objects.stats.barContainer,{ width }]}>
              <View style={[objects.stats.barFor, { width: width / 2 - metrics.baseMargin }]}>
                <Text style={objects.stats.leftText}/>
              </View>
              <View style={[objects.stats.barAgainst, { width: width / 2 - metrics.baseMargin }]}>
                <Text style={objects.stats.rightText}/>
              </View>
            </View>
          </View>

          <View>
            <Text style={objects.stats.barText}>Hörnor i snitt</Text>
            <View style={[objects.stats.barContainer,{ width }]}>
              <View style={[objects.stats.barFor, { width: width / 2 - metrics.baseMargin }]}>
                <Text style={objects.stats.leftText}/>
              </View>
              <View style={[objects.stats.barAgainst, { width: width / 2 - metrics.baseMargin }]}>
                <Text style={objects.stats.rightText}/>
              </View>
            </View>
          </View>
        </View>

        <View style={{backgroundColor: colors.semiDarken, paddingVertical: 10, borderTopWidth: 1, borderTopColor: colors.darken, borderBottomWidth: 1, borderBottomColor: colors.darken}}>
          <View style={{marginBottom: metrics.baseMargin}}>
            <Text style={[objects.stats.leftText, objects.listitems.headerText, {fontSize: 14,color:colors.grassy}]} >DISCIPLIN</Text>
          </View>

          <View>
            <Text style={objects.stats.barText}>Kort per match</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', margin: metrics.baseMargin }}>
            <View style={{ flexDirection: 'row'}}>
                <Icon
                  name="book"
                  size={metrics.icons.xl}
                  style={[objects.listitems.icon,{ color: 'gold', paddingHorizontal: 0, paddingLeft: -10, paddingRight: 0 }]}
                />
                <Text style={{ fontSize: metrics.icons.large }}/>
            </View>

            <View style={{ flexDirection: 'row'}}>
                <Icon
                  name="book"
                  size={metrics.icons.xl}
                  style={[objects.listitems.icon,{ color: colors.danger }]}
                />
                <Text style={{ fontSize: metrics.icons.large }}/>
            </View>
          </View>
        </View>

      </View>
    );
  }

  renderStats() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    const { teamStats } = this.props;
    const { club } = this.state;
    const { width } = Dimensions.get('window');
    const {
      totalGoalsFor, totalGoalsAgainst,
      shotConversionFor, shotConversionAgainst,
      avgCornerFor, avgCornerAgainst,
      avgGoalsFor, avgGoalsAgainst,
      avgYellowFor, avgRedFor,
      avgShotsFor, avgShotsAgainst,
      count
    } = teamStats;

    // temp results, awaiting backend
    let wins = 4,
        ties = 2,
        loss = 1;

    return (
      <View>

        <View style={objects.stats.header}>
          <Text style={[objects.listitems.headerText,objects.stats.leftText,{fontSize: 16}]}>{ club }</Text>
          <Text style={[objects.listitems.headerText,objects.stats.rightText]}>Spelade matcher: { count }</Text>
        </View>

        <View style={{backgroundColor: colors.semiDarken, paddingBottom: 5}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: metrics.baseMargin}}>
            <Text style={[objects.stats.leftText, objects.listitems.headerText, {fontSize: 14,color:colors.grassy}]} >VINST</Text>
            <Text style={[objects.stats.centerText, objects.listitems.headerText, {fontSize: 14,color:colors.neutralDark,marginLeft:20}]} >OAVGJORT</Text>
            <Text style={[objects.stats.rightText, objects.listitems.headerText, {fontSize: 14,color:colors.danger} ]} >FÖRLUST</Text>
          </View>

          <View>
            <View style={[objects.stats.barContainer,{ width }]}>
              <View style={[objects.stats.barFor, { width: (width) ? ((wins / (wins + ties + loss) * 100) / 100) * width - metrics.marginHorizontal : 0 }]}>
                <Text style={objects.stats.leftText}>{ wins > 0 ? wins : null }</Text>
              </View>
              <View style={[objects.stats.barTies, { width: ((ties / (wins + ties + loss) * 100) / 100) * width}]}>
                <Text style={objects.stats.centerText}>{ ties > 0 ? ties : null }</Text>
              </View>
              <View style={[objects.stats.barAgainst, { width: ((loss / (wins + ties + loss) * 100) / 100) * width - metrics.marginHorizontal }]}>
                <Text style={objects.stats.rightText}>{ loss > 0 ? loss : null }</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{paddingBottom: 5, borderTopWidth: 1, borderTopColor: colors.darken}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: metrics.baseMargin}}>
            <Text style={[objects.stats.leftText, objects.listitems.headerText, {fontSize: 14,color:colors.grassy}]} >FÖR</Text>
            <Text style={[objects.stats.rightText, objects.listitems.headerText, {fontSize: 14,color:colors.danger} ]} >MOT</Text>
          </View>

          <View>
            <Text style={objects.stats.barText}>Mål totalt</Text>
            <View style={[objects.stats.barContainer,{ width }]}>
              <View style={[objects.stats.barFor, (totalGoalsAgainst === 0) ? objects.stats.showFor : null, { width: (totalGoalsAgainst !== 0) ? ((totalGoalsFor / (totalGoalsFor + totalGoalsAgainst) * 100) / 100) * width - metrics.marginHorizontal : width - (metrics.marginHorizontal * 2) }, (totalGoalsFor === 0) ? objects.stats.hide : null ]}>
                <Text style={objects.stats.leftText}>{ totalGoalsFor > 0 ? totalGoalsFor : null }</Text>
              </View>
              <View style={[objects.stats.barAgainst, (totalGoalsFor === 0) ? objects.stats.showAgainst : null, { width: (totalGoalsFor !== 0) ? ((totalGoalsAgainst / (totalGoalsFor + totalGoalsAgainst) * 100) / 100) * width - metrics.marginHorizontal : width - (metrics.marginHorizontal * 2) }, (totalGoalsAgainst === 0) ? objects.stats.hide : null ]}>
                <Text style={objects.stats.rightText}>{ totalGoalsAgainst > 0 ? totalGoalsAgainst : null }</Text>
              </View>
            </View>
          </View>

          <View>
            <Text style={objects.stats.barText}>Mål i snitt</Text>
            <View style={[objects.stats.barContainer,{ width }]}>
              <View style={[objects.stats.barFor, (avgGoalsAgainst === 0) ? objects.stats.showFor : null, { width: (avgGoalsAgainst !== 0) ? ((avgGoalsFor / (avgGoalsFor + avgGoalsAgainst) * 100) / 100) * width - metrics.marginHorizontal : width - (metrics.marginHorizontal * 2) }, (avgGoalsFor === 0) ? objects.stats.hide : null ]}>
                <Text style={objects.stats.leftText}>{ avgGoalsFor > 0 ? Math.round(avgGoalsFor * 100) / 100 : null }</Text>
              </View>
              <View style={[objects.stats.barAgainst, (avgGoalsFor === 0) ? objects.stats.showAgainst : null, { width: (avgGoalsFor !== 0) ? ((avgGoalsAgainst / (avgGoalsFor + avgGoalsAgainst) * 100) / 100) * width - metrics.marginHorizontal : width - (metrics.marginHorizontal * 2) }, (avgGoalsAgainst === 0) ? objects.stats.hide : null ]}>
                <Text style={objects.stats.rightText}>{ avgGoalsAgainst > 0 ? Math.round(avgGoalsAgainst * 100) / 100 : null }</Text>
              </View>
            </View>
          </View>

          <View>
            <Text style={objects.stats.barText}>Avslut i snitt</Text>
            <View style={[objects.stats.barContainer,{ width }]}>
              <View style={[objects.stats.barFor, (avgShotsAgainst === 0) ? objects.stats.showFor : null, { width: (avgShotsAgainst !== 0) ? ((avgShotsFor / (avgShotsFor + avgShotsAgainst) * 100) / 100) * width - metrics.marginHorizontal : width - (metrics.marginHorizontal * 2) }, (avgShotsFor === 0) ? objects.stats.hide : null ]}>
                <Text style={objects.stats.leftText}>{ avgShotsFor > 0 ? Math.round(avgShotsFor * 100) / 100 : null }</Text>
              </View>
              <View style={[objects.stats.barAgainst, (avgShotsFor === 0) ? objects.stats.showAgainst : null, { width: (avgShotsFor !== 0) ? ((avgShotsAgainst / (avgShotsFor + avgShotsAgainst) * 100) / 100) * width - metrics.marginHorizontal : width - (metrics.marginHorizontal * 2) }, (avgShotsAgainst === 0) ? objects.stats.hide : null ]}>
                <Text style={objects.stats.rightText}>{ avgShotsAgainst > 0 ? Math.round(avgShotsAgainst * 100) / 100 : null }</Text>
              </View>
            </View>
          </View>

          <View>
            <Text style={objects.stats.barText}>Avslut i mål</Text>
            <View style={[objects.stats.barContainer,{ width }]}>
              <View style={[objects.stats.barFor, (shotConversionAgainst === 0) ? objects.stats.showFor : null, { width: (shotConversionAgainst !== 0) ? ((shotConversionFor / (shotConversionFor + shotConversionAgainst) * 100) / 100) * width - metrics.marginHorizontal : width - (metrics.marginHorizontal * 2) }, (shotConversionFor === 0) ? objects.stats.hide : null ]}>
                <Text style={objects.stats.leftText}>{ shotConversionFor > 0 ? `${Math.round(shotConversionFor * 1000) / 10}%` : null }</Text>
              </View>
              <View style={[objects.stats.barAgainst, (shotConversionFor === 0) ? objects.stats.showAgainst : null, { width: (shotConversionFor !== 0) ? ((shotConversionAgainst / (shotConversionFor + shotConversionAgainst) * 100) / 100) * width - metrics.marginHorizontal : width - (metrics.marginHorizontal * 2) }, (shotConversionAgainst === 0) ? objects.stats.hide : null ]}>
                <Text style={objects.stats.rightText}>{ shotConversionAgainst > 0 ? `${Math.round(shotConversionAgainst * 1000) / 10}%` : null }</Text>
              </View>
            </View>
          </View>

          <View>
            <Text style={objects.stats.barText}>Hörnor i snitt</Text>
            <View style={[objects.stats.barContainer,{ width }]}>
              <View style={[objects.stats.barFor, (avgCornerAgainst === 0) ? objects.stats.showFor : null, { width: (avgCornerAgainst !== 0) ? ((avgCornerFor / (avgCornerFor + avgCornerAgainst) * 100) / 100) * width - metrics.marginHorizontal : width - (metrics.marginHorizontal * 2) }, (avgCornerFor === 0) ? objects.stats.hide : null ]}>
                <Text style={objects.stats.leftText}>{ avgCornerFor > 0 ? Math.round(avgCornerFor * 100) / 100 : null }</Text>
              </View>
              <View style={[objects.stats.barAgainst, (avgCornerFor === 0) ? objects.stats.showAgainst : null, { width: (avgCornerFor !== 0) ? ((avgCornerAgainst / (avgCornerFor + avgCornerAgainst) * 100) / 100) * width - metrics.marginHorizontal : width - (metrics.marginHorizontal * 2) }, (avgCornerAgainst === 0) ? objects.stats.hide : null ]}>
                <Text style={objects.stats.rightText}>{ avgCornerAgainst > 0 ? Math.round(avgCornerAgainst * 100) / 100 : null }</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{backgroundColor: colors.semiDarken, paddingVertical: 10, borderTopWidth: 1, borderTopColor: colors.darken, borderBottomWidth: 1, borderBottomColor: colors.darken}}>
          <View style={{marginBottom: metrics.baseMargin}}>
            <Text style={[objects.stats.leftText, objects.listitems.headerText, {fontSize: 14,color:colors.grassy}]} >DISCIPLIN</Text>
          </View>

          <View>
            <Text style={objects.stats.barText}>Kort per match</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', margin: metrics.baseMargin }}>
            <View style={{ flexDirection: 'row'}}>
                <Icon
                  name="book"
                  size={metrics.icons.xl}
                  style={[objects.listitems.icon,{ color: 'gold', paddingHorizontal: 0, paddingLeft: -10, paddingRight: 0 }]}
                />
                <Text style={{ fontSize: metrics.icons.large }}>{Math.round(avgYellowFor)}</Text>
            </View>

            <View style={{ flexDirection: 'row'}}>
                <Icon
                  name="book"
                  size={metrics.icons.xl}
                  style={[objects.listitems.icon,{ color: colors.danger }]}
                />
                <Text style={{ fontSize: metrics.icons.large }}>{Math.round(avgRedFor)}</Text>
            </View>
          </View>
        </View>

      </View>
    );
  }

  render() {
    const { teamStats } = this.props;
    const exists = teamStats.hasOwnProperty('totalGoalsFor');
    return (exists) ? this.renderStats() : this.renderDummy();
  }

}
