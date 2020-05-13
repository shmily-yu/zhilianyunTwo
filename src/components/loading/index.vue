<template>
  <div class="loading u-f-ajc">
    <van-loading size="80" color="#1989fa" />
  </div>
</template>

<script>
export default {
  name: "Loading"
};
</script>

<style scoped lang="less">
.loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.712);
}
</style>
