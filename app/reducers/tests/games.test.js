import * as actions from '../../actions/gameActions';
import gameReducer from '../gameReducer';

describe('Game Reducer', ()=>{
  it('should replace game when passed SAVE_ELEVEN_SUCCESS',()=>{
    const initialState = [
      {opponent: 'HBK',_id:1},
      {opponent: 'IFK',_id:2},
      {opponent: 'The old team',_id:3},
      {opponent: 'GBG',_id:4}
    ];
    const updatedGame = {opponent:'The updated team',_id:3};
    const action = actions.saveElevenSuccess(updatedGame);
    const newState = gameReducer(initialState, action);
    expect(newState.length).toEqual(4);
    expect(newState[2].opponent).toBe('The updated team');
  });
});
