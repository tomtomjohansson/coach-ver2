// Dependencies
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, AsyncStorage } from 'react-native';
import storage from 'react-native-simple-store';
import { Actions as NavigationActions } from 'react-native-router-flux';
import Routes from './navigation/routes';
import { logoutUser } from './actions/userActions';

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
  handleLogin() {
    NavigationActions.players();
  }
  async handleLogout() {
    await storage.delete('user_token');
    NavigationActions.login();
  }

  async checkForUser() {
    const user = await storage.get('user_token');
    if (user && this.checkForExpiration(user)) {
      console.log('User logged in');
    } else {
      console.log('No User');
      NavigationActions.login();
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
  const {user,route} = state;
  return {
    isLoggedIn: user.isLoggedIn,
    route
  };
}

export default connect(mapStateToProps)(LoginHandler);
