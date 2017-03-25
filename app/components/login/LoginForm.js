// Dependencies
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
// Components
import Input from '../../common/Input';
import Button from '../../common/Button.js';
// Styles
import {objects, colors} from '../../themes';

function LoginForm({username,password,submitted,onChangeUsername,onChangePassword,submitLogin,goToRegister,loading}) {
  return (
    <View style={[objects.screen.container, { height: 240}]} >
        <Input
          label="Användarnamn*"
          autoFocus
          onChangeText={onChangeUsername}
          error={username.error}
          value={username.value}
          submitted={submitted}
          autoCapitalize={'none'}
        />
        <Input
          label="Lösenord*"
          placeholder="Minst åtta tecken..."
          onChangeText={onChangePassword}
          error={password.error}
          value={password.value}
          secureTextEntry
          submitted={submitted}
          autoCapitalize={'none'}
        />
        <View style={[objects.screen.marginContainer]} >
          <Button onPress={submitLogin} buttonType="cta" text={(loading) ? <ActivityIndicator color={colors.offWhite} /> : 'Logga In'} />
          <Text style={{marginTop:5,fontSize:16}}>Inte medlem än? <Text onPress={goToRegister} style={{color:colors.grassy}} >Registrera dig nu</Text></Text>
        </View>
      </View>
  );
}

export default LoginForm;
