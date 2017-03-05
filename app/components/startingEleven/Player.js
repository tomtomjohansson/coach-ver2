import React from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Path, Text } from 'react-native-svg';
import { colors } from '../../themes';

export default function Player ({ name, position, size, system, shirtColor, shortsColor, onPress }) {

	const { width, height } = size;
	const 	playerHeight = '50',
			playerWidth = '100',
			fontSize = '16',
			screenW = Dimensions.get('window').width * 2,
			screenH = Dimensions.get('window').height * 2 + 96,
			ratio = (screenH / screenW === 0.5625) ? 0 : 5;

	let y = {
		GK: null,
		LCB: null,
		RCB: null,
		LB: null,
		RB: null,
		LCM: null,
		RCM: null,
		LM: null,
		RM: null,
		RST: null,
		LST: null
	};

	const x = {
		GK: width / 2 - (playerWidth / 2),
		LCB: width / 4.5,
		RCB: (width - (width / 4.5) - playerWidth),
		LB: width / 30,
		RB: (width - (width / 30) - playerWidth),
		LM: width / 11,
		LCM: width / 4.1,
		RCM: (width - (width / 4.1) - playerWidth),
		RM: (width - (width / 11) - playerWidth),
		LST: width / 4.5,
		RST: (width - (width / 4.5) - playerWidth)
	};

	switch (system) {
		case '4-4-2':
			y = {
				GK: height / 1.4 + ratio + 5,
				LCB: height / 1.75,
				RCB: height / 1.75,
				LB: height / 1.85,
				RB: height / 1.85,
				LCM: height / 2.65,
				RCM: height / 2.65,
				LM: height / 3.2,
				RM: height / 3.2,
				RST: height / 6 + ratio,
				LST: height / 6 + ratio
			};
	}

	const styles = {
		player: {
			alignItems: 'flex-start',
			justifyContent: 'flex-start',
			position: 'absolute',
			top: y[position],
			left: x[position]
		}
	};

	return (
		<View>
			<TouchableOpacity style={styles.player} onPress={() => onPress(position)}>
				<Svg height={playerHeight} width={playerWidth} viewBox="0 0 40 70">
					{/* SHIRT */}
					<Path
						d="M295.158,58.839c-0.608-1.706-1.873-3.109-3.521-3.873l-56.343-26.01c-11.985-4.06-24.195-7.267-36.524-9.611 c-0.434-0.085-0.866-0.126-1.292-0.126c-3.052,0-5.785,2.107-6.465,5.197c-4.502,19.82-22.047,34.659-43.251,34.659 c-21.203,0-38.749-14.838-43.25-34.659c-0.688-3.09-3.416-5.197-6.466-5.197c-0.426,0-0.858,0.041-1.292,0.126 c-12.328,2.344-24.538,5.551-36.542,9.611L3.889,54.965c-1.658,0.764-2.932,2.167-3.511,3.873 c-0.599,1.726-0.491,3.589,0.353,5.217l24.46,48.272c1.145,2.291,3.474,3.666,5.938,3.666c0.636,0,1.281-0.092,1.917-0.283 l27.167-8.052v161.97c0,3.678,3.001,6.678,6.689,6.678h161.723c3.678,0,6.67-3.001,6.67-6.678V107.66l27.186,8.052 c0.636,0.191,1.28,0.283,1.915,0.283c2.459,0,4.779-1.375,5.94-3.666l24.469-48.272C295.629,62.428,295.747,60.565,295.158,58.839z"
						scale="0.15"
						fill={shirtColor}
					/>
					{/* PLAYERNAME */}
					<Text
						fill={colors.semiPlusTransparentBlack}
						fontSize={fontSize}
						fontWeight="bold"
						y="44"
						x="20"
						textAnchor="middle"
					>{name.toUpperCase() || 'LÄGG TILL'}</Text>
				</Svg>
			</TouchableOpacity>
		</View>
	);

}
