// Dependencies
import React, { Component } from 'React';
import { connect } from 'react-redux';
import { Alert, View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { goToRoute } from '../../actions/routeActions';
import { saveEleven } from '../../actions/gameActions';
import autobind from 'autobind-decorator';
// Components
import UpdateDelete from '../../common/UpdateDelete';
import Player from './Player';
// Styles
import { objects } from '../../themes';

@autobind
class StartingElevenContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startingEleven: [ ...this.props.game.players ],
      imageSize: null,
      system: {
        name: '4-4-2',
        positions: ['GK','LCB','RCB','LB','RB','LCM','RCM','LM','RM','LST','RST']
      },
      shirtColor: '#A3132A',
      shortsColor: '#172347',
      modalVisible: false,
      pickingPosition: null
    };
  }
  componentWillMount() {
    if (this.props.route === 'SE') {
      return;
    } else {
      goToRoute(this.props.route,{id: this.props.id},false);
    }
  }
  removeAllFromEleven() {
    this.setState({ startingEleven: [] });
  }
  saveEleven() {
    const { startingEleven } = this.state;
    if (startingEleven.length < 11) {
      Alert.alert('För få spelare', `Du har bara tagit ut ${startingEleven.length} spelare.`);
    } else if (startingEleven.length > 11) {
      Alert.alert('För många spelare', `Du har tagit ut ${startingEleven.length - 11} spelare för mycket`);
    } else {
      this.props.dispatch(saveEleven(this.props.game, startingEleven)).then(this.handleAJAXresponse);
    }
  }
  handleAJAXresponse(response) {
    if (response.success) {
      goToRoute('PM',{},false);
    } else {
      Alert.alert('Något gick fel', response.message);
    }
  }
  getImageSize(e) {
    this.setState({
      imageSize: e.nativeEvent.layout
    });
  }
  pickPlayer(pos) {
    const { startingEleven } = this.state;
    const { players } = this.props;
    this.setState({
      pickingPosition: pos
    });
    goToRoute('addPlayerToEleven', { startingEleven, players, checkPlayer: this.checkPlayer }, false);
  }
  playerAdded(pos) {
    const { startingEleven } = this.state;
    let result = '';
    if (startingEleven.length > 0) {
      startingEleven.forEach((player) => {
        if (player.position === pos) {
          const shortName = player.name.split(' ');
          shortName[1] = shortName[1].substring(0, 1);
          result = shortName.join(' ');
        }
      });
    }
    return result;
  }
  getPlayers() {
    const { system, imageSize, shirtColor, shortsColor } = this.state;
    if (imageSize === null) {
      setTimeout(() => this.getPlayers(),100);
    } else {
      return (
        <View>
          {system.positions.map((pos,i) => {
            const name = this.playerAdded(pos);
            return <Player onPress={this.pickPlayer} key={i} name={name} position={pos} system={system.name} size={imageSize} shirtColor={shirtColor} shortsColor={shortsColor} />;
          })}
        </View>
      );
    }
  }
  checkPlayer(id) {
    Actions.pop();
    const { players } = this.props;
    const { startingEleven, pickingPosition } = this.state;
    const i = startingEleven.findIndex(o => o.position === pickingPosition);
    const currentPlayer = players.filter((player) => player._id === id);
    const newArr = (i + 1) ? [ ...startingEleven.slice(0, i), ...startingEleven.slice(i + 1), { _id: id, name: currentPlayer[0].name, position: pickingPosition } ] : [ ...startingEleven, { _id: id, name: currentPlayer[0].name, position: pickingPosition } ];
    this.setState({ startingEleven: newArr, pickingPosition: null });
  }
  render() {
      return (
        <Image source={require('../../images/field.png')} style={[objects.screen.field]} onLayout={(e) => this.getImageSize(e)}>
          {this.getPlayers()}
          <UpdateDelete
            updateText="Spara startelva"
            deleteText="Nollställ startelva"
            onDeleteAction={this.removeAllFromEleven}
            onUpdateAction={this.saveEleven}
          />
        </Image>
      );
  }
}

function mapStateToProps(state,ownProps) {
  const { players } = state;
  const game = state.games.find(g => g._id === ownProps.id);
  return {
    game,
    players
  };
}

export default connect(mapStateToProps)(StartingElevenContainer);
