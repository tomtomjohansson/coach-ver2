// Dependencies
import React, {Component} from 'React';
import {Alert, View,Text} from 'react-native';
import {connect} from 'react-redux';
import {deletePlayer} from '../../actions/playerActions';
import {goToRoute} from '../../actions/routeActions';
// Components
import PlayerStats from './PlayerStats';
import UpdateDelete from '../../common/UpdateDelete.js'
// Styles
import {objects} from '../../themes';

class SinglePlayerContainer extends Component {
  constructor(props) {
    super(props);

    this.deletePlayer = this.deletePlayer.bind(this);
    this.handleAJAXresponse = this.handleAJAXresponse.bind(this);
  }
  deletePlayer() {
    this.props.dispatch(deletePlayer(this.props.player._id)).then(this.handleAJAXresponse);
  }
  handleAJAXresponse(response) {
    if (response.success) {
      goToRoute('players',{},true);
    } else {
      Alert.alert("Spelaren raderades inte", response.message);
    }
  }
  render() {
    const {player} = this.props;
    return (
      <View style={[objects.screen.topContainer]} >
        { player && <PlayerStats player={player} /> } 
        <UpdateDelete
          updateText="Uppdatera spelare"
          deleteText="Radera spelare"
          onDeleteAction={this.deletePlayer} 
          onUpdateAction={this.deletePlayer} 
        />
      </View>
    );
  }
}

function mapStateToProps(state,ownProps) { 
  const player = state.players.find(p => ownProps.id === p._id);
  return {
    player
  }
}

export default connect(mapStateToProps)(SinglePlayerContainer);
