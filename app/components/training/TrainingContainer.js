// Dependencies
import React, {Component} from 'React';
import {connect} from 'react-redux';
import {ListView,Alert,View,Text} from 'react-native';
import {Actions as NavigationActions} from 'react-native-router-flux';
import {getTrainings} from '../../actions/trainingActions';
// Components
import AddItemBottom from '../../common/AddItemBottom';
import TrainingList from './TrainingList';
// Styles
import {objects} from '../../themes';

class TrainingContainer extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    this.state = {
      trainings: this.ds.cloneWithRowsAndSections({})
    }
  }
  componentWillMount() {
    const upcoming = this.props.trainings
      .filter(training => !training.attending.length)
      .sort((a,b) => new Date(a.date) - new Date(b.date));
    const done = this.props.trainings
      .filter(training => training.attending.length)
      .sort((a,b) => new Date(b.date) - new Date(a.date));
    const trainingsMap = {
      'Kommande':upcoming,
      'Genomförda': done
    };
    this.setState({trainings: this.ds.cloneWithRowsAndSections(trainingsMap)});
  }
  openModal() {
    NavigationActions.addTraining();
  }
  render() {
    const {trainings} = this.state;
    return (
      <View style={[objects.screen.mainContainer]}>
        <TrainingList trainings={trainings} />
        <AddItemBottom text="Lägg till träning" openModal={this.openModal} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {trainings} = state;
  return {
    trainings
  };
}

export default connect(mapStateToProps)(TrainingContainer);
