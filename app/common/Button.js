// Dependencies
import React, {Component} from 'react';
import {View,Text,TextInput,TouchableOpacity} from 'react-native';
// Styles
import {objects, fonts} from '../themes';

export default function Button({ text, buttonType, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} >
      <View style={[objects.buttons.button, objects.buttons[buttonType] ]} >
        <Text style={[objects.buttons.text]} >{ text.toUpperCase() }</Text>
      </View>
    </TouchableOpacity>
  );
}
