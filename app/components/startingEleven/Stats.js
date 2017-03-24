import React from 'react';
import { View, Text } from 'react-native';
import Button from '../../common/Button';

export default function Stats ({ bench, formation, onButton }) {
	return (
		<View style={{ flexDirection: 'row', height: 75 }}>
			<View style={{flex:3,justifyContent: 'center',marginHorizontal:10}}>
				<Text><Text style={{fontWeight: '600'}}>{(bench.length > 0) ? 'Bänk:' : null}</Text><Text> {bench.map((player, i) => {
					let result = '';
					const shortName = player.name.split(' ');
					shortName[0] = shortName[0].substring(0, 1);
					result = shortName.join(' ');
					return (i === bench.length - 1) ? result : `${result}, `;
				})}</Text>
				</Text>
			</View>
			<View style={{flex:1,justifyContent: 'center',marginRight:10,marginTop:10}}>
				<Button buttonType="cta" text={formation} onPress={() => onButton()} />
			</View>
		</View>
	);
}
