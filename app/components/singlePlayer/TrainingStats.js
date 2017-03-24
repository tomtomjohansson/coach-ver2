// Dependencies
import React from 'React';
import {View,Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Styles
import {objects,colors,metrics} from '../../themes';

function TrainingStats({stats}) {
  return (
      <View>
        <View style={[objects.listitems.container, {justifyContent:'flex-start'}]} >
          <Text style={[objects.listitems.text, {flex:1, color:colors.grassy}]} >TRÄNINGAR</Text>
        </View>
        <View style={[objects.listitems.container, objects.listitems.green, objects.listitems.narrow]} >
          <Text style={[objects.listitems.text, {flex:1}]} >Träningsnärvaro i procent: <Text style={{fontWeight:'400'}} >{ getAttendance(stats) }%</Text></Text>
        </View>
        <View style={[objects.listitems.container, objects.listitems.narrow,{borderBottomWidth:0}]} >
          <Text style={[objects.listitems.text, {flex:1}]} >Senaste tio träningarna (senaste först):</Text>
        </View>
        <Text style={{fontWeight:'400',marginLeft:10, marginBottom:10}} >{ getLastTen(stats) }</Text>
      </View>
    );
}

export default TrainingStats;

function getAttendance(stats) {
  const attending = stats.filter(training => training.attending).length;
  return Math.round(attending / stats.length * 1000) / 10;
}

function getLastTen(stats) {
  const lastTen = stats.slice(-10);
  const iconArray = lastTen.map((training,i) => {
    if (training.attending) {
      return (
        <Icon name="check-circle"
          key={i}
          size={metrics.icons.mediumsmall}
          style={[objects.listitems.icon,{color:colors.grassy}]}
        />
      );
    } else {
      return (
        <Icon name="cancel"
          key={i}
          size={metrics.icons.mediumsmall}
          style={[objects.listitems.icon,{color:colors.danger}]}
        />
      );
    }
  }).reverse();
  return iconArray;
}
