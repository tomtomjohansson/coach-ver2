import React from 'React';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../../common/Button';
import { metrics, colors } from '../../themes';

export default function Timer ({calculateTime, buttonText, buttonText2, handleStartStop, halftime, btn2Disabled}) {
  return (
    <View style={{ flex: 1, marginTop: 10, flexDirection: 'row', alignItems: 'flex-start' }}>
      <View style={{ flex:1, marginLeft: 10 }} >
        <Button buttonType={'cta'} text={buttonText} onPress={handleStartStop} />
      </View>
      <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Icon name="timer" size={metrics.icons.medium} style={{ color: colors.greyishBlue }} />
        <Text style={{ fontSize: 32, color: colors.darkBlue }}>
          {calculateTime}
        </Text>
      </View>
      <View style={{ flex: 1, marginRight: 10 }} >
        <Button buttonType={'active'} text={buttonText2} onPress={halftime} disabled={btn2Disabled} />
      </View>
    </View>
  );
}
