// Dependencies
import React, {Component} from 'React';
import {View,Text,Image} from 'react-native';
import {Actions as NavigationActions} from 'react-native-router-flux';
import {connect} from 'react-redux';
// Components
import PlayerList from './PlayerList';
import AddItemBottom from '../../common/AddItemBottom';
// Styles
import {objects} from '../../themes';

class PlayerContainer extends Component {
  constructor(props) {
    super(props);
  }

  goToSinglePlayer(id) {
    NavigationActions.singlePlayer({id:id});
  }
  openModal() {
    NavigationActions.addPlayer();
  }

  render() {
    const {players} = this.props;
    return (
      <View style={[objects.screen.mainContainer]}>
        <PlayerList players={players} goToSinglePlayer={this.goToSinglePlayer} />
        <AddItemBottom text="Lägg till spelare" openModal={this.openModal} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {players} = state;
  return {
    players
  };
}

export default connect(mapStateToProps)(PlayerContainer);
