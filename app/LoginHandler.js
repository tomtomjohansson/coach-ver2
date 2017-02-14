// Dependencies
import React, {Component} from 'react';
import { connect } from 'react-redux';
import storage from 'react-native-simple-store';
import { Actions as NavigationActions } from 'react-native-router-flux';
import Routes from './navigation/routes';
import { logoutUser } from './actions/userActions';
import {goToRoute} from './actions/routeActions';

class LoginHandler extends Component {
  constructor (props) {
    super(props);
  }
  componentWillMount() {
    this.checkForUser();
  }
  componentDidUpdate (prevProps) {
    const isLoggingOut = prevProps.isLoggedIn && !this.props.isLoggedIn;
    const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn;

    if (isLoggingIn) {
      this.handleLogin();
    } else if (isLoggingOut) {
      this.handleLogout();
    }
  }
  async handleLogin() {
    goToRoute('players',{},true);
  }
  async handleLogout() {
    await storage.delete('user_token');
    await storage.update('route',{route:'login',routeProps:{}});
    NavigationActions.login();
  }

  async checkForUser() {
    const user = await storage.get('user_token');
    if (user && this.checkForExpiration(user)) {
      const {route,props} = await storage.get('route');
      NavigationActions[route](props);
    } else {
      this.handleLogout();
    }
  }

  checkForExpiration (user) {
    const info = user.split(".");
    const decodedInfo = JSON.parse(global.atob(info[1]));
    if (decodedInfo.exp > Date.now() / 1000) {
      return true;
    } else {
      this.props.dispatch(logoutUser());
      return false;
    }
  }

  render() {
    return <Routes />;
  }
}

function mapStateToProps(state) {
  const {user} = state;
  return {
    isLoggedIn: user.isLoggedIn,
  };
}

export default connect(mapStateToProps)(LoginHandler);
