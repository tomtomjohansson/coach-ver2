// Dependencies
import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Styles
import {objects, metrics} from '../../themes';
import styles from './styles/styles';

export default function VenueChoice({venue,onChangeVenue}) {
  return (
    <View style={[styles.venueContainer]} >
      <TouchableOpacity style={[styles.venueChoice]} onPress={()=> onChangeVenue('Hemma')} >
          <Text>Hemma</Text>
          <Icon name={getCheckIcon(venue,'Hemma')}
          size={metrics.icons.medium}
          style={[objects.listitems.icon]}
        />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.venueChoice]} onPress={()=> onChangeVenue('Borta')} >
          <Text>Borta</Text>
          <Icon name={getCheckIcon(venue,'Borta')}
          size={metrics.icons.medium}
          style={[objects.listitems.icon]}
        />
      </TouchableOpacity>
    </View>
  );
}

function getCheckIcon(venue,item) {
  return venue === item ? 'check-circle' : 'radio-button-unchecked';
}
