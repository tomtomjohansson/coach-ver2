import React from 'React';
import { View, Text } from 'react-native';
import { colors } from '../themes';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import roundToTwo from './scripts/roundToTwo';

export default function PlayerCard ({title = '',number = 0,total = 0,noBar = false}) {
	const percentage = (number / total) * 100;

	const styles = {
		container: {
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			position: 'absolute',
			width: 100,
			height: 100,
			top: 0,
			left: 0,
		},
		noBar: {
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			width: 100,
			height: 100,
		},
		text: {
			fontSize: (title.length < 8) ? 16 : 10,
			fontWeight: '600',
			textAlign: 'center'
		},
		number: {
			fontSize: 24,
			color: colors.darkBlue,
		}
	};

	if (noBar) {
		return (
			<View style={styles.noBar}>
				<Text style={styles.text}>
					{ title }
				</Text>
				<Text style={[styles.text, styles.number]}>
					{ (isNaN(number)) ? 0 : roundToTwo(number) }
				</Text>
			</View>
		);
	}
	return (
		<AnimatedCircularProgress
			size={100}
			width={10}
			fill={percentage || 0}
			tintColor={colors.grassy}
			backgroundColor={colors.neutral}
		>
			{
				(fill) => (
					<View style={styles.container}>
						<Text style={styles.text}>
							{ title }
						</Text>
						<Text style={[styles.text, styles.number]}>
							{ roundToTwo(number) }
						</Text>
					</View>
				)
			}
		</AnimatedCircularProgress>
	);
}
