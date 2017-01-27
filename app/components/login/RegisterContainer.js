// Dependencies
import React, { Component } from 'React';
import { Alert, View, Text, Image } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
import {createValidator,checkValidation} from '../../common/validation.js';
import { registerUser } from '../../actions/userActions';
// Components
import Input from '../../common/Input.js';
import Button from '../../common/Button.js';
// Styles
import {objects,colors} from '../../themes';

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
    if (response.success) {
      console.log(response.user);
    } else {
      Alert.alert("Registreringen misslyckades", response.message);
    }
  }
  render() {
    const {password,username,email,club,submitted} = this.state;
    return (
      <View style={{flex:1}} >
      <Image source={require('../../images/pitch.jpg')} style={[objects.screen.backgroundImage]} />
      <View style={[objects.screen.container, {height: 350}]} >
        <Input 
          label="Användarnamn*"
          autoFocus
          onChangeText={this.onChangeUsername}
          error={username.error}
          value={username.value}
          submitted={submitted}
          autoCapitalize={'none'}
        />
        <Input 
          label="Lösenord*"
          placeholder="Minst sex tecken..."
          onChangeText={this.onChangePassword} 
          error={password.error}
          value={password.value}
          secureTextEntry
          submitted={submitted}
          autoCapitalize={'none'}
        />
        <Input 
          label="Email*"
          onChangeText={this.onChangeEmail} 
          error={email.error}
          value={email.value}
          submitted={submitted}
          keyboardType="email-address"
          autoCapitalize={'none'}
        />
        <Input 
          label="Klubb*"
          onChangeText={this.onChangeClub}
          error={club.error}
          value={club.value}
          submitted={submitted}
        />
        <View style={[objects.screen.marginContainer]} >
          <Button onPress={this.submitRegistration} buttonType="cta" text="Registrera och logga in" />
          <Text>Tillbaka till <Text onPress={this.goToLogin} style={{color:colors.grassy}} >login</Text></Text>
        </View>
      </View>
      </View>
    );
  }
}

export default RegisterContainer;
