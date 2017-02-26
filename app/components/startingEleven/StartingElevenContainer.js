// Dependencies
import React, { Component } from 'React';
import { connect } from 'react-redux';
import { Alert, View, Image, Modal, ScrollView } from 'react-native';
import { goToRoute } from '../../actions/routeActions';
import { saveEleven } from '../../actions/gameActions';
import autobind from 'autobind-decorator';
// Components
import UpdateDelete from '../../common/UpdateDelete';
import PlayerItem from '../../common/PlayerItem';
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
  checkPlayer(id) {
    const { startingEleven } = this.state;
    const { players } = this.props;
    const position = this.state.pickingPosition;
    const i = startingEleven.indexOf(id);
    const currentPlayer = players.filter((player) => player._id === id);
    const newArr = (i + 1)  ? [ ...startingEleven.slice(0, i), ...startingEleven.slice(i + 1)] : [ ...startingEleven, { id, name: currentPlayer[0].name, position } ];
    this.setState({ startingEleven: newArr, modalVisible: false, pickingPosition: null });
  }
  removeAllFromEleven() {
    this.setState({ startingEleven: [] });
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
  getImageSize(e) {
    this.setState({
      imageSize: e.nativeEvent.layout
    });
  }
  pickPlayer(pos) {
    this.setState({
      modalVisible: true,
      pickingPosition: pos
    });
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
  render() {
    const { players } = this.props;
    const { startingEleven } = this.state;
    let playerList = [];
    players.forEach(function(e) {
        if (!startingEleven.some(s => s.name === e.name)) {
            playerList.push(e);
        }
    });
    if (this.state.modalVisible) {
      return (
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => console.log('modal closed')}
        >
          <ScrollView style={{ flex: 1 }}>
            {playerList.map((player,i) => <PlayerItem key={i} index={i} player={player} onPress={this.checkPlayer} />)}
          </ScrollView>
        </Modal>
      );
    } else {
      return (
        <Image source={require('../../images/field.png')} style={[objects.screen.field]} onLayout={(e) => this.getImageSize(e) }>
          {this.getPlayers()}
        </Image>
      );
    }
  }
}

function mapStateToProps(state,ownProps) {
  const { players } = state;
  const game = state.games.find(g => g._id === ownProps.id);
  return {
    players,
    game
  };
}

export default connect(mapStateToProps)(StartingElevenContainer);
