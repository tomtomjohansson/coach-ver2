// Dependencies
import React from 'react';
import {Text} from 'react-native';
// Styles
import {colors} from '../themes';

export default function ErrorLabel({submitted, error}) {
  if (submitted && error) {
    return (<Text style={{color:colors.danger}}>{error}</Text>);
  } else if (submitted && error === undefined ) {
    return (<Text style={{color:colors.danger, textAlign: 'right'}}>Fältet får inte vara tomt</Text>);
  } else {
    return (<Text />);
  }
}
