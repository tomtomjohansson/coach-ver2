// Dependencies
import React, {Component} from 'React';
import {View,Text,Image} from 'react-native';
import {connect} from 'react-redux';
import {goToRoute} from '../../actions/routeActions';
// Components
import PlayerList from './PlayerList';
import AddItemBottom from '../../common/AddItemBottom';
// Styles
import {objects} from '../../themes';

class PlayerContainer extends Component {
  constructor(props) {
    super(props);

    this.goToSinglePlayer = this.goToSinglePlayer.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  goToSinglePlayer(id) {
    goToRoute('singlePlayer',{id:id}, false);
  }
  openModal() {
    goToRoute('addPlayer',{}, false);
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
