// Dependencies
import React, {Component} from 'React';
import {connect} from 'react-redux';
import {View,ScrollView,Alert} from 'react-native';
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
  }
  submitStat(team,stat) {
    if ( team === 'for' && (stat !== 'corners') ) {
      goToRoute('addStatModal',{id: this.props.id,stat,team},false);
    } else {
      const newGame = JSON.parse(JSON.stringify(this.props.game));
      newGame.events.push({type:stat,team});
      newGame[stat][team]++;
      if (stat === 'goals') {
        newGame.shots[team]++;
        newGame.events.push({type:"shots",team});
      }
      this.props.dispatch(updateStat(newGame));
    }
  }
  saveGameAsFinished() {
    this.props.dispatch(saveGameAsFinished(this.props.game)).then(this.handleAJAXresponse);
  }
  handleAJAXresponse(response) {
    if (response.success) {
      goToRoute('MS',{},false);
    } else {
      Alert.alert('Något gick fel', response.message);
    }
  }
  subPlayer() {
    goToRoute('subPlayerModal',{id: this.props.id},false);
  }
  render() {
    const {game,club} = this.props;
    return (
      <ScrollView style={[objects.screen.scrollViewContainer]}>
        <Timer />
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
