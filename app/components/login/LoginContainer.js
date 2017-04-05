// Dependencies
import React, { Component } from 'React';
import {connect} from 'react-redux';
import { Alert, View, Image } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
import {createValidator,checkValidation} from '../../common/validation.js';
import { loginUser } from '../../actions/userActions';
import autobind from 'autobind-decorator';
// Components
import LoginForm from './LoginForm';
// Styles
import {objects} from '../../themes';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: {},
      username: {},
      submitted: false,
      loading: false
    };
    this.validators = {password: false ,username: false };
    this.createValidator = createValidator.bind(this);
    this.checkValidation = checkValidation.bind(this);
  }
  goToRegister() {
    NavigationActions.register();
  }
  @autobind
  onChangeUsername(value){
    this.createValidator('username','username')(value);
  }
  @autobind
  onChangePassword(value) {
    this.createValidator('password','password')(value);
  }
  @autobind
  submitLogin() {
    this.setState({submitted: true,loading:true});
    if (this.checkValidation()) {
      const user = {
        username: this.state.username.value,
        password: this.state.password.value
      };
      this.props.dispatch(loginUser(user)).then(this.handleLoginResponse);
    } else {
      this.setState({loading:false});
    }
  }
  @autobind
  handleLoginResponse(response) {
    this.setState({loading:false});
    !response.success && Alert.alert('Inloggningen misslyckades', response.message);
  }
  render() {
    const {password,username,submitted,loading} = this.state;
    return (
      <View style={{flex:1}} >
      <Image source={require('../../images/pitch.jpg')} style={[objects.screen.backgroundImage]} />
      <LoginForm
        password={password}
        username={username}
        submitted={submitted}
        onChangePassword={this.onChangePassword}
        onChangeUsername={this.onChangeUsername}
        submitLogin={this.submitLogin}
        goToRegister={this.goToRegister}
        loading={loading}
      />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {user} = state;
  return {
    user
  };
}

export default connect(mapStateToProps)(LoginContainer);
