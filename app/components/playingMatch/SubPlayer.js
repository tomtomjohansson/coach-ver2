// Dependencies
import React, {Component} from 'React';
import {connect} from 'react-redux';
import {View,Alert} from 'react-native';
import {Actions as NavigationActions} from 'react-native-router-flux';
import {subPlayer} from '../../actions/gameActions';
import {createValidator,checkValidation} from '../../common/validation.js';
// Components
import Button from '../../common/Button';
import SubList from './SubList';
import Input from '../../common/Input';
// Styles
import {objects} from '../../themes';

class SubPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOut: [],
      selectedIn:[],
      minute: {},
      submitted: false
    };
    this.validators = {minute: false };
    this.checkSubOut = this.checkSubOut.bind(this);
    this.checkSubIn = this.checkSubIn.bind(this);
    this.makeSubstitution = this.makeSubstitution.bind(this);
    this.onChangeMinute = this.onChangeMinute.bind(this);
    this.createValidator = createValidator.bind(this);
    this.checkValidation = checkValidation.bind(this);
  }
  onChangeMinute(value) {
    this.createValidator('minute','number')(value);
  }
  checkSubOut(id) {
    this.setState({selectedOut:[id]});
  }
  checkSubIn(id) {
    this.setState({selectedIn:[id]});
  }
  closeModal() {
    NavigationActions.pop();
  }
  makeSubstitution() {
    this.setState({submitted: true});
    const {selectedOut,selectedIn,minute} = this.state;
    const {game} = this.props;
    if (this.checkValidation() && selectedOut.length && selectedIn.length) {
      const playerIn = this.props.bench.find( player => player._id === selectedIn[0]);
      this.props.dispatch(subPlayer(game,selectedOut[0],playerIn,minute.value)).then(this.handleAJAXResponse);
    }
  }
  handleAJAXResponse(response) {
    if (response.success) {
      NavigationActions.pop();
    } else {
      Alert.alert("Bytet genomfördes inte", response.message);
    }
  }
  render() {
    const {submitted,minute,selectedIn,selectedOut} = this.state;
    const {playing,bench} = this.props;
    return (
      <View style={[objects.screen.topContainer]} >
        <Input
          label="Minut för byte*"
          autoFocus
          autoCapitalize={'none'}
          onChangeText={this.onChangeMinute}
          error={minute.error}
          value={minute.value}
          submitted={submitted}
          maxLength={3}
          keyboardType="numeric"
        />
        <SubList playing={playing} bench={bench} selectedIn={selectedIn} selectedOut={selectedOut} onPressOut={this.checkSubOut} onPressIn={this.checkSubIn} />
        <View style={[objects.screen.marginContainer]}>
          <Button onPress={this.makeSubstitution} buttonType="cta" text="Genomför byte" />
          <Button onPress={this.closeModal} buttonType="alert" text="Avbryt" />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state,ownProps) {
  const game = state.games.find(g => g._id === ownProps.id);
  const playing = game.players.filter(player => player.minutes.out === 90);
  const bench = state.players.filter(player => {
    var onField = true;
    for (var p of game.players){
			if (player._id === p._id){
				onField = false;
			}
		}
    return onField;
  });
  return {
    game,
    playing,
    bench
  };
}

export default connect(mapStateToProps)(SubPlayer);
