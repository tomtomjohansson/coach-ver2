// Dependencies
import React, {Component} from 'React';
import {connect} from 'react-redux';
import {ScrollView,View,Alert,Platform} from 'react-native';
import {rootUrl,getHeaders} from '../../actions/ajaxConfig';
import autobind from 'autobind-decorator';
// Components
import TeamStats from './TeamStats';
import Button from '../../common/Button';
// Styles
import { objects } from '../../themes';
import {beginAjaxCall,ajaxCallError,ajaxCallDone} from '../../actions/ajaxActions';

@autobind
class TeamStatsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamStats: [{}]
    };
    this.active = 'all';
    this.initial = true;
  }
  componentDidMount() {
    this.setStats('all');
  }
  async setStats(venue) {
    if (this.active === venue && this.initial === false){
      return;
    }
    this.initial = false;
    this.props.dispatch(beginAjaxCall());
    const url = `${rootUrl}/api/teamStats/${venue}`;
    const headers = await getHeaders();
    const response = await fetch(url,{
      method: 'GET',
      headers
    });
    const json = await response.json();
    if (json.success) {
      if (json.team.length) {
        this.active = venue;
        this.setState({ teamStats: [ ...json.team, ...json.training ] });
      }
      if (Platform.OS === 'ios') {
        this.props.dispatch(ajaxCallDone());
      } else {
        setTimeout(()=>{
          this.props.dispatch(ajaxCallDone());
        },100);
      }     
    } else {
      this.props.dispatch(ajaxCallError());
      Alert.alert('Något gick fel', json.message);
    }
  }
  render() {
    const { teamStats } = this.state;
    const { club } = this.props;
    return (
      <View style={objects.screen.mainContainer}>
        <ScrollView style={[objects.screen.scrollViewContainer]}>
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
