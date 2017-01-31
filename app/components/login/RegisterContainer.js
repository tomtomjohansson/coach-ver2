// Dependencies
import React, { Component } from 'React';
import { Alert, View, Image } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
import {createValidator,checkValidation} from '../../common/validation.js';
import { registerUser } from '../../actions/userActions';
// Components
import RegisterForm from './RegisterForm';
// Styles
import {objects} from '../../themes';

class RegisterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: {},
      username: {},
      email: {},
      club: {},
      submitted: false
    };
    this.validators = {password: false ,username: false, email: false, club: false };
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeClub = this.onChangeClub.bind(this);
    this.submitRegistration = this.submitRegistration.bind(this);
    this.createValidator = createValidator.bind(this);
    this.checkValidation = checkValidation.bind(this);
  }
  goToLogin() {
    NavigationActions.login();
  }
  onChangeUsername(value){
    this.createValidator('username','username')(value);
  }
  onChangePassword(value) {
    this.createValidator('password','password')(value);
  }
  onChangeEmail(value) {
    this.createValidator('email','email')(value);
  }
  onChangeClub(value) {
    this.createValidator('club','string')(value);
  }
  submitRegistration() {
    this.setState({submitted: true});
    if (this.checkValidation()) {
      const user = {
        username: this.state.username.value,
        password: this.state.password.value,
        email: this.state.email.value,
        club: this.state.club.value,
      }
      this.props.dispatch(registerUser(user)).then(this.handleRegistrationResponse);
    }
  }
  handleRegistrationResponse(response) {
    !response.success && Alert.alert("Registreringen misslyckades", response.message);
  }
  render() {
    const {password,username,email,club,submitted} = this.state;
    return (
      <View style={{flex:1}} >
      <Image source={require('../../images/pitch.jpg')} style={[objects.screen.backgroundImage]} />
      <RegisterForm
        password={password} 
        username={username} 
        email={email} 
        club={club} 
        submitted={submitted}
        onChangePassword={this.onChangePassword}
        onChangeUsername={this.onChangeUsername}
        onChangeEmail={this.onChangeEmail}
        onChangeClub={this.onChangeClub}
        submitRegistration={this.submitRegistration}
        goToLogin={this.goToLogin}
      />
      </View>
    );
  }
}

export default RegisterContainer;
