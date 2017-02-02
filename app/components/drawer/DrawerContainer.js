// Dependencies
import React, {Component} from 'React';
import {connect} from 'react-redux';
import {View, Image, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import storage from 'react-native-simple-store';
import { logoutUser } from '../../actions/userActions';
import {goToRoute} from '../../actions/routeActions';
// Components
import DrawerItems from './DrawerItems';
// Styles
import {metrics,colors} from '../../themes';
import styles from './styles/styles';

class DrawerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: ""
    };
    this.items = [{
        key: 'players',
        name: 'Spelarstatistik',
        icon: 'people'
      }, {
        key: 'teamStats',
        name: 'Lagstatistik',
        icon: 'pie-chart-outlined'
      }, {
        key: 'games',
        name: 'Matcher',
        icon: 'directions-run'
      }, {
        key: 'trainings',
        name: 'Träningar',
        icon: 'fitness-center'
      }
    ];

    this.logOut = this.logOut.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.navigateToRoute = this.navigateToRoute.bind(this);
  }

  async componentWillMount() {
    this.props.email = '';
    const route = await storage.get('route');
    this.setState({active:route.route});
  }

  logOut() {
    this.toggleDrawer();
    this.props.dispatch(logoutUser());
  }

  toggleDrawer() {
    this.context.drawer.toggle();
  }

  navigateToRoute(key,index) {
    this.setState({active: key});
    this.toggleDrawer();
    goToRoute(key,{});
  }

  render() {
    let email;
    if (this.props.email) {
      email = <Text style={[styles.drawerHeaderEmail]} > { this.props.email.toUpperCase() }</Text>;
    }
    return (
      <View style={{flex:1}} >
        <View style={[styles.drawerHeader]} >
          <View style={{flex:1}} >
            <Image source={require('../../images/grass.jpg')} style={[styles.drawerImage]} />
            <View style={[styles.drawerHeaderClub]} >
              <Icon name='verified-user' size={metrics.icons.medium} style={{color:colors.snow}} />
              <Text style={[styles.drawerHeaderClubText]} > {this.props.club}</Text>
            </View>
            { email }
          </View>
        </View>
        <DrawerItems active={this.state.active} navigateToRoute={this.navigateToRoute} logOut={this.logOut} items={this.items} />
      </View>
    );
  }
}

DrawerContainer.contextTypes = {
  drawer: React.PropTypes.object
};

function mapStateToProps(state) {
  const {user} = state;
  return {
    club: user.club,
    email: user.email
  };
}

export default connect(mapStateToProps)(DrawerContainer);
