<template>
  <div class="section">
    <com-child :articles="articleList"></com-child>
  </div>
</template>

<script>
import comChild from "./Child.vue";
export default {
  name: "ComParent",
  components: { comChild },
  data() {
    return {
      articleList: ["红楼梦", "西游记", "三国演义"]
    };
  }
};
</script>
