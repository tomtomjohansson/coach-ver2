// Dependencies
import React from 'react';
import {View,Text} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Styles
import {objects, metrics} from '../themes';

export default function DateInput({
    date = Date.now(),
    mode = 'datetime',
    format = 'YYYY-MM-DD HH:mm',
    minDate = '2017-01-01',
    maxDate = '2017-12-31',
    minuteInterval = 5,
    onChangeDate
  }) {
  return (
    <View style={[objects.inputs.container]} >
      <Text style={[objects.inputs.label]} >Välj Datum*</Text>
      <DatePicker
        style={{width: undefined, height: 10}}
        date={date}
        mode={mode}
        placeholder="Välj datum"
        format={format}
        minDate={minDate}
        maxDate={maxDate}
        confirmBtnText="Välj"
        cancelBtnText="Avbryt"
        showIcon={false}
        minuteInterval={minuteInterval}
        is24Hour
        customStyles={{
          dateInput: {
            flex:1,
            marginHorizontal: 10,
            marginVertical: 5,
            paddingVertical: 0,
            borderRadius: 4,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderWidth: 0,
          },
          dateText: {
            margin:0,
            padding:0,
            fontSize: 16,
            fontStyle: 'italic'
          }
        }}
        onDateChange={onChangeDate}
      />
      <Icon name="date-range"
        size={metrics.icons.large}
        style={[objects.listitems.icon,{position:'absolute',right:0,bottom: 3}]}
      />
    </View>
  );
}
