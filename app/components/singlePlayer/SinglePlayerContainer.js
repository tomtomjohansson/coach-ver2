// Dependencies
import React, {Component} from 'React';
import {Alert, View,Text} from 'react-native';
import {connect} from 'react-redux';
import {Actions as NavigationActions} from 'react-native-router-flux';
import {deletePlayer} from '../../actions/playerActions';
// Components
import PlayerStats from './PlayerStats';
import Button from '../../common/Button.js'
// Styles
import {objects} from '../../themes';

class SinglePlayerContainer extends Component {
  constructor(props) {
    super(props);

    this.deletePlayer = this.deletePlayer.bind(this);
  }
  deletePlayer() {
    this.props.dispatch(deletePlayer(this.props.player._id)).then(this.handleAJAXresponse);
  }
  handleAJAXresponse(response) {
    if (response.success) {
      NavigationActions.players();
    } else {
      Alert.alert("Spelaren raderades inte", response.message);
    }
  }
  render() {
    const {player} = this.props;
    return (
      <View style={[objects.screen.topContainer]} >
        { player && <PlayerStats player={player} /> } 
        <View style={[objects.screen.marginContainer,{flex:1, flexDirection: 'row', justifyContent: 'space-between'} ]} >
          <View style={{flex:1, marginRight: 10}} >       
            <Button buttonType="cta" text="Uppdatera spelare" onPress={this.deletePlayer} />
          </View>
          <View style={{flex:1}} >
            <Button buttonType="alert" text="Radera spelare" onPress={this.deletePlayer} />
          </View>
        </View>
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
