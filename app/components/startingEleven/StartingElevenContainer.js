// Dependencies
import React, { Component } from 'React';
import { connect } from 'react-redux';
import { Alert, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { goToRoute } from '../../actions/routeActions';
import { saveEleven } from '../../actions/gameActions';
import Svg, { Path } from 'react-native-svg';
import autobind from 'autobind-decorator';
// Components
import UpdateDelete from '../../common/UpdateDelete';
import Player from './Player';
// Styles
import { objects, colors } from '../../themes';
// Temp
import formations from './formations';

@autobind
class StartingElevenContainer extends Component {
  constructor(props) {
    super(props);
    const i = formations.findIndex((formation) => formation.name === this.props.formation);
    this.state = {
      startingEleven: [ ...this.props.game.players ],
      imageSize: null,
      formation: formations[i],
      shirtColor: this.getTeamColors('primary'),
      shortsColor: this.getTeamColors('secondary'),
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
  render() {
      return (
        <Image source={require('../../images/field2.png')} style={[objects.screen.field]} onLayout={(e) => this.getImageSize(e)}>
          {this.getPlayers()}
          <UpdateDelete
            updateText={'\u2713'}
            deleteText={'\u2717'}
            onDeleteAction={this.removeAllFromEleven}
            onUpdateAction={this.saveEleven}
            roundButton
          />
          <View style={{backgroundColor:'maroon', position: 'absolute', top: 10, left: Dimensions.get('window').width / 2 - 25, borderRadius: 50}}>
            <TouchableOpacity onPress={() => console.log('BENCH CLICK')}>
              <Svg height="50" width="50">
                <Path
                  fill="#fff"
                  origin="6, 6"
                  scale="0.12"
                  d="M5.303,241.311c2.933,0,5.302-2.377,5.302-5.303v-23.167h25.554c1.802-1.361,3.881-2.272,5.784-2.382 c3.395-0.187,5.45-0.311,5.53-8.223H10.605V91.7h5.398c5.787,0.5,16.174,2.832,26.968,12.298 c12.106,10.62,25.834,31.612,32.713,72.644c3.907,0.539,8.176,1.808,11.457,4.179c-5.667-39.594-18.08-68.048-37.179-84.799 c-1.856-1.625-3.697-3.027-5.53-4.321h41.51c5.181,1.897,11.104,5.038,17.106,10.304c12.526,10.985,26.745,32.7,33.712,75.134 c1.931,0.431,3.865,1.046,5.675,1.896c-7.073-45.862-22.429-69.216-35.892-81.024c-2.889-2.532-5.758-4.585-8.57-6.315h83.407 c5.178,1.898,11.102,5.039,17.108,10.302c12.79,11.226,27.371,33.604,34.165,77.887c0.725-0.368,1.476-0.694,2.258-0.989v1.993 v2.02c-0.611,0.285-1.129,0.647-1.662,0.989c-4.023,2.558-5.96,6.747-5.598,14.354c0.662,13.919-2.978,15.581-8.948,15.907 c-3.945,0.218-11.081,7.12-3.526,10.604h-3.35h-2.471H201.9h-4.945h-7.125c29.298-5.882,15.7-23.151,15.7-33.466 c0-11.268-17.823-11.277-17.823-11.277c-13.852,1.646-20.619,4.312-19.956,18.231c0.662,13.919-2.978,15.581-8.948,15.907 c-3.951,0.218-11.081,7.12-3.526,10.604h-3.35h-2.473h-3.239c-0.01-0.491-0.01-1.015-0.026-1.512 c-0.813,0.533-1.675,1.041-2.615,1.512h-2.657h-2.292h-7.125c3.806-0.761,6.887-1.719,9.37-2.827 c2.146-0.958,3.855-2.024,5.181-3.185c8.961-7.823,1.155-19.635,1.155-27.454c0-3.511-1.729-5.924-4.109-7.591 c-1.69-1.181-3.702-1.974-5.662-2.517c-4.153-1.155-8.055-1.17-8.055-1.17c-13.852,1.646-20.617,4.312-19.954,18.231 c0.663,13.919-2.98,15.581-8.95,15.907c-3.951,0.218-11.081,7.12-3.526,10.604H93.6h-2.473h-0.551 c-0.005-0.352-0.005-0.729-0.016-1.082c-0.274-0.642-0.456-1.325-0.541-2.056c-1.352,1.165-2.926,2.217-4.777,3.144h-4.947h-0.36 H73.17c2.555-0.513,4.792-1.113,6.734-1.787c5.46-1.895,8.632-4.386,10.349-7.192c4.668-7.632-1.377-17.605-1.377-24.492 c0-1.471-0.313-2.739-0.844-3.848c-2.061-4.344-7.524-6.151-11.713-6.892c-2.952-0.523-5.274-0.533-5.274-0.533 c-13.852,1.646-20.617,4.313-19.954,18.231c0.07,1.486,0.07,2.761,0.042,3.978c-0.127,6.234-1.474,9.201-3.716,10.604 c-1.421,0.901-3.192,1.217-5.266,1.331c-5.292,0.295-16.322,12.577,9.926,12.577c1.432,0,3.037-0.057,4.696-0.129 c-0.365,0.549-0.608,1.17-0.658,1.869c-0.005,0.088-0.052,0.171-0.052,0.264c0,0.57,0.127,1.098,0.339,1.585 c0.616,1.408,2.009,2.392,3.638,2.392h20.016c0.005,1.119,0.054,2.149,0.054,3.283c0,2.926,2.369,5.303,5.302,5.303 c2.931,0,5.303-2.377,5.303-5.303c0-1.118-0.034-2.18-0.044-3.283h50.362c0.005,1.119,0.054,2.149,0.054,3.283 c0,1.466,1.186,2.651,2.651,2.651c1.463,0,2.651-1.186,2.651-2.651c0-1.134-0.044-2.17-0.054-3.283h88.575v3.283 c0,2.926,2.371,5.303,5.302,5.303c2.937,0,5.303-2.377,5.303-5.303v-6.772v-1.864v-1.88c15.327-2.227,21.033-7.032,22.587-12.65 h1.927h1.863h39.157c0.383,7.307,0.637,14.939,0.637,23.167c0,2.926,2.367,5.303,5.303,5.303s5.303-2.377,5.303-5.303 c0-69.169-13.712-116.27-40.758-139.988c-18.397-16.129-36.547-15.21-39.607-14.926H15.993c-2.814-0.189-4.803-0.073-5.641,0H0 V207.54v28.469C0,238.934,2.372,241.311,5.303,241.311z M245.516,178.413v-1.864V91.578c5.152,0.117,16.995,1.719,29.339,12.689 c14.266,12.688,30.82,39.959,35.496,97.97h-38.913h-1.9h-1.89c-0.933-3.945-2.217-7.768-2.217-10.931 c0-11.268-17.828-11.278-17.828-11.278c-0.74,0.088-1.383,0.197-2.087,0.29V178.413z M234.911,91.7v71.587 c-7.855-35.579-21.111-54.9-32.934-65.268c-2.889-2.532-5.758-4.585-8.564-6.314h41.498V91.7z"
                />
              </Svg>
            </TouchableOpacity>
          </View>
        </Image>
      );
  }
}

function mapStateToProps(state,ownProps) {
  const { players, user } = state;
  const { teamColors } = user;
  const formation = '4-4-2';
  const game = state.games.find(g => g._id === ownProps.id);
  return {
    game,
    players,
    teamColors,
    formation
  };
}

export default connect(mapStateToProps)(StartingElevenContainer);
