export default {
  incrementAsync({ commit }) {
    setTimeout(() => {
      commit("increment", 1);
    }, 1000);
  },
  addStep({ commit }, num) {
    setTimeout(() => {
      commit("increment", num);
    }, 1000);
  }
};
