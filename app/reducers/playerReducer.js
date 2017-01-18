import initialState from './initialState';

export default function playerReducer(state = initialState.players, action) {
  switch (action.type) {
    default:
      return state;
  }
}
