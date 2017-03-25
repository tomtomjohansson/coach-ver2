// Dependencies
import React, {Component} from 'React';
import {connect} from 'react-redux';
import {ScrollView,View,Alert} from 'react-native';
import {rootUrl,getHeaders} from '../../actions/ajaxConfig';
import autobind from 'autobind-decorator';
// Components
import TeamStats from './TeamStats';
import Button from '../../common/Button';
import LoadingSpinner from '../../LoadingSpinner';
// Styles
import { objects } from '../../themes';

@autobind
class TeamStatsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamStats: [{}]
    };
    this.active = 'all';
  }
  componentDidMount() {
    this.setStats('all');
  }
  async setStats(venue) {
    this.active = venue;
    const url = `${rootUrl}/api/teamStats/${venue}`;
    const headers = await getHeaders();
    const response = await fetch(url,{
      method: 'GET',
      headers
    });
    const json = await response.json();
    if (json.success) {
      if (json.team.length) {
        this.setState({ teamStats: [ ...json.team, ...json.training ] });
      }
    } else {
      Alert.alert('Något gick fel', json.message);
    }
  }
  render() {
    const { teamStats } = this.state;
    const { club } = this.props;
    const loading = (!teamStats[0].hasOwnProperty('club'));
    return (
      <View style={objects.screen.mainContainer}>
        <LoadingSpinner loading={loading} />
        <ScrollView style={[objects.screen.mainContainer,{marginTop: 56,marginBottom: 60}]}>
          <TeamStats teamStats={teamStats} club={club} />
        </ScrollView>
        <View style={[objects.screen.marginContainer,{ flex:1, flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 0} ]} >
          <View style={{flex:1, marginRight: 10}} >
            <Button buttonType={this.active === 'all' ? 'active' : 'cta'} text="Alla" onPress={()=> this.setStats('all')} />
          </View>
          <View style={{flex:1, marginRight: 10}} >
            <Button buttonType={this.active === 'home' ? 'active' : 'cta'} text="Hemma"  onPress={()=> this.setStats('home')} />
          </View>
          <View style={{flex:1}} >
            <Button buttonType={this.active === 'away' ? 'active' : 'cta'} text="Borta" onPress={()=> this.setStats('away')} />
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { club } = state.user;
  return {
    club
  };
}

export default connect(mapStateToProps)(TeamStatsContainer);
