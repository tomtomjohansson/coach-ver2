// Dependencies
import React from 'react';
import {View,Text,TextInput} from 'react-native';
// Styles
import {objects, fonts,colors} from '../themes';

export default function Input({label = '', placeholder = '', autoFocus = false, secureTextEntry = false, keyboardType = 'default', maxLength = 50, onChangeText, onBlur, error, submitted }) {
  return (
    <View style={{flex:1}} >
    <View style={[objects.inputs.container, checkErrorForContainer(submitted,error)]} >
      <Text style={[objects.inputs.label, fonts.style.description]}>
        <Text>{label.toUpperCase()}     </Text>
        { checkErrorForLabel(submitted,error) }
      </Text>
      <TextInput
        style={[objects.inputs.input]}
        placeholder={placeholder}
        autoFocus={autoFocus}
        keyboardType={keyboardType}
        maxLength={maxLength}
        onChangeText={onChangeText}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
      />
    </View>
    </View>
  );
}

function checkErrorForLabel (submitted, error) {
  if (submitted && error) {
    return <Text style={{color:colors.danger}}>{error}</Text>;
  } else if (submitted && error === undefined ) {
    return <Text style={{color:colors.danger, textAlign: 'right'}}>Fältet får inte vara tomt</Text>;
  }
}

function checkErrorForContainer (submitted, error) {
  return error || submitted && error === undefined ? objects.inputs.error : null;
}
