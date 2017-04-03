// Dependencies
import React, {Component} from 'React';
import {connect} from 'react-redux';
import {View,Alert} from 'react-native';
import {Actions as NavigationActions} from 'react-native-router-flux';
import {subPlayer} from '../../actions/gameActions';
import {createValidator,checkValidation} from '../../common/validation.js';
import autobind from 'autobind-decorator';
// Components
import Button from '../../common/Button';
import SubList from './SubList';
import Input from '../../common/Input';
// Styles
import {objects} from '../../themes';

@autobind
class SubPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOut: [],
      selectedIn:[],
      minute: { value: this.props.minute } || {},
      submitted: false
    };
    this.validators = {minute: false };
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
    const { selectedOut, selectedIn, minute } = this.state;
    const { game } = this.props;
    if (this.checkValidation() && selectedOut.length && selectedIn.length) {
      this.props.dispatch(subPlayer(game,selectedOut[0],selectedIn[0],minute.value)).then(this.handleAJAXResponse);
    }
  }
  handleAJAXResponse(response) {
    if (response.success) {
      NavigationActions.pop();
    } else {
      Alert.alert('Bytet genomfördes inte', response.message);
    }
  }
  render() {
    const { submitted, minute, selectedIn, selectedOut } = this.state;
    const {playing, bench} = this.props;
    return (
      <View style={[objects.screen.topContainer]} >
        <Input
          label="Minut för byte*"
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
  const playing = [];
  const bench = [];
  game.players.filter(player => {
    if (player.minutes.played[player.minutes.played.length - 1] === 90 || player.minutes.played.length % 2 !== 0) {
      playing.push(player);
    } else {
      bench.push(player);
    }
  });
  const minute = ownProps.minute.toString();
  return {
    game,
    playing,
    bench,
    minute
  };
}

export default connect(mapStateToProps)(SubPlayer);
