// Dependencies
import React, {Component} from 'React';
import {View,Text,Image} from 'react-native';
import {Actions as NavigationActions} from 'react-native-router-flux';
import {connect} from 'react-redux';
// Components
import PlayerList from './PlayerList';
import AddPlayer from './AddPlayer';
// Styles
import {objects} from '../../themes';

class PlayerContainer extends Component {
  constructor(props) {
    super(props);
  }

  goToSinglePlayer(id) {
    NavigationActions.singlePlayer({id:id});
  }

  render() {
    const {players} = this.props;
    return (
      <View style={[objects.screen.mainContainer]}>
        <Image source={require('../../images/pitch.jpg')} style={[objects.screen.backgroundImage]} />
        <PlayerList players={players} goToSinglePlayer={this.goToSinglePlayer} />
        <AddPlayer />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {players} = state.players;
  return {
    players
  };
}

export default connect(mapStateToProps)(PlayerContainer);
