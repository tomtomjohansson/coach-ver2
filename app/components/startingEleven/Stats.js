import React from 'react';
import { View, Text } from 'react-native';
import Button from '../../common/Button';

export default function Stats ({ eleven, bench, formation, onButton }) {
	return (
		<View style={{ flexDirection: 'row', height: 75 }}>
			<View style={{flex:1,justifyContent: 'center',marginLeft:10}}>
				<Text>Spelare i startelvan: {eleven.length}/11</Text>
				<Text>Spelare på bänken: {bench.length}</Text>
			</View>
			<View style={{flex:1,justifyContent: 'center',marginRight:10,marginTop:10}}>
				<Button buttonType="cta" text={formation} onPress={() => onButton()} />
			</View>
		</View>
	);
}
