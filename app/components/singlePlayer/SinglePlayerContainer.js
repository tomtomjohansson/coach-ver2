// Dependencies
import React, {Component} from 'React';
import {Alert, View,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {deletePlayer} from '../../actions/playerActions';
import {goToRoute} from '../../actions/routeActions';
import {rootUrl,getHeaders} from '../../actions/ajaxConfig';
// Components
import PlayerStats from './PlayerStats';
import TrainingStats from './TrainingStats';
import UpdateDelete from '../../common/UpdateDelete.js'
import Button from '../../common/Button';
// Styles
import {objects} from '../../themes';

class SinglePlayerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerStats: [{}]
    }
    this.active = 'game';
    this.setStats = this.setStats.bind(this);
    this.deletePlayer = this.deletePlayer.bind(this);
    this.handleAJAXresponse = this.handleAJAXresponse.bind(this);
  }
  componentDidMount() {
    this.setStats('game');
  }
  async setStats(type) {
    this.active = type;
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
  deletePlayer() {
    this.props.dispatch(deletePlayer(this.props.player._id)).then(this.handleAJAXresponse);
  }
  handleAJAXresponse(response) {
    if (response.success) {
      goToRoute('players',{},true);
    } else {
      Alert.alert("Spelaren raderades inte", response.message);
    }
  }
  showGameOrTraining() {
    const {player} = this.props;
    const {playerStats} = this.state;
    if (this.active === 'game') {
      return (<PlayerStats player={player} playerStats={playerStats} />);
    } else {
      return (<TrainingStats player={player} stats={playerStats} />);
    }
  }
  render() {
    console.log(this.state.playerStats);
    return (
      <ScrollView style={[objects.screen.scrollViewContainer, {marginBottom:10}]}>
        {this.showGameOrTraining()}
        {/*<UpdateDelete
          updateText="Uppdatera spelare"
          deleteText="Radera spelare"
          onDeleteAction={this.deletePlayer} 
          onUpdateAction={this.deletePlayer} 
        />*/}
        <View style={[objects.screen.marginContainer,{flex:1, flexDirection: 'row', justifyContent: 'space-between'} ]} >
          <View style={{flex:1, marginRight: 10}} >
            <Button buttonType={this.active === 'game' ? 'active' : 'cta'} text="Matcher"  onPress={()=> this.setStats('game') } />
          </View>
          <View style={{flex:1}} >
            <Button buttonType={this.active === 'training' ? 'active' : 'cta'} text="Träningar" onPress={()=> this.setStats('training') } />
          </View>
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state,ownProps) { 
  const player = state.players.find(p => ownProps.id === p._id);
  return {
    player
  }
}

export default connect(mapStateToProps)(SinglePlayerContainer);
