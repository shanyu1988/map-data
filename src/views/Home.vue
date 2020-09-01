<template>
<div class="main">
  <h1>赣榆区站点分布</h1>
  <gan-yu></gan-yu>
</div>
</template>

<script>
  import GanYu from "@/components/map/map"
export default {
  name: "Home",
  components: {
    GanYu
  }
};
</script>
<style lang="scss" scoped>
  .main{
    width: 100%;
    height: 100%;
    background-color: #1c1c1c;
  }
</style>