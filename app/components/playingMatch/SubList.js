// Dependencies
import React from 'React';
import {View,Text,TouchableOpacity,ScrollView} from 'react-native';
// Components
import PlayerItem from '../../common/PlayerItem';
// Styles
import {objects,colors,metrics} from '../../themes';

export default function SubList({playing,bench,selectedIn,selectedOut,onPressIn,onPressOut}) {
    return (
    <ScrollView style={[objects.screen.scrollViewContainer, {marginBottom:10,marginTop:-10}]}>
      <View style={[objects.listitems.header]} >
        <Text style={[objects.listitems.headerText]} > SPELARE ATT BYTA UT </Text>
      </View>
      {playing.map((player,i) =>
        <PlayerItem key={i} index={i} player={player} onPress={onPressOut} checkArray={selectedOut} />
      )}
      <View style={[objects.listitems.header]} >
        <Text style={[objects.listitems.headerText]} > SPELARE ATT BYTA IN </Text>
      </View>
      {bench.map((player,i) =>
        <PlayerItem key={i} index={i} player={player} onPress={onPressIn} checkArray={selectedIn} />
      )}

    </ScrollView>
  );
}
