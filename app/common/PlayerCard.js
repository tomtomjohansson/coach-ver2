import React from 'React';
import { View, Text } from 'react-native';
import { colors } from '../themes';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import roundToTwo from './scripts/roundToTwo';

export default function PlayerCard ({title,number,total,noBar = false}) {
	const percentage = (number / total) * 100;
	if (noBar) {
		return (
			<View style={styles.noBar}>
				<Text style={styles.text}>
					{ title }
				</Text>
				<Text style={[styles.text, styles.number]}>
					{ roundToTwo(number) }
				</Text>
			</View>
		);
	}
	return (
		<AnimatedCircularProgress
			size={100}
			width={10}
			fill={percentage}
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

const styles = {
	container: {
		flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
		position: 'absolute',
		width: 100,
		height: 100,
		top: 0,
		left: 0
	},
	noBar: {
		flex: 1,
		flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
		width: 100,
		height: 100,
		marginTop: -20
	},
	text: {
		fontSize: 16,
		fontWeight: '600',
	},
	number: {
		fontSize: 24,
		color: colors.darkBlue,
	}
};
