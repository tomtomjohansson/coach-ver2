// Dependencies
import React from 'react';
import {View} from 'react-native';
// Components
import Button from './Button';
// Styles
import {objects} from '../themes';

export default function UpdateDelete({updateText,deleteText,onUpdateAction,onDeleteAction,roundButton = null}) {
  return (
    <View style={[objects.screen.marginContainer,{flex:1, flexDirection: 'row', justifyContent: 'space-between'} ]} >
      <View style={(roundButton) ? objects.buttons.round : {flex:1, marginRight: 10}} >
        <Button buttonType={(roundButton) ? 'ctaRound' : 'cta'} text={updateText} onPress={onUpdateAction} />
      </View>
      <View style={(roundButton) ? objects.buttons.round : {flex:1}} >
        <Button buttonType={(roundButton) ? 'alertRound' : 'alert'} text={deleteText} onPress={onDeleteAction} />
      </View>
    </View>
  );
}
