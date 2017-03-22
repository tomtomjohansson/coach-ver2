// Dependencies
import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as RNRF from 'react-native-router-flux';
const {Scene, ActionConst, Modal} = RNRF;
const Router = connect()(RNRF.Router);
// Components, containers
import Login from '../components/login/LoginContainer';
import Register from '../components/login/RegisterContainer';
import Players from '../components/players/PlayersContainer';
import AddPlayer from '../components/players/AddPlayer';
import SinglePlayer from '../components/singlePlayer/SinglePlayerContainer';
import Games from '../components/games/GamesContainer';
import AddGame from '../components/games/AddGame';
import Trainings from '../components/training/TrainingContainer';
import AddTraining from '../components/training/AddTraining';
import SingleTraining from '../components/singleTraining/SingleTrainingContainer';
import TeamStats from '../components/teamStats/TeamStatsContainer';
import MatchStats from '../components/matchStats/MatchStatsContainer';
import StartingEleven from '../components/startingEleven/StartingElevenContainer';
import AddPlayerToEleven from '../components/startingEleven/AddPlayerToEleven';
import AddPlayerToBench from '../components/startingEleven/AddPlayerToBench';
import PickFormation from '../components/startingEleven/PickFormation';
import PlayingMatch from '../components/playingMatch/PlayingMatchContainer';
import AddStat from '../components/playingMatch/AddStat';
import SubPlayer from '../components/playingMatch/SubPlayer';

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
        style={{color: selected ? colors.grassy : 'white'}}
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
            hideNavBar
            // eslint-disable-next-line
            renderBackButton={()=>false} />
            <Scene  key="register"
            hideNavBar
            component={Register}
            title="Registrera lag"
            // eslint-disable-next-line
            renderBackButton={()=>false} />
            <Scene key="players"
            hideNavBar={false}
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
            // eslint-disable-next-line
            renderRightButton={()=>false} />
            <Scene key="games"
            component={Games}
            title="Matcher" />
            <Scene key="addGame" direction="vertical">
              <Scene title="Lägg till match" duration={1} renderBackButton={NavItems.closeButton} key="addGameModal" component={AddGame} />
            </Scene>
            <Scene key="trainings"
            component={Trainings}
            title="Träningar" />
            <Scene key="addTraining" direction="vertical">
              <Scene title="Lägg till träning" duration={1} renderBackButton={NavItems.closeButton} key="addTrainingModal" component={AddTraining} />
            </Scene>
            <Scene key="singleTraining"
            component={SingleTraining}
            title="Spelarnärvaro"
            renderBackButton={NavItems.backButton}/>
            <Scene key="singleGame"
            tabs
            tabBarStyle={{ backgroundColor: 'black', borderTopWidth: 2, borderTopColor: colors.transparent }}
            >
              <Scene key="SE" title="people" titleStyle={{color:'white'}} icon={this.TabIcon}>
                <Scene key="eleven"
                component={StartingEleven}
                title="Ta ut startelva"
                type={ActionConst.RESET}
                renderBackButton={NavItems.backButton}
                />
                <Scene key="addPlayerToEleven"
                title="Lägg till startspelare"
                duration={1}
                renderBackButton={NavItems.closeButton}
                component={AddPlayerToEleven}
                direction="vertical"
                />
                <Scene key="addPlayerToBench"
                title="Lägg till bänkspelare"
                duration={1}
                renderBackButton={NavItems.closeButton}
                component={AddPlayerToBench}
                direction="vertical"
                />
                <Scene key="pickFormation"
                title="Välj formation"
                duration={1}
                renderBackButton={NavItems.closeButton}
                component={PickFormation}
                direction="vertical"
                />
              </Scene>
              <Scene key="PM" title="directions-run" icon={this.TabIcon}>
                <Scene key="playingMatch"
                component={PlayingMatch}
                title="Pågående match"
                type={ActionConst.RESET}
                renderBackButton={NavItems.backButton}/>
                <Scene key="addStatModal" direction="vertical"  >
                  <Scene hideTabBar title="Uppdatera statistik" duration={1} renderBackButton={NavItems.closeButton} key="addStats" component={AddStat} />
                </Scene>
                <Scene key="subPlayerModal" direction="vertical"  >
                  <Scene hideTabBar title="Byt spelare" duration={1} renderBackButton={NavItems.closeButton} key="subPlayer" component={SubPlayer} />
                </Scene>
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
