import React from 'react';
import { ScrollView, View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { objects, metrics } from '../../themes';

function PickFormation ({ formations, updateFormation }) {

  function compare(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  formations = formations.sort(compare);

  return (
    <ScrollView style={objects.screen.scrollViewContainer}>
      {formations.map((formation,i) => {
        return (
          <TouchableOpacity key={i} index={i} onPress={()=>updateFormation(formation)} >
            <View style={[objects.listitems.container,checkUneven(i) ? objects.listitems.green : objects.listitems.white]} >
              <View style={{flexDirection:'row', alignItems: 'center'}} >
                <Icon name="content-paste"
                  size={metrics.icons.medium}
                  style={objects.listitems.icon}
                />
                <Text style={objects.listitems.text} >{formation.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

function checkUneven(i) {
  return i % 2 !== 0;
}

export default PickFormation;
