// Dependencies
import React, {Component} from 'React';
import {View,Text} from 'react-native';
import {Actions as NavigationActions} from 'react-native-router-flux';
// Components
import AddItemBottom from '../../common/AddItemBottom';
// Styles
import {objects} from '../../themes';

class TrainingContainer extends Component {
  constructor(props) {
    super(props);
  }
  openModal() {
    NavigationActions.addTraining();
  }
  render() {
    return (
      <View style={[objects.screen.mainContainer]}>
        <AddItemBottom text="Lägg till träning" openModal={this.openModal} />
      </View>
    );
  }
}

export default TrainingContainer;
