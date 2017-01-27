// Dependencies
import React, { Component } from 'React';
import {connect} from 'react-redux';
import { Alert, View, Text, TouchableOpacity, Image } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
import {createValidator,checkValidation} from '../../common/validation.js';
import { loginUser } from '../../actions/userActions';
// Components
import Input from '../../common/Input.js';
import Button from '../../common/Button.js';
// Styles
import {objects, colors, fonts} from '../../themes';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: {},
      username: {},
      submitted: false
    };
    this.validators = {password: false ,username: false };
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.createValidator = createValidator.bind(this);
    this.checkValidation = checkValidation.bind(this);
  }
  goToRegister() {
    NavigationActions.register();
  }
  onChangeUsername(value){
    this.createValidator('username','username')(value);
  }
  onChangePassword(value) {
    this.createValidator('password','password')(value);
  }
  submitLogin() {
    this.setState({submitted: true});
    if (this.checkValidation()) {
      const user = {
        username: this.state.username.value,
        password: this.state.password.value
      }
      this.props.dispatch(loginUser(user)).then(this.handleLoginResponse);
    }
  }
  handleLoginResponse(response) {
    if (response.success) {
      console.log(response.user);
    } else {
      Alert.alert("Inloggningen misslyckades", response.message);
    }
  }
  render() {
    const {password,username,submitted} = this.state;
    return (
      <View style={{flex:1}} >
      <Image source={require('../../images/pitch.jpg')} style={[objects.screen.backgroundImage]} />
      <View style={[objects.screen.container, { height: 235}]} >
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
          label='Lösenord*'
          placeholder="Minst sex tecken..."
          onChangeText={this.onChangePassword} 
          error={password.error}
          value={password.value}
          secureTextEntry
          submitted={submitted}
          autoCapitalize={'none'}
        />
        <View style={[objects.screen.marginContainer]} >
          <Button onPress={this.submitLogin} buttonType="cta" text="Logga In" />
          <Text >Inte medlem än? <Text onPress={this.goToRegister} style={{color:colors.grassy}} >Registrera dig nu</Text></Text>
        </View>
      </View>
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
