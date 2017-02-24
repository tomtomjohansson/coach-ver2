// Dependencies
import React, {Component} from 'React';
import {connect} from 'react-redux';
import {Alert,ScrollView} from 'react-native';
import {goToRoute} from '../../actions/routeActions';
import {saveEleven} from '../../actions/gameActions';
import autobind from 'autobind-decorator';
// Components
import UpdateDelete from '../../common/UpdateDelete';
import PlayerItem from '../../common/PlayerItem';
// Styles
import {objects} from '../../themes';

@autobind
class StartingElevenContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startingEleven: [...this.props.game.players]
    };
  }
  componentWillMount() {
    if (this.props.route === 'SE') {
      return;
    } else {
      goToRoute(this.props.route,{id: this.props.id},false);
    }
  }
  checkPlayer(id) {
    const {startingEleven} = this.state;
    const i = startingEleven.indexOf(id);
    const newArr = (i + 1)  ? [...startingEleven.slice(0,i),...startingEleven.slice(i + 1)] : [...startingEleven,id];
    this.setState({ startingEleven: newArr });
  }
  removeAllFromEleven() {
    this.setState({startingEleven:[]});
  }
  saveEleven() {
    const getFullInfoOnEleven = this.props.players.filter(player => this.state.startingEleven.indexOf(player._id) >= 0 );
    if (getFullInfoOnEleven.length < 11) {
      Alert.alert('För få spelare', `Du har bara tagit ut ${getFullInfoOnEleven.length} spelare.`);
    } else if (getFullInfoOnEleven.length > 11) {
      Alert.alert('För många spelare', `Du har tagit ut ${getFullInfoOnEleven.length - 11} spelare för mycket`);
    } else {
      this.props.dispatch(saveEleven(this.props.game, getFullInfoOnEleven)).then(this.handleAJAXresponse);
    }
  }
  handleAJAXresponse(response) {
    if (response.success) {
      goToRoute('PM',{},false);
    } else {
      Alert.alert('Något gick fel', response.message);
    }
  }
  render() {
    const {players} = this.props;
    const {startingEleven} = this.state;
    return (
      <ScrollView style={[objects.screen.scrollViewContainer]}>
        <UpdateDelete
          updateText="Spara startelva"
          deleteText="Nollställ startelva"
          onDeleteAction={this.removeAllFromEleven}
          onUpdateAction={this.saveEleven}
        />
        {players.map((player,i) =>
          <PlayerItem key={i} index={i} player={player} onPress={this.checkPlayer} checkArray={startingEleven} />
        )}
      </ScrollView>
    );
  }
}

function mapStateToProps(state,ownProps) {
  const {players} = state;
  const game = state.games.find(g => g._id === ownProps.id);
  return {
    players,
    game
  };
}

export default connect(mapStateToProps)(StartingElevenContainer);
