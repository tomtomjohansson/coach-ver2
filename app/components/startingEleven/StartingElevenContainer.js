// Dependencies
import React, { Component } from 'React';
import { connect } from 'react-redux';
import { Alert, ScrollView, View, Image, Text } from 'react-native';
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
      startingEleven: [...this.props.game.players],
      imageSize: null,
      system: '4-4-2',
      shirtColor: '#A3132A',
      shortsColor: '#172347'
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
  getImageSize(e) {
    this.setState({
      imageSize: e.nativeEvent.layout
    });
  }
  getPlayers() {
    const { system, imageSize, shirtColor, shortsColor } = this.state;
    if (imageSize === null) {
      setTimeout(() => this.getPlayers(),100);
    } else {
      return (
        <View>
          <Player name="Jimmy" position="GK" system={system} size={imageSize} shirtColor={shirtColor} shortsColor={shortsColor} />
          <Player name="Anton" position="LCB" system={system} size={imageSize} shirtColor={shirtColor} shortsColor={shortsColor} />
          <Player name="Martin" position="RCB" system={system} size={imageSize} shirtColor={shirtColor} shortsColor={shortsColor} />
          <Player name="Johan" position="LB" system={system} size={imageSize} shirtColor={shirtColor} shortsColor={shortsColor} />
          <Player name="Shivan" position="RB" system={system} size={imageSize} shirtColor={shirtColor} shortsColor={shortsColor} />
          <Player name="Christian" position="LCM" system={system} size={imageSize} shirtColor={shirtColor} shortsColor={shortsColor} />
          <Player name="Magnus" position="RCM" system={system} size={imageSize} shirtColor={shirtColor} shortsColor={shortsColor} />
          <Player name="Linus" position="LM" system={system} size={imageSize} shirtColor={shirtColor} shortsColor={shortsColor} />
          <Player name="Olle" position="RM" system={system} size={imageSize} shirtColor={shirtColor} shortsColor={shortsColor} />
          <Player name="Markus" position="LST" system={system} size={imageSize} shirtColor={shirtColor} shortsColor={shortsColor} />
          <Player name="Andreas" position="RST" system={system} size={imageSize} shirtColor={shirtColor} shortsColor={shortsColor} />
        </View>
      );
    }
  }
  render() {
    const {players} = this.props;
    const {startingEleven} = this.state;
    return (
      <Image source={require('../../images/field.png')} style={[objects.screen.field]} onLayout={(e) => this.getImageSize(e) }>
        {this.getPlayers()}
      </Image>
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
