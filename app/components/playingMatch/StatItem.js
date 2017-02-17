// Dependencies
import React from 'React';
import {View,Text,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Styles
import {objects,colors,metrics} from '../../themes';

export default function StatItem({title,stat,statName,onPress,club,opponent}) {
  if (title === 'MÅL') {
    return (
      <View>
        <View style={[objects.listitems.header, {flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end'}]} >
          <Text style={[objects.listitems.headerText, {textAlign:'center',fontSize:16}]} >{ club.length < 10 ? club : `${club.slice(0,8)}.` }</Text>
          <Text style={[objects.listitems.headerText, {textAlign:'center'}]} >{title}</Text>
          <Text style={[objects.listitems.headerText, {textAlign:'center',fontSize:16}]} >{ opponent.length < 10 ? opponent : `${opponent.slice(0,8)}.` }</Text>
        </View>
        <View style={[objects.listitems.matchStats]} >
          <TouchableOpacity onPress={()=> onPress('for',statName)}>
            <Icon name="add-circle"
              size={metrics.icons.large}
              style={{color: colors.grassy}}
            />
          </TouchableOpacity>
          <Text> {stat.for} - {stat.against} </Text>
          <TouchableOpacity onPress={()=> onPress('against',statName)}>
            <Icon name="add-circle"
              size={metrics.icons.large}
              style={{color: colors.grassy}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <View style={[objects.listitems.header]} >
          <Text style={[objects.listitems.headerText, {textAlign:'center'}]} > {title} </Text>
        </View>
        <View style={[objects.listitems.matchStats]} >
          <TouchableOpacity onPress={()=> onPress('for',statName)}>
            <Icon name="add-circle"
              size={metrics.icons.large}
              style={{color: colors.grassy}}
            />
          </TouchableOpacity>
          <Text> {stat.for} - {stat.against} </Text>
          <TouchableOpacity onPress={()=> onPress('against',statName)}>
            <Icon name="add-circle"
              size={metrics.icons.large}
              style={{color: colors.grassy}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}
