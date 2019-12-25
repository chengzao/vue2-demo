<template>
  <div class="home">
    <HelloWorld msg="A Vue.js App" />
    <p>{{ txt }}</p>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("todo");

export default {
  name: "home",
  components: {
    HelloWorld
  },
  computed: {
    ...mapState(["txt"])
  }
};
</script>
