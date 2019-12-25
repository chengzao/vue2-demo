<template>
  <div class="about">
    <h1>{{ msg }} - {{ info }}</h1>
    <p>{{ count }}</p>
    <button class="m20" @click="Add">+</button>
    <button class="m20" @click="Dec">-</button>
    <button class="m20" @click="incrementAsync">async +1</button>
    <button class="m20" @click="addStep(2)">async +2</button>
    <p>{{ txt }}</p>
  </div>
</template>
<script>
import { mapMutations, mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      msg: "other page"
    };
  },
  methods: {
    ...mapMutations({
      Add: "increment",
      Dec: "decrement"
    }),
    ...mapActions(["incrementAsync", "addStep"])
  },
  computed: {
    ...mapState({
      info: state => state.msg,
      count: state => state.count,
      txt: state => state.todo.txt
    })
  }
};
</script>

<style>
.m20 {
  margin: 20px;
}
</style>
