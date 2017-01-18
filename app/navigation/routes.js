// Dependencies
import React, { Component } from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import * as RNRF from 'react-native-router-flux';
const {Route, Schema, Scene, Animations, TabBar,Actions, ActionConst} = RNRF;
const Router = connect()(RNRF.Router);
// Components, containers
import Login from '../containers/LoginContainer';
import Players from '../containers/PlayersContainer';
import SinglePlayer from '../containers/SinglePlayerContainer';
import Games from '../containers/GamesContainer';
import Trainings from '../containers/TrainingContainer';
import SingleTraining from '../containers/SingleTrainingContainer';
import TeamStats from '../containers/TeamStatsContainer';
import MatchStats from '../containers/MatchStatsContainer';
import StartingEleven from '../containers/StartingElevenContainer';
import PlayingMatch from '../containers/PlayingMatchContainer';
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
        style={{color: selected ? colors.grassy :'white'}} 
      />
    );
  }
  render() {
    return (
      <Router renderBackButton={NavItems.hamburgerButton} navigationBarStyle={styles.navBar} titleStyle={styles.title} >
        <Scene key="drawer" component={NavigationDrawer} open={false}>
          <Scene key="drawerChildrenWrapper">
            <Scene  key="login"
            component={Login}
            title="Logga in"
            initial />
            <Scene key="players"
            component={Players}
            title="Välj Spelare" />
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
            tabBarStyle={{ backgroundColor: 'black' }}
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
      </Router>
    );
  }
}

export default Routes;
