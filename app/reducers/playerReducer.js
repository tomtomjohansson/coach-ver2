import initialState from './initialState';

export default function playerReducer(state = {players: initialState.players}, action) {
  switch (action.type) {
    default:
      return state;
  }
}
