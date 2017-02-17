// Dependencies
import React from 'react';
import {View,Text} from 'react-native';
// Components
import Input from '../../common/Input';
import Button from '../../common/Button.js';
// Styles
import {objects, colors} from '../../themes';

function RegisterForm({username,email,password,club,submitted,onChangeUsername,onChangeEmail,onChangePassword,onChangeClub,submitRegistration,goToLogin}) {
  return (
    <View style={[objects.screen.container, {height: 370}]} >
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
          placeholder="Minst sex tecken..."
          onChangeText={onChangePassword}
          error={password.error}
          value={password.value}
          secureTextEntry
          submitted={submitted}
          autoCapitalize={'none'}
        />
        <Input
          label="Email*"
          onChangeText={onChangeEmail}
          error={email.error}
          value={email.value}
          submitted={submitted}
          keyboardType="email-address"
          autoCapitalize={'none'}
        />
        <Input
          label="Klubb*"
          onChangeText={onChangeClub}
          error={club.error}
          value={club.value}
          submitted={submitted}
        />
        <View style={[objects.screen.marginContainer]} >
          <Button onPress={submitRegistration} buttonType="cta" text="Registrera och logga in" />
          <Text style={{marginTop:5,fontSize:16}} >Tillbaka till <Text onPress={goToLogin} style={{color:colors.grassy}} >login</Text></Text>
        </View>
      </View>
  );
}

export default RegisterForm;
