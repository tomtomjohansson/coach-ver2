// Dependencies
import React, {Component} from 'React';
import { Alert, ScrollView, InteractionManager, View, Text } from 'react-native';
import {connect} from 'react-redux';
import {deletePlayer} from '../../actions/playerActions';
import {goToRoute} from '../../actions/routeActions';
import {rootUrl,getHeaders} from '../../actions/ajaxConfig';
import autobind from 'autobind-decorator';
// Components
import PlayerStats from './PlayerStats';
import TrainingStats from './TrainingStats';
import Button from '../../common/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Styles
import { objects, metrics, colors } from '../../themes';

@autobind
class SinglePlayerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerStats: [{}],
      teamStats: [{}],
      active: 'game'
    };
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setStats('game');
      this.setTeamStats('all');
    });
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.player) {
      goToRoute('players',{},true);
    }
  }
  async setStats(type) {
    if (this.state.active !== type) { this.setState({active: type}); }
    const url = `${rootUrl}/api/playerStats/${type}/${this.props.player._id}/`;
    const headers = await getHeaders();
    const response = await fetch(url,{
      method: 'GET',
      headers
    });
    const json = await response.json();
    if (json.success) {
      if (json.playerStats.length) {
        this.setState({playerStats:json.playerStats});
      }
    } else {
      Alert.alert('Något gick fel',json.message);
    }
  }
  async setTeamStats(venue) {
    const url = `${rootUrl}/api/teamStats/${venue}`;
    const headers = await getHeaders();
    const response = await fetch(url,{
      method: 'GET',
      headers
    });
    const json = await response.json();
    if (json.success) {
      if (json.team.length) {
        this.setState({ teamStats: json.team });
      }
    } else {
      Alert.alert('Något gick fel', json.message);
    }
  }
  deletePlayer() {
    this.props.dispatch(deletePlayer(this.props.player._id)).then(this.handleAJAXresponse);
  }
  handleAJAXresponse(response) {
    if (response.success) {
      goToRoute('players',{},true);
    } else {
      Alert.alert('Spelaren raderades inte', response.message);
    }
  }
  showGameOrTraining() {
    const { playerStats, teamStats, active } = this.state;
    if (active === 'game') {
      console.log('game');
      return <PlayerStats playerStats={playerStats} teamStats={teamStats} />;
    } else {
      console.log('training');
      return <TrainingStats stats={playerStats} />;
    }
  }
  render() {
    console.log('*** render triggered ***');
    const { player } = this.props;
    const { active } = this.state;
    const name = (player) ? player.name.toUpperCase() : null;
    const phone = (player) ? player.phone : null;
    return (
      <View style={objects.screen.mainContainer}>
        <ScrollView style={[objects.screen.mainContainer,{marginTop: 56,marginBottom: 60}]}>
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
          {this.showGameOrTraining()}
        </ScrollView>
        {/* Flytta detta till höger i router-headern?
        <UpdateDelete
          updateText="Uppdatera spelare"
          deleteText="Radera spelare"
          onDeleteAction={this.deletePlayer}
          onUpdateAction={() => Alert.alert('Funktionen finns ej', 'Kommer snart...')}
        />*/}
        <View style={[objects.screen.marginContainer,{flex:1, flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 0} ]} >
          <View style={{flex:1, marginRight: 10}} >
            <Button buttonType={active === 'game' ? 'active' : 'cta'} text="Matcher"  onPress={()=> this.setStats('game')} />
          </View>
          <View style={{flex:1}} >
            <Button buttonType={active === 'training' ? 'active' : 'cta'} text="Träningar" onPress={()=> this.setStats('training')} />
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state,ownProps) {
  const player = state.players.find(p => ownProps.id === p._id);
  return {
    player
  };
}

export default connect(mapStateToProps)(SinglePlayerContainer);
