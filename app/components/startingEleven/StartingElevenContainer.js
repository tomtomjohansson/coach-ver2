// Dependencies
import React, { Component } from 'React';
import { connect } from 'react-redux';
import { Alert, View, Image, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { goToRoute } from '../../actions/routeActions';
import { saveEleven } from '../../actions/gameActions';
import autobind from 'autobind-decorator';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Components
import Button from '../../common/Button';
import UpdateDelete from '../../common/UpdateDelete';
import Player from './Player';
import Stats from './Stats';
// Styles
import { objects, colors, metrics } from '../../themes';
// Temp
import formations from './formations';

@autobind
class StartingElevenContainer extends Component {
  constructor(props) {
    super(props);
    const i = formations.findIndex((formation) => formation.name === this.props.formation);
    this.state = {
      startingEleven: [ ...this.props.startingEleven ] || [],
      bench: [ ...this.props.bench ],
      imageSize: null,
      formation: formations[i],
      shirtColor: this.getTeamColors('primary'),
      shortsColor: this.getTeamColors('secondary'),
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
  getTeamColors(color) {
    const { primary, secondary } = this.props.teamColors;
    if (color === 'primary' && primary[0] === '#') {
      return primary;
    } else if (color === 'secondary' && secondary[0] === '#') {
      return secondary;
    } else if (color === 'primary') {
      return colors[primary];
    } else if (color === 'secondary') {
      return colors[secondary];
    }
    return colors.black;
  }
  removeAllFromEleven() {
    this.setState({ startingEleven: [] });
  }
  saveEleven() {
    const { startingEleven, bench } = this.state;
    if (startingEleven.length < 11) {
      Alert.alert('För få spelare', `Du har bara tagit ut ${startingEleven.length} spelare.`);
    } else if (startingEleven.length > 11) {
      Alert.alert('För många spelare', `Du har tagit ut ${startingEleven.length - 11} spelare för mycket`);
    } else {
      this.props.dispatch(saveEleven(this.props.game, startingEleven, bench)).then(this.handleAJAXresponse);
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
    if (this.state.imageSize) { return; }
    this.setState({
      imageSize: e.nativeEvent.layout
    });
  }
  pickPlayer(pos) {
    const { startingEleven, bench } = this.state;
    const { players } = this.props;
    this.setState({
      pickingPosition: pos
    });
    if (pos === 'BENCH') {
      goToRoute('addPlayerToBench', { startingEleven, bench, players, checkBench: this.checkBench }, false);
    } else {
      goToRoute('addPlayerToEleven', { startingEleven, bench, players, checkPlayer: this.checkPlayer }, false);
    }
  }
  playerAdded(pos) {
    const { startingEleven } = this.state;
    let result = '';
    if (startingEleven.length > 0) {
      startingEleven.forEach((player) => {
        if (player.position === pos) {
          const shortName = player.name.split(' ');
          shortName[0] = shortName[0].substring(0, 1);
          result = shortName.join(' ');
        }
      });
    }
    return result;
  }
  getPlayers() {
    const { formation, imageSize, shirtColor, shortsColor } = this.state;
    if (imageSize === null) {
      setTimeout(() => this.getPlayers(),100);
    } else {
      const positions = formation.positions.map((pos,i) => {
        const name = this.playerAdded(pos.name);
        const shirt = (pos.name === 'GK') ? 'deeppink' : shirtColor;
        return <Player onPress={this.pickPlayer} key={i} name={name} position={pos.name} x={pos.x} y={pos.y} size={imageSize} shirtColor={shirt} shortsColor={shortsColor} style={{ width: 100, height: 50 }} />;
      });
      return positions;
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
  checkBench(id) {
    Actions.pop();
    const { players } = this.props;
    const { bench, pickingPosition } = this.state;
    const i = bench.findIndex(o => o._id === id);
    const currentPlayer = players.filter((player) => player._id === id);
    const newArr = (i + 1) ? [ ...bench.slice(0, i), ...bench.slice(i + 1), { _id: id, name: currentPlayer[0].name, position: pickingPosition } ] : [ ...bench, { _id: id, name: currentPlayer[0].name, position: pickingPosition } ];
    this.setState({ bench: newArr, pickingPosition: null });
  }
  updateFormation(newFormation) {
    const { startingEleven } = this.state;
    let playersMismatch = [];
    let positionsTaken = [];
    startingEleven.forEach((player) => {
      const playerHasPositionInNewFormation = newFormation.positions.findIndex(position => position.name === player.position);
      if (playerHasPositionInNewFormation === -1) {
        playersMismatch.push(player);
      } else {
        positionsTaken.push(player.position);
      }
    });
    const positionsFree = newFormation.positions.filter(pos => {
      if (positionsTaken.includes(pos.name)) {
        return false;
      }
      return pos;
    }).map(pos => pos.name);
    const updatedPlayers = playersMismatch.map((mismatch, i) => {
      return { ...mismatch, position: positionsFree[i] || 'BENCH' };
    });
    const newEleven = startingEleven.map(player => {
      const i = updatedPlayers.findIndex(updated => player._id === updated._id);
      if (i === -1) {
        return player;
      }
      return updatedPlayers[i];
    });
    this.setState({
      formation: newFormation,
      startingEleven: newEleven
    });
    Actions.pop();
  }
  changeFormation(currentFormation) {
    goToRoute('pickFormation', { formations, updateFormation: this.updateFormation }, false);
  }
  render() {
      return (
        <Image source={require('../../images/field2.png')} style={[objects.screen.field]} onLayout={(e) => this.getImageSize(e)}>
          {this.getPlayers()}
          <UpdateDelete
            updateText={<Icon name="check" size={metrics.icons.small} style={{ color: colors.snow }}/>}
            deleteText={<Icon name="close" size={metrics.icons.small} style={{ color: colors.snow }}/>}
            onDeleteAction={this.removeAllFromEleven}
            onUpdateAction={this.saveEleven}
            roundButton
          />
          <View style={{ position: 'absolute', top: 10, left: Dimensions.get('window').width / 2 - 25 }}>
            <Button
              text={<Icon name="weekend" size={metrics.icons.medium} style={{ color: colors.snow }}/>}
              onPress={() => this.pickPlayer('BENCH')}
              buttonType="benchRound"
            />
          </View>
          <Stats onButton={this.changeFormation} bench={this.state.bench} formation={this.state.formation.name} />
        </Image>
      );
  }
}

function mapStateToProps(state,ownProps) {
  const { players, user } = state;
  const { teamColors } = user;
  const formation = '4-4-2';
  const game = state.games.find(g => g._id === ownProps.id);
  const startingEleven = game.players.filter(p => p.position !== 'BENCH');
  const bench = game.players.filter(p => p.position === 'BENCH');
  return {
    game,
    players,
    teamColors,
    formation,
    startingEleven,
    bench
  };
}

export default connect(mapStateToProps)(StartingElevenContainer);
