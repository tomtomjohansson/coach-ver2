import React from 'React';
import { ListView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { removeGame } from '../../actions/gameActions';
import moment from 'moment';
import 'moment/locale/sv.js';
moment.locale('sv');
import Icon from 'react-native-vector-icons/MaterialIcons';
// Components
// Styles
import {objects,metrics} from '../../themes';

function GameList({ games, onPress, dispatch }) {
  return (
      <ListView style={[objects.screen.scrollViewContainer]}
        enableEmptySections
        dataSource={games}
        renderRow={(game, sectionId, index)=>{ // eslint-disable-line
          return (
            <TouchableOpacity index={index} onPress={()=>onPress(game._id,game.ended,game.players.length)} >
              <View style={[objects.listitems.container, {height: 64}, checkUneven(index)]} >
                <View style={{flexDirection:'row', alignItems: 'center'}} >
                  <Icon name="directions-run"
                    size={metrics.icons.medium}
                    style={objects.listitems.icon}
                  />
                  <View>
                    <Text style={[objects.listitems.text,objects.listitems.biggerText]} >
                      <Text>{ game.opponent.toUpperCase() },</Text>
                      <Text style={[objects.listitems.smallerText,{fontSize:12}]}> { game.venue }</Text>
                    </Text>
                  <Text style={objects.listitems.smallerText} >{ moment(game.date).format('dddd D MMMM HH:mm') }</Text>
                  </View>
                </View>
                <Icon name="delete"
                    size={metrics.icons.medium}
                    style={objects.listitems.iconDelete}
                    onPress={() => deleteGame(game._id, dispatch)}
                  />
              </View>
            </TouchableOpacity>
            );
          }
        }
        renderSectionHeader={(sectionData,category)=>{ // eslint-disable-line
          return (
            <View style={[objects.listitems.header]} >
              <Text style={[objects.listitems.headerText]} >{category.toUpperCase()}</Text>
            </View>
          );
        }}
      />
  );
}

function checkUneven(i) {
  return i % 2 !== 0 ? objects.listitems.green : objects.listitems.white;
}

function deleteGame(gameID, dispatch) {
  Alert.alert(
    'Är du säker?',
    'Data som raderas går inte att återfås.',
    [
      { text: 'Avbryt'},
      { text: 'Ta bort match', onPress: () => dispatch(removeGame(gameID)).then((res) => handleAJAXresponse(res)) },
    ]
  );
}

function handleAJAXresponse(response) {
  if (!response.success) {
    Alert.alert('Matchen raderades inte', response.message);
  }
}

export default GameList;
