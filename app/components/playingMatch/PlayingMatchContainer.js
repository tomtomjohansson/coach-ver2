// Dependencies
import React, {Component} from 'React';
import {connect} from 'react-redux';
import {View,ScrollView,Alert} from 'react-native';
import moment from 'moment';
import {goToRoute} from '../../actions/routeActions';
import {updateStat,saveGameAsFinished} from '../../actions/gameActions';
import autobind from 'autobind-decorator';
// Components
import StatItem from './StatItem';
import Button from '../../common/Button';
import Timer from './Timer';
// Styles
import {objects} from '../../themes';

@autobind
class PlayingMatchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerRunning: false,
      startTime: null,
      buttonText: 'Starta',
      buttonText2: 'Halvlek',
      start: { minute: 0, second: 0 },
      btn2Disabled: false
    };
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  submitStat(team,stat) {
    if (!this.checkIfMatchEnded()){
    if ( team === 'for' && (stat !== 'corners') ) {
      goToRoute('addStatModal',{id: this.props.id,stat,team},false);
    } else {
      const newGame = JSON.parse(JSON.stringify(this.props.game));
      newGame.events.push({type:stat,team});
      newGame[stat][team]++;
      if (stat === 'goals') {
        newGame.shots[team]++;
        newGame.events.push({type:'shots',team});
      }
      this.props.dispatch(updateStat(newGame));
    }
    }
  }
  saveGameAsFinished() {
    if (!this.checkIfMatchEnded()) {
      this.props.dispatch(saveGameAsFinished(this.props.game)).then(this.handleAJAXresponse);
    }
  }
  handleAJAXresponse(response) {
    if (response.success) {
      goToRoute('MS',{},false);
    } else {
      Alert.alert('Något gick fel', response.message);
    }
  }
  subPlayer() {
    if (!this.checkIfMatchEnded()) {
      goToRoute('subPlayerModal',{ id: this.props.id, minute: this.calculateTime().substring(0, 2) || 0 },false);
    }
  }
  checkIfMatchEnded() {
     if (this.props.game.ended) {
      Alert.alert('Matchen är över!','Du har redan sparat matchen som avslutad.');
      return true;
    } else {
      return false;
    }
  }
  handleStartStop() {
    const { timerRunning } = this.state;

    if (timerRunning) {
      Alert.alert('', 'Är du säker att du vill återställa timern?', [
        {
          text: 'Återställ', onPress: () => {
            clearInterval(this.interval);
            this.setState({
              start: { minute: 0, second: 0 },
              buttonText: 'Starta',
              startTime: null,
              btn2Disabled: false,
              timerRunning: false
            });
          }
        },
        {
          text: 'Avbryt'
        }
      ]);
      return;
    }

    this.setState({
      timerRunning: true,
      buttonText: 'Återställ',
      startTime: moment()
    });

    this.interval = setInterval(() => {
      this.setState({
        timerRunning: true
      });
    }, 1000);

  }
  halftime() {
    clearInterval(this.interval);
    let { startTime } = this.state;
    if (!startTime) { startTime = moment(); }
    this.setState({
      buttonText: 'Starta',
      start: { minute: 45, second: 0 },
      startTime: moment(),
      timerRunning: false,
      btn2Disabled: true
    });
  }
  calculateTime() {
    const { start, startTime } = this.state;
    const diff = moment().diff(startTime); // ökar med 1 för varje sekund som går från att man startar
    const minus = moment(startTime).diff(start); // skillnaden mellan 00:00/45:00 och startTime, i sekunder
    const min = moment(startTime).add(diff).subtract(minus).format('HH:mm');
    const minutes = moment.duration(min).asMinutes().toString();
    const seconds = moment(startTime).add(diff).subtract(minus).format('ss');
    const newTime = (startTime) ? `${(minutes.length === 1) ? `0${minutes}` : minutes }:${seconds}` : '00:00';
    return newTime;
  }
  render() {
    const { game, club } = this.props;
    const { buttonText, buttonText2, btn2Disabled } = this.state;
    return (
      <ScrollView style={[objects.screen.scrollViewContainer]}>
        <Timer calculateTime={this.calculateTime()} buttonText={buttonText} buttonText2={buttonText2} handleStartStop={this.handleStartStop} halftime={this.halftime} btn2Disabled={btn2Disabled} />
        <StatItem title="MÅL" statName="goals" stat={game.goals} club={club} opponent={game.opponent} onPress={this.submitStat} />
        <StatItem title="AVSLUT" statName="shots" stat={game.shots} onPress={this.submitStat} />
        <StatItem title="HÖRNOR" statName="corners" stat={game.corners} onPress={this.submitStat} />
        <StatItem title="GULA KORT" statName="yellow" stat={game.yellow} onPress={this.submitStat} />
        <StatItem title="RÖDA KORT" statName="red" stat={game.red} onPress={this.submitStat} />
        <View style={[objects.screen.marginContainer]}>
          <Button onPress={this.subPlayer} buttonType="cta" text="Genomför byte" />
          <Button onPress={this.saveGameAsFinished} buttonType="cta" text="Spara som avslutad match" />
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state,ownProps) {
  const game = state.games.find(g => g._id === ownProps.id);
  const club = state.user.club;
  return {
    game,
    club
  };
}

export default connect(mapStateToProps)(PlayingMatchContainer);
