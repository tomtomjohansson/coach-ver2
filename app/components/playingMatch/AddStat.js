// Dependencies
import React, {Component} from 'React';
import {connect} from 'react-redux';
import {View,Alert} from 'react-native';
import {Actions as NavigationActions} from 'react-native-router-flux';
import {updateStat} from '../../actions/gameActions';
import autobind from 'autobind-decorator';
// Components
import AddStatList from './AddStatList';
import Button from '../../common/Button';
// Styles
import {objects} from '../../themes';

@autobind
class AddStat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      selectedAss:[]
    };
  }
  checkPlayer(id) {
    this.setState({selected:[id]});
  }
  checkPlayerAssist(id) {
    this.setState({selectedAss:[id]});
  }
  closeModal() {
    NavigationActions.pop();
  }
  submitStat() {
    const {selected,selectedAss} = this.state;
    const {game,stat,team} = this.props;
    const newGame = JSON.parse(JSON.stringify(game));
    newGame[stat][team]++;
    const newPlayer = newGame.players.find(player => player._id === selected[0]);
    if (newPlayer) {
      newPlayer[stat]++;
    }
    if (stat === 'goals') {
      if (!selectedAss[0]) {
        Alert.alert('Oj då!','Du måste välja en assistläggare. Om ingen gjorde assist så välj alternativet "Ingen Assist".');
        return;
      }
      if (newPlayer) {
        newPlayer.shots++;
        newGame.shots[team]++;
      }
      if (selectedAss[0] !== 'noAssist') {
        const assPlayer = newGame.players.find(player => player._id === selectedAss[0]);
        assPlayer.assists++;
      }
      newGame.events.push({type:stat,team,player:selected[0],assPlayer:selectedAss});
    } else {
      newGame.events.push({type:stat,team,player:selected[0]});
    }
    this.props.dispatch(updateStat(newGame));
    NavigationActions.pop();
  }
  sortPlayers(players) {
    const fwdTypes = ['LW','RW','ST','RST','LST'];
    const midTypes = ['CM','RCM','LCM','CDM','RCDM','LCDM','LM','RM','CAM'];
    const backTypes = ['CB','RCB','LCB','LB','RB'];
    let attackers = [];
    let midfielders = [];
    let backs = [];
    let gk = [];
    players.forEach((player) => {
      if (fwdTypes.includes(player.position)) {
        attackers.push(player);
      } else if (midTypes.includes(player.position)) {
        midfielders.push(player);
      } else if (backTypes.includes(player.position)) {
        backs.push(player);
      } else {
        gk.push(player);
      }
    });
    return attackers.concat(midfielders, backs, gk);
  }
  render() {
    const {selected,selectedAss} = this.state;
    const {players,stat} = this.props;
    const sortedPlayers = this.sortPlayers(players);
    return (
      <View style={{flex:1}} >
        <AddStatList stat={stat} players={sortedPlayers} selected={selected} selectedAss={selectedAss} onPress={this.checkPlayer} onPressAss={this.checkPlayerAssist} />
        <View style={[objects.screen.marginContainer]}>
          <Button onPress={this.submitStat} buttonType="cta" text="Uppdatera matchen" />
          <Button onPress={this.closeModal} buttonType="alert" text="Avbryt" />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state,ownProps) {
  const game = state.games.find(g => g._id === ownProps.id);
  const players = game.players.filter( player => player.minutes.played[player.minutes.played.length - 1] === 90 || player.minutes.played.length % 2 !== 0);
  return {
    game,
    players
  };
}

export default connect(mapStateToProps)(AddStat);
