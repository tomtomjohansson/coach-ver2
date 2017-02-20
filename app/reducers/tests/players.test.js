import * as actions from '../../actions/playerActions';
import playerReducer from '../playerReducer';

describe('Player Reducer', ()=>{
  it('should remove player when passed REMOVE_PLAYER_SUCCESS',()=>{
    const initialState = [
      {name: 'Tim',_id:1},
      {name: 'Tom',_id:2},
      {name: 'Bom',_id:3}
    ];
    const removePlayer = 2;
    const action = actions.removePlayerSuccess(removePlayer);
    const newState = playerReducer(initialState, action);
    expect(newState.length).toEqual(2);
    expect(newState[newState.length - 1].name).toBe('Bom');
  });
});
