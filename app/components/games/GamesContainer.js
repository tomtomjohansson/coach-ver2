// Dependencies
import React, {Component} from 'React';
import {View,ListView,Keyboard} from 'react-native';
import {connect} from 'react-redux';
import {goToRoute} from '../../actions/routeActions';
// Components
import AddItemBottom from '../../common/AddItemBottom';
import GameList from './GameList';
// Styles
import {objects} from '../../themes';

class GamesContainer extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    this.state = {
      games: this.ds.cloneWithRowsAndSections({})
    };
  }
  componentWillMount() {
    Keyboard.dismiss();
    this.sortGames(this.props.games);
  }
  componentWillReceiveProps(nextProps){
    this.sortGames(nextProps.games);
  }
  sortGames(games){
    const upcoming = games
      .filter(game => !game.ended)
      .sort((a,b) => new Date(a.date) - new Date(b.date));
    const done = games
      .filter(game => game.ended)
      .sort((a,b) => new Date(b.date) - new Date(a.date));
    const gamesMap = {
      'Kommande': upcoming,
      'Spelade': done
    };
    this.setState({games: this.ds.cloneWithRowsAndSections(gamesMap)});
  }
  openModal() {
    goToRoute('addGame',{}, false);
  }
  goToGame(id,ended,isStartingEleven) {
    if (!isStartingEleven) {
      goToRoute('singleGame',{route: 'SE', id},false);
    } else if (!ended) {
      goToRoute('singleGame',{route: 'PM', id},false);
    } else {
      goToRoute('singleGame',{route: 'MS', id},false);
    }
  }
  render() {
    const { games } = this.state;
    return (
      <View style={[objects.screen.mainContainer]}>
        <GameList games={games} onPress={this.goToGame} dispatch={this.props.dispatch} />
        <AddItemBottom text="Lägg till match" openModal={this.openModal} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { games } = state;
  return {
    games
  };
}

export default connect(mapStateToProps)(GamesContainer);
