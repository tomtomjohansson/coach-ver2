// Dependencies
import React, {Component} from 'React';
import {View} from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
// Components
import DrawerItems from './DrawerItems';
// Styles
import {objects} from '../../themes';

class DrawerContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.items = [
        {
          function: NavigationActions.players,
          name: 'Spelarstatistik'
        },
        {
          function: NavigationActions.teamStats,
          name: 'Lagstatistik'
        },
        {
          function: NavigationActions.games,
          name: 'Matcher'
        },
        {
          function: NavigationActions.trainings,
          name: 'Träningar'
        },
        {
          function: NavigationActions.login,
          name: 'Logga in'
        }
      ];
  }

  toggleDrawer = () => {
    this.context.drawer.toggle();
  }

  navigateToRoute = (cb) => {
    this.toggleDrawer();
    cb();
  }

  render() {
    return (
      <View style={objects.screen.container} >
        <DrawerItems navigateToRoute={this.navigateToRoute} items={this.items} />
      </View>
    );
  }
}

DrawerContainer.contextTypes = {
  drawer: React.PropTypes.object
};

export default DrawerContainer;
