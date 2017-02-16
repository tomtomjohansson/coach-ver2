// Dependencies
import React, {Component} from 'React';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {Actions as NavigationActions} from 'react-native-router-flux';
import {updateStat} from '../../actions/gameActions';
// Components
import AddStatList from './AddStatList';
import Button from '../../common/Button';
// Styles
import {objects} from '../../themes';

class AddStat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      selectedAss:[]
    };

    this.checkPlayer = this.checkPlayer.bind(this);
    this.checkPlayerAssist = this.checkPlayerAssist.bind(this);
    this.submitStat = this.submitStat.bind(this);
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
    newPlayer[stat]++;
    if (stat === 'goals') {
      newPlayer.shots++;
      newGame.shots[team]++;  
      const assPlayer = newGame.players.find(player => player._id === selectedAss[0]);
      assPlayer.assists++;
    }
    this.props.dispatch(updateStat(newGame));
    NavigationActions.pop();
  }
  render() {
    const {selected,selectedAss} = this.state;
    const {players,stat} = this.props;
    return (
      <View style={{flex:1}} >
      <AddStatList stat={stat} players={players} selected={selected} selectedAss={selectedAss} onPress={this.checkPlayer} onPressAss={this.checkPlayerAssist} />
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
  const players = game.players.filter( player => player.minutes.out === 90);
  return {
    game,
    players
  };
}

export default connect(mapStateToProps)(AddStat);
