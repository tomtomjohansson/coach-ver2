// Dependencies
import React from 'React';
import {View,Text, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Styles
import {objects,metrics} from '../themes';

function AddItemBottom({text,openModal}) {
  return (
    <View style={[objects.addingForm]}>
      <TouchableHighlight onPress={openModal}>
        <Icon
          style={[objects.addingIcon]}
          name="add-circle"
          size={metrics.icons.large}
        />
      </TouchableHighlight>
      <Text style={[objects.addingText]}>{text}</Text>
    </View>
  );
}

export default AddItemBottom;

