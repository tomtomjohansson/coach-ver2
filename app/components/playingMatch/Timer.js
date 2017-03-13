import React, { Component } from 'React';
import { View, Text, Alert } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../../common/Button';
import { objects, metrics, colors } from '../../themes';

class Timer extends Component {
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
  render() {
    const { start, startTime } = this.state;
    const diff = moment().diff(startTime); // ökar med 1 för varje sekund som går från att man startar
    const minus = moment(startTime).diff(start); // skillnaden mellan 00:00/45:00 och startTime, i sekunder
    const min = moment(startTime).add(diff).subtract(minus).format('HH:mm');
    const minutes = moment.duration(min).asMinutes().toString();
    const seconds = moment(startTime).add(diff).subtract(minus).format('ss');
    return (
      <View style={{ flex: 1, marginTop: 10 }}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
          <Icon name="timer" size={metrics.icons.medium} style={{ flex: 1, textAlign: 'right', color: colors.greyishBlue }} />
          <Text style={{ textAlign: 'center', fontSize: 32, color: colors.darkBlue }}>
            {(startTime) ? `${(minutes.length === 1) ? `0${minutes}` : minutes }:${seconds}` : '00:00'}
          </Text>
          <View style={{ flex: 1 }} />
        </View>
        <View style={[objects.screen.marginContainer,{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' } ]} >
          <View style={{ flex:1, marginRight: 10 }} >
            <Button buttonType={'cta'} text={this.state.buttonText} onPress={this.handleStartStop.bind(this)} />
          </View>
          <View style={{ flex: 1 }} >
            <Button buttonType={'active'} text={this.state.buttonText2} onPress={this.halftime.bind(this)} disabled={this.state.btn2Disabled} />
          </View>
        </View>
      </View>
    );
  }
}

export default Timer;
