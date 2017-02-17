// Dependencies
import React, {Component} from 'React';
import {Alert, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {deleteTraining, updateTraining} from '../../actions/trainingActions';
import {goToRoute} from '../../actions/routeActions';
import autobind from 'autobind-decorator';
// Components
import UpdateDelete from '../../common/UpdateDelete';
import PlayerItem from '../../common/PlayerItem';
// Styles
import {objects} from '../../themes';

@autobind
class SingleTrainingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attending: [...this.props.training.attending]
    };
  }
  checkPlayer(id) {
    const {attending} = this.state;
    const i = attending.indexOf(id);
    const newArr = (i + 1)  ? [...attending.slice(0,i),...attending.slice(i + 1)] : [...attending,id];
    this.setState({ attending: newArr });
  }
  deleteTraining() {
    this.props.dispatch(deleteTraining(this.props.training._id)).then(this.handleAJAXresponse);
  }
  updateTraining() {
    this.props.dispatch(updateTraining(this.props.training, this.state.attending)).then(this.handleAJAXresponse);
  }
  handleAJAXresponse(response) {
    if (response.success) {
      goToRoute('trainings',{},true);
    } else {
      Alert.alert('Något gick fel', response.message);
    }
  }
  render() {
    const {players} = this.props;
    const {attending} = this.state;
    return (
      <ScrollView style={[objects.screen.scrollViewContainer, {marginBottom: 0}]}>
        <UpdateDelete
          updateText="Spara närvaro"
          deleteText="Radera träning"
          onDeleteAction={this.deleteTraining}
          onUpdateAction={this.updateTraining}
        />
        {players.map((player,i) =>
          <PlayerItem key={i} index={i} player={player} onPress={this.checkPlayer} checkArray={attending} />
        )}
      </ScrollView>
    );
  }
}

function mapStateToProps(state,ownProps) {
  const training = state.trainings.find(t => ownProps.id === t._id);
  const {players} = state;
  return {
    training,
    players
  };
}
export default connect(mapStateToProps)(SingleTrainingContainer);
