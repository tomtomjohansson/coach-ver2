// Dependencies
import React from 'react';
import {View,Text,TextInput} from 'react-native';
// Components
import ErrorLabel from './ErrorLabel';
// Styles
import {objects, fonts} from '../themes';

export default function Input({
    placeholder = '',
    autoFocus = false,
    secureTextEntry = false,
    keyboardType = 'default',
    maxLength = 50,
    autoCapitalize = 'sentences',
    onChangeText,
    onChange,
    onSubmitEditing,
    onBlur,
    label = '',
    error,
    submitted
  }) {
  return (
    <View style={[objects.inputs.container, checkErrorForContainer(submitted,error)]} >
      <Text style={[objects.inputs.label, fonts.style.description]}>
        <Text>{label.toUpperCase()}     </Text>
        <ErrorLabel submitted={submitted} error={error} />
      </Text>
      <TextInput
        style={[objects.inputs.input]}
        placeholder={placeholder}
        autoFocus={autoFocus}
        keyboardType={keyboardType}
        underlineColorAndroid='transparent'
        maxLength={maxLength}
        onChangeText={onChangeText}
        onChange={onChange}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
}

function checkErrorForContainer (submitted, error) {
  return error || submitted && error === undefined ? objects.inputs.error : null;
}
