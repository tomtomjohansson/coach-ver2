// Dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Alert, View} from 'react-native';
import {Actions as NavigationActions} from 'react-native-router-flux';
import {createValidator,checkValidation} from '../../common/validation.js';
import {addGame} from '../../actions/gameActions';
import autobind from 'autobind-decorator';
// Components
import Input from '../../common/Input';
import DateInput from '../../common/DateInput';
import Button from '../../common/Button';
import VenueChoice from './VenueChoice';
// Styles
import {objects} from '../../themes';

@autobind
class AddGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opponent: {},
      date: '',
      venue: 'Hemma',
      submitted: false
    };
    this.validators = {opponent: false};
    this.createValidator = createValidator.bind(this);
    this.checkValidation = checkValidation.bind(this);
  }
  componentWillMount(){
    const today = new Date();
    today.setHours(17,0,0);
    this.setState({date: today});
  }
  closeModal() {
    NavigationActions.pop();
  }
  onChangeOpponent(value) {
    this.createValidator('opponent','username')(value);
  }
  onChangeDate(value) {
    this.setState({date:value});
  }
  onChangeVenue(value) {
    this.setState({venue:value});
  }
  submitGame() {
    this.setState({submitted: true});
    if (this.checkValidation()) {
      const game = {
        opponent: this.state.opponent.value,
        date: this.state.date,
        venue: this.state.venue
      };
      this.props.dispatch(addGame(game)).then(this.handleAJAXResponse);
    }
  }
  handleAJAXResponse(response) {
    if (response.success) {
      NavigationActions.games();
    } else {
      Alert.alert('Matchen sparades inte', response.message);
    }
  }
  render() {
    const {opponent,date,venue,submitted} = this.state;
    return (
      <View style={[objects.screen.topContainer]} >
        <Input
          label="Motståndare*"
          autoFocus
          onChangeText={this.onChangeOpponent}
          error={opponent.error}
          value={opponent.value}
          submitted={submitted}
          maxLength={40}
        />
        <DateInput date={date} onChangeDate={this.onChangeDate} />
        <VenueChoice venue={venue} onChangeVenue={this.onChangeVenue} />
        <View style={[objects.screen.marginContainer]}>
          <Button onPress={this.submitGame} buttonType="cta" text="Lägg till match" />
          <Button onPress={this.closeModal} buttonType="alert" text="Avbryt" />
        </View>
      </View>
    );
  }
}

export default connect()(AddGame);
