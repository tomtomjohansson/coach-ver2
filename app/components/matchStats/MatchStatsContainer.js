// Dependencies
import React, {Component} from 'React';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native';
// Components
import MatchStats from './MatchStats';
import IndividualStats from './IndividualStats';
// Styles
import {objects} from '../../themes';

class MatchStatsContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {game,club} = this.props;
    return (
      <ScrollView style={[objects.screen.scrollViewContainer]}>
        <MatchStats game={game} club={club} />
        <IndividualStats players={game.players} goals={game.goals.for} />
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

export default connect(mapStateToProps)(MatchStatsContainer);
