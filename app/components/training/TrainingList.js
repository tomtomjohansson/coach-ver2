import React from 'React';
import {ListView,View,Text,TouchableOpacity} from 'react-native';
import moment from 'moment';
import 'moment/locale/sv.js';
moment.locale('sv');
import Icon from 'react-native-vector-icons/MaterialIcons';
// Components
// Styles
import {objects,metrics} from '../../themes';

function TrainingList({trainings,onPress}) {
  return (
      <ListView style={[objects.screen.scrollViewContainer]}
        enableEmptySections
        dataSource={trainings}
        renderRow={(training,sectionId, index)=>{ // eslint-disable-line
          return (
            <TouchableOpacity index={index} onPress={()=>onPress(training._id)} >
              <View style={[objects.listitems.container, checkUneven(index)]} >
                <View style={{flexDirection:'row', alignItems: 'center'}} >
                  <Icon name="fitness-center"
                    size={metrics.icons.small}
                    style={objects.listitems.icon}
                  />
                  <Text style={objects.listitems.text} >{ moment(training.date).format('D/M, dddd HH:mm') }</Text>
                </View>
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

export default TrainingList;
