<template>
  <div class="section">
    <com-child :articles="articleList" @onEmitIndex="onEmit"></com-child>
    <p>Click Current Line Index: {{currentIndex}}</p>
  </div>
</template>

<script>
import comChild from "./Child.vue";
export default {
  name: "ComParent",
  components: { comChild },
  data() {
    return {
      currentIndex: -1,
      articleList: ["红楼梦", "西游记", "三国演义"]
    };
  },
  methods: {
    onEmit(idx) {
      this.currentIndex = idx
    }
  }
};
</script>
