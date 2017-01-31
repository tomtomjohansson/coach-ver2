import React from 'react';
import { TouchableOpacity } from 'react-native';
import styles from './styles/navigationContainerStyle';
import { Actions as NavigationActions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { metrics } from '../themes';

const openDrawer = () => {
  NavigationActions.refresh({
    key: 'drawer',
    open: true
  });
};

export default {
  backButton () {
    return (
      <TouchableOpacity onPress={NavigationActions.pop}>
        <Icon name="keyboard-backspace"
          size={metrics.icons.medium}
          style={styles.leftButton}
        />
      </TouchableOpacity>
    );
  },

  hamburgerButton () {
    return (
      <TouchableOpacity onPress={openDrawer}>
        <Icon name="menu"
          size={metrics.icons.medium}
          style={styles.leftButton}
        />
      </TouchableOpacity>
    );
  },

  closeButton () {
    return (
      <TouchableOpacity onPress={NavigationActions.pop}>
        <Icon name="close"
          size={metrics.icons.medium}
          style={styles.leftButton}
        />
      </TouchableOpacity>
    );
  }

};
