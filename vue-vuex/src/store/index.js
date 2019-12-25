import Vue from "vue";
import Vuex from "vuex";

import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import todo from "./module-todo";

Vue.use(Vuex);

export default () => {
  const store = new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {
      todo
    }
  });
  return store;
};
