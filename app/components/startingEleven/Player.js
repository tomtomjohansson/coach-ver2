import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Text, G } from 'react-native-svg';

export default function Player ({ name, position, size, system, shirtColor, shortsColor, onPress }) {

	const { width, height } = size;
	const 	playerHeight = '90',
			playerWidth = '80',
			fontSize = '12';

	let yPosition = {
		GKy: null, // Goalkeeper
		CBy: null, // Center Back
		FBy: null, // Full Back
		CMy: null, // Central Midfield
		OMy: null, // Outer Midfield
		STy: null  // Striker
	};

	switch (system) {
		case '4-4-2':
			yPosition = {
				GKy: height / 1.28,
				CBy: height / 1.7,
				FBy: height / 1.8,
				CMy: height / 3,
				OMy: height / 3.3,
				STy: height / 9
			};
	}

	const getYPosition = (pos) => {
		switch (pos) {
			case 'GK':
				return yPosition.GKy;
			case 'LCB':
				return yPosition.CBy;
			case 'RCB':
				return yPosition.CBy;
			case 'LB':
				return yPosition.FBy;
			case 'RB':
				return yPosition.FBy;
			case 'LM':
				return yPosition.OMy;
			case 'LCM':
				return yPosition.CMy;
			case 'RCM':
				return yPosition.CMy;
			case 'RM':
				return yPosition.OMy;
			case 'LST':
				return yPosition.STy;
			case 'RST':
				return yPosition.STy;
		}
	};

	const getXPosition = (pos) => {
		switch (pos) {
			case 'GK':
				return width / 2 - (playerWidth / 2);
			case 'LCB':
				return width / 4;
			case 'RCB':
				return (width - (width / 4) - playerWidth);
			case 'LB':
				return width / 20;
			case 'RB':
				return (width - (width / 20) - playerWidth);
			case 'LM':
				return width / 20;
			case 'LCM':
				return width / 4;
			case 'RCM':
				return (width - (width / 4) - playerWidth);
			case 'RM':
				return (width - (width / 20) - playerWidth);
			case 'LST':
				return width / 4;
			case 'RST':
				return (width - (width / 4) - playerWidth);
		}
	};

	const styles = {
		shirt: {
			alignItems: 'flex-start',
			justifyContent: 'flex-start',
			position: 'absolute',
			top: getYPosition(position),
			left: getXPosition(position)
		}
	};

	return (
		<View>
			<Svg height={playerHeight} width={playerWidth} style={styles.shirt} viewBox="-18 12 80 70">
				<G
					onPress={() => onPress(position)}
				>
				{/* SHIRT */}
				<Path
					d="M295.158,58.839c-0.608-1.706-1.873-3.109-3.521-3.873l-56.343-26.01c-11.985-4.06-24.195-7.267-36.524-9.611 c-0.434-0.085-0.866-0.126-1.292-0.126c-3.052,0-5.785,2.107-6.465,5.197c-4.502,19.82-22.047,34.659-43.251,34.659 c-21.203,0-38.749-14.838-43.25-34.659c-0.688-3.09-3.416-5.197-6.466-5.197c-0.426,0-0.858,0.041-1.292,0.126 c-12.328,2.344-24.538,5.551-36.542,9.611L3.889,54.965c-1.658,0.764-2.932,2.167-3.511,3.873 c-0.599,1.726-0.491,3.589,0.353,5.217l24.46,48.272c1.145,2.291,3.474,3.666,5.938,3.666c0.636,0,1.281-0.092,1.917-0.283 l27.167-8.052v161.97c0,3.678,3.001,6.678,6.689,6.678h161.723c3.678,0,6.67-3.001,6.67-6.678V107.66l27.186,8.052 c0.636,0.191,1.28,0.283,1.915,0.283c2.459,0,4.779-1.375,5.94-3.666l24.469-48.272C295.629,62.428,295.747,60.565,295.158,58.839z"
					scale="0.15"
					fill={shirtColor}
					stroke="black"
					strokeWidth="10"
				/>
				{/* SHORTS */}
				<Path
					d="M425.39,376.065c-0.355-6.908-8.861-169.808-23.691-225.707c-2.594-9.778-13.919-35.885-14.4-36.991 c-2.108-4.852-7.687-8.51-12.977-8.51H51.36c-5.277,0-10.866,3.64-12.999,8.466c-0.489,1.107-12.012,27.22-14.646,37.02 C8.703,206.203,0.362,369.16,0.014,376.07c-0.149,2.976,0.888,5.792,2.92,7.929s4.793,3.314,7.772,3.314h173.575 c5.824,0,10.981-4.523,11.739-10.298l14.062-107.07c0.105-0.802,1.073-1.661,1.883-1.67l0.748-0.009 c0.779,0,1.679,0.782,1.784,1.55L229.1,377.043c0.784,5.759,5.952,10.271,11.764,10.271h173.84c2.98,0,5.741-1.178,7.772-3.317 C424.508,381.858,425.542,379.041,425.39,376.065z M100.773,170.337l-15.151,66.413c-1.851,8.113-9.063,13.611-17.046,13.611 c-1.289,0-2.598-0.144-3.908-0.442c-9.423-2.149-15.319-11.531-13.169-20.954l15.151-66.413 c2.149-9.423,11.531-15.319,20.954-13.169C97.027,151.532,102.923,160.914,100.773,170.337z M353.68,249.918 c-1.31,0.299-2.62,0.442-3.908,0.442c-7.984,0-15.195-5.498-17.046-13.611l-15.151-66.413c-2.15-9.423,3.746-18.805,13.169-20.954 c9.423-2.149,18.804,3.747,20.954,13.169l15.151,66.413C368.999,238.387,363.103,247.769,353.68,249.918z"
					scale="0.075"
					origin="6.5, 36"
					fill={shortsColor}
					stroke="black"
					strokeWidth="10"
				/>
				{/* PLAYERNAME */}
				<Text
					fill="#eee"
					fontSize={fontSize}
					y="62"
					x="20"
					textAnchor="middle"
				>{name || '<Lägg till>'}</Text>
				</G>
			</Svg>
		</View>
	);

}
