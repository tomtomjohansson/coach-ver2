// Dependencies
import React, {Component} from 'React';
import {View} from 'react-native';
import { DefaultRenderer, Actions as NavigationActions } from 'react-native-router-flux';
// Components, containers
import Drawer from 'react-native-drawer';
import DrawerContainer from '../components/drawer/DrawerContainer';
// Styles
import {drawer, overlay} from './styles/navigationDrawerStyle';

class NavigationDrawer extends Component {
  render() {
    const {onNavigate} = this.props;
    const state = this.props.navigationState;
    const {children} = state;
    return (
      <Drawer
        ref="navigation"
        open={state.open}
        onOpen={() => NavigationActions.refresh({key: state.key, open: true})}
        onClose={() => {
          this.refs.shadowOverlay.setNativeProps({
          style: {zIndex:-1}});
          return NavigationActions.refresh({key: state.key, open: false});
        }}
        content={<DrawerContainer />}
        type="overlay"
        tapToClose
        openDrawerOffset={0.25}
        panCloseMask={0.2}
        closedDrawerOffset={-6}
        styles={drawer}
        tweenEasing= "easeOutSine"
        tweenDuration={350}
        tweenHandler={(ratio) => {
          this.refs.shadowOverlay.setNativeProps({
          style: {opacity: ((ratio * 1.0) / 2),zIndex:((ratio * 1.0) / 2)}});
          return {
            drawer: { shadowRadius: Math.min(ratio * 5 * 5, 5) },
          };
        }}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={onNavigate} />
        <View ref="shadowOverlay" style={overlay.overlay} />
      </Drawer>
    );
  }
}

export default NavigationDrawer;
