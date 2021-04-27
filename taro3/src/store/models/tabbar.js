export default {
  state: {
    selected: 0
  }, // initial state
  reducers: {
    // handle state changes with pure functions
    updateState(state, payload) {
      return Object.assign({}, state, payload);
    }
  },
  effects: {
    // handle state changes with impure functions.
    // use async/await for async actions
  }
};
