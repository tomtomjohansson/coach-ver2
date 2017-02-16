// Dependencies
import React, {Component} from 'React';
import {connect} from 'react-redux';
import {ScrollView,View,Text,Alert} from 'react-native';
import {rootUrl,getHeaders} from '../../actions/ajaxConfig';
// Components
import TeamStats from './TeamStats';
import Button from '../../common/Button';
// Styles
import {objects} from '../../themes';

class TeamStatsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamStats: [{}]
    };
    this.active = 'all';
    this.setStats = this.setStats.bind(this);
  }
  componentDidMount() {
    this.setStats('all');
  }
  async setStats(venue) {
    this.active = venue;
    const url = `${rootUrl}/api/teamStats/${this.props.username}/${venue}`;
    const headers = await getHeaders();
    const response = await fetch(url,{
      method: 'GET',
      headers
    });
    const json = await response.json();
    if (json.success) {
      if (json.team.length) {
        this.setState({teamStats:json.team});
      }
    } else {
      Alert.alert('Något gick fel',json.message);
    }
  }
  render() {
    const {teamStats} = this.state;
    const {club} = this.props;
    return (
      <ScrollView style={[objects.screen.scrollViewContainer, {marginBottom:10}]}>
        <TeamStats teamStats={teamStats} club={club} />
        <View style={[objects.screen.marginContainer,{flex:1, flexDirection: 'row', justifyContent: 'space-between'} ]} >
          <View style={{flex:1, marginRight: 10}} >
            <Button buttonType={this.active === 'all' ? 'active' : 'cta'} text="Alla" onPress={()=> this.setStats('all') } />
          </View>
          <View style={{flex:1, marginRight: 10}} >
            <Button buttonType={this.active === 'home' ? 'active' : 'cta'} text="Hemma"  onPress={()=> this.setStats('home') } />
          </View>
          <View style={{flex:1}} >
            <Button buttonType={this.active === 'away' ? 'active' : 'cta'} text="Borta" onPress={()=> this.setStats('away') } />
          </View>
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  const username = state.user.username;
  const club = state.user.club;
  return {
    username,
    club
  };
}

export default connect(mapStateToProps)(TeamStatsContainer);
