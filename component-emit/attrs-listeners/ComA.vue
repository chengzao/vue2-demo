<template>
  <div>
    <com-b
      :name="name"
      :age="age"
      title="哈哈哈"
    ></com-b>
  </div>
</template>
<script>
const ComB = () => import("./ComB.vue");
export default {
  components: { ComB },
  data() {
    return {
      name: "小明",
      age: "18",
    };
  }
};
</script>
