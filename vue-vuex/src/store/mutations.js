export default {
  increment: (state, num) => {
    state.count = num ? state.count + num : state.count++;
    return state;
  },
  decrement: state => state.count--
};
