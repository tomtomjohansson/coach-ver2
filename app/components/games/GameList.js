import React from 'React';
import {ListView,View,Text,TouchableOpacity} from 'react-native';
import moment from 'moment';
import 'moment/locale/sv.js';
moment.locale('sv');
import Icon from 'react-native-vector-icons/MaterialIcons';
// Components
// Styles
import {objects,metrics} from '../../themes';

function GameList({games,onPress}) {
  return (
      <ListView style={[objects.screen.scrollViewContainer]}
        enableEmptySections
        dataSource={games}
        renderRow={(game,sectionId, index)=>{
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
                      { game.opponent.toUpperCase() }, <Text style={[objects.listitems.smallerText,{fontSize:12}]}> {game.venue}</Text>
                    </Text>
                  <Text style={objects.listitems.smallerText} >{ moment(game.date).format('dddd D MMMM HH:mm') }</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            );
          }
        }
        renderSectionHeader={(sectionData,category)=>{
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

export default GameList;