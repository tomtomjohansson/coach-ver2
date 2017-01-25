// Dependencies
import React, { Component } from 'React';
import { View, Text, TextInput, Image } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
import {createValidator,checkValidation} from '../../common/validation.js';
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
      submitted: false
    };
    this.validators = {password: false ,username: false, email: false };
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
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
  submitRegistration() {
    this.setState({submitted: true});
    if (this.checkValidation()) {
      console.log('lets go')
    } else {
      console.log('No go!')
    }
  }
  render() {
    const {password,username,email,submitted} = this.state;
    return (
      <View style={{flex:1}} >
      <Image source={require('../../images/pitch.jpg')} style={[objects.screen.backgroundImage]} />
      <View style={[objects.screen.container, {height: 300}]} >
        <Input 
          label="Användarnamn*"
          autoFocus
          onChangeText={this.onChangeUsername}
          error={username.error}
          value={username.value}
          submitted={submitted}
        />
        <Input 
          label="Lösenord*"
          placeholder="Minst sex tecken..."
          onChangeText={this.onChangePassword} 
          error={password.error}
          value={password.value}
          secureTextEntry
          submitted={submitted}
        />
        <Input 
          label="Email*"
          onChangeText={this.onChangeEmail} 
          error={email.error}
          value={email.value}
          submitted={submitted}
          keyboardType="email-address"
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
