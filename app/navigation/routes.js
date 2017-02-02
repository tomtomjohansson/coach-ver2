// Dependencies
import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as RNRF from 'react-native-router-flux';
const {Scene, ActionConst, Modal} = RNRF;
const Router = connect()(RNRF.Router);
// Components, containers
import LoginHandler from '../LoginHandler';
import Login from '../components/login/LoginContainer';
import Register from '../components/login/RegisterContainer';
import Players from '../components/players/PlayersContainer';
import SinglePlayer from '../components/singlePlayer/SinglePlayerContainer';
import Games from '../components/games/GamesContainer';
import Trainings from '../components/training/TrainingContainer';
import SingleTraining from '../components/singleTraining/SingleTrainingContainer';
import TeamStats from '../components/teamStats/TeamStatsContainer';
import MatchStats from '../components/matchStats/MatchStatsContainer';
import StartingEleven from '../components/startingEleven/StartingElevenContainer';
import PlayingMatch from '../components/playingMatch/PlayingMatchContainer';
import AddPlayer from '../components/players/AddPlayer';
import NavigationDrawer from './NavigationDrawer';
import NavItems from './navItems';
// Styles
import styles from './styles/navigationContainerStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {metrics, colors} from '../themes';

class Routes extends Component {
  constructor(props) {
    super(props);
  }
  TabIcon = ({ selected, title }) => {
    return (
      <Icon name={title}
        size={metrics.icons.medium}
        style={{color: selected ? colors.grassy : 'white', borderTopWidth: 4, borderTopColor: colors.grassy}}
      />
    );
  }
  render() {
    return (
      <Router renderBackButton={NavItems.hamburgerButton} navigationBarStyle={styles.navBar} titleStyle={styles.title} panHandlers={null}>
        <Scene key="modal" component={Modal} >
        <Scene key="drawer" component={NavigationDrawer} open={false}>
          <Scene key="drawerChildrenWrapper">
            <Scene  key="login"
            component={Login}
            title="Logga in"
             />
            <Scene  key="register"
            component={Register}
            title="Registrera lag"
            renderBackButton={()=>false} />
            <Scene key="players"
            component={Players}
            title="Välj Spelare"
            initial/>
            <Scene key="addPlayer" direction="vertical">
              <Scene title="Lägg till spelare" duration={1} renderBackButton={NavItems.closeButton} key="addPlayerModal" component={AddPlayer} />
            </Scene>
            <Scene key="singlePlayer"
            component={SinglePlayer}
            title="Spelarens statistik"
            renderBackButton={NavItems.backButton}/>
            <Scene key="teamStats"
            component={TeamStats}
            title="Lagstatistik"
            renderRightButton={()=>false} />
            <Scene key="games"
            component={Games}
            title="Matcher" />
            <Scene key="trainings"
            component={Trainings}
            title="Träningar" />
            <Scene key="singleTraining"
            component={SingleTraining}
            title="Spelarnärvaro"
            renderBackButton={NavItems.backButton}/>
            <Scene key="singleGame"
            tabs
            tabBarStyle={{ backgroundColor: 'black', borderTopWidth: 2, borderTopColor: colors.transparent }}
            >
              <Scene key="SE" title="people" icon={this.TabIcon}>
                <Scene key="eleven"
                component={StartingEleven}
                title="Ta ut startelva"
                type={ActionConst.RESET}
                renderBackButton={NavItems.backButton}/>
              </Scene>
              <Scene key="PM" title="directions-run" icon={this.TabIcon}>
                <Scene key="playingMatch"
                component={PlayingMatch}
                title="Pågående match"
                type={ActionConst.RESET}
                renderBackButton={NavItems.backButton}/>
              </Scene>
              <Scene key="MS" title="info" icon={this.TabIcon}>
                <Scene key="matchStats"
                component={MatchStats}
                title="Matchstatistik"
                type={ActionConst.RESET}
                renderBackButton={NavItems.backButton}/>
              </Scene>
            </Scene>
          </Scene>
        </Scene>
        </Scene>
      </Router>
    );
  }
}

export default Routes;
