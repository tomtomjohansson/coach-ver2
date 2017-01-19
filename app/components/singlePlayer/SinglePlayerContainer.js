// Dependencies
import React, {Component} from 'React';
import {View,Text} from 'react-native';
import {connect} from 'react-redux';
// Components
import PlayerStats from './PlayerStats';
// Styles
import {objects} from '../../themes';

class SinglePlayerContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {player} = this.props;
    return (
      <PlayerStats player={player} />
    );
  }
}

function mapStateToProps(state,ownProps) { 
  const player = state.players.players.find(p => 1 === p._id);
  return {
    player
  }
}

export default connect(mapStateToProps)(SinglePlayerContainer);
