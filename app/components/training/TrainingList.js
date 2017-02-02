import React from 'React';
import {ListView,View,Text} from 'react-native';
import moment from 'moment';
// Components
import PlayerItem from '../../common/PlayerItem';
// Styles
import {objects} from '../../themes';

function PlayerList({trainings}) {
  // console.log(trainings)
  return (
      <ListView style={[objects.screen.scrollViewContainer]} 
        dataSource={trainings}
        renderRow={(rowData)=>{
          return (
            <View style={[objects.listitems.container]} >
              <Text>{ moment(rowData.date).format('YYYY-MM-DD HH:mm') }</Text>
            </View>
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

export default PlayerList;