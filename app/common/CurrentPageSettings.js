import React from 'react';
import { View, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { objects } from '../themes';

export default function CurrentPageSettings({ visible, toggle, children }) {
	return (
		<View>
			<Modal
				animationType="fade"
				transparent={true}
				visible={visible}
				onRequestClose={toggle}
			>
				<TouchableOpacity
					style={{flex:1}}
					activeOpacity={1}
					onPress={toggle}
				>
					<View>
						<TouchableWithoutFeedback>
							<View style={objects.settingsMenu.container}>
								{children}
							</View>
						</TouchableWithoutFeedback>
					</View>
				</TouchableOpacity>
			</Modal>
		</View>
	);
}
