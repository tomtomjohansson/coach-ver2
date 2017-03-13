import React, { Component } from 'React';
import { View, Text } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../../common/Button';
import { objects, metrics, colors } from '../../themes';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerRunning: false,
      timer: moment.duration({'minutes': 0, 'seconds': 0}),
      buttonText: 'Starta',
      buttonText2: 'Halvlek'
    };
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  handleStartStop() {
    const { timerRunning } = this.state;

    if (timerRunning) {
      clearInterval(this.interval);
      this.setState({
        timerRunning: false,
        buttonText: 'Återuppta'
      });
      return;
    }

    this.setState({
      timerRunning: true,
      buttonText: 'Pausa'
    });

    this.interval = setInterval(() => {
      const { timer } = this.state;
      const newTime = moment.duration({'seconds': 1});
      this.setState({
        timer: moment(timer).add(newTime)
      });
    }, 1000);

  }
  halftime() {
    let { timer } = this.state;
    this.setState({
      timer: moment(timer).set({'minutes': 45, 'seconds': 0})
    });
  }
  render() {
    return (
      <View style={{ flex: 1, marginTop: 10 }}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
          <Icon name="timer" size={metrics.icons.medium} style={{ flex: 1, textAlign: 'right', color: colors.greyishBlue }} />
          <Text style={{ textAlign: 'center', fontSize: 32, color: colors.darkBlue }}>
            {moment(this.state.timer).format('mm:ss')}
          </Text>
          <View style={{ flex: 1 }} />
        </View>
        <View style={[objects.screen.marginContainer,{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' } ]} >
          <View style={{ flex:1, marginRight: 10 }} >
            <Button buttonType={'cta'} text={this.state.buttonText} onPress={this.handleStartStop.bind(this)} />
          </View>
          <View style={{ flex: 1 }} >
            <Button buttonType={'active'} text={this.state.buttonText2} onPress={this.halftime.bind(this)} />
          </View>
        </View>
      </View>
    );
  }
}

export default Timer;
