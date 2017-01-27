import initialState from './initialState';

export default function gameReducer(state = initialState.games, action) {
  switch (action.type) {
    default:
      return state;
  }
}