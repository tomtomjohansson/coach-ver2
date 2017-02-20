import * as actions from '../../actions/trainingActions';
import trainingReducer from '../trainingReducer';

describe('Player Reducer', ()=>{
  it('should update training when passed UPDATE_TRAINING_SUCCESS',()=>{
    const initialState = [
      {attending: [1,2,3,4],_id:1},
      {attending: [],_id:2},
      {attending: [1,2,3,4],_id:3}
    ];
    const deleteTraining = 2;
    const action = actions.deleteTrainingSuccess(deleteTraining);
    const newState = trainingReducer(initialState, action);
    expect(newState.length).toEqual(2);
    expect(newState[1].attending).toEqual([1,2,3,4]);
  });
});
