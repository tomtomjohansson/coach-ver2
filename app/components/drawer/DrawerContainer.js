// Dependencies
import React, {Component} from 'React';
import {connect} from 'react-redux';
import {View, Image} from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
import { logoutUser } from '../../actions/userActions';
// Components
import DrawerItems from './DrawerItems';
// Styles
import {objects} from '../../themes';
import styles from './styles/styles';

class DrawerContainer extends Component {
  constructor(props) {
    super(props);
    this.items = [{
        function: NavigationActions.players,
        name: 'Spelarstatistik'
      }, {
        function: NavigationActions.teamStats,
        name: 'Lagstatistik'
      }, {
        function: NavigationActions.games,
        name: 'Matcher'
      }, {
        function: NavigationActions.trainings,
        name: 'Träningar'
      }
    ];

    this.logOut = this.logOut.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.navigateToRoute = this.navigateToRoute.bind(this);
  }

  logOut() {
    this.toggleDrawer();
    this.props.dispatch(logoutUser());
  }

  toggleDrawer() {
    this.context.drawer.toggle();
  }

  navigateToRoute(cb) {
    this.toggleDrawer();
    cb();
  }

  render() {
    return (
      <View style={{flex:1}} >
        <View style={[styles.drawerHeader]} >
          <View style={{flex:1}} >
            <Image source={require('../../images/grass.jpg')} style={[styles.drawerImage]} />
          </View>
        </View>
        <DrawerItems navigateToRoute={this.navigateToRoute} logOut={this.logOut} items={this.items} />
      </View>
    );
  }
}

DrawerContainer.contextTypes = {
  drawer: React.PropTypes.object
};

export default connect()(DrawerContainer);
