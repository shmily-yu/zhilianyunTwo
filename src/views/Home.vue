<template>
  <div class>
    <keep-alive include="share">
      <router-view />
    </keep-alive>
    <tabBar />
  </div>
</template>

<script>
import tabBar from "@/components/tabbar";

export default {
  props: {},
  components: {
    tabBar
  },
  data() {
    return {};
  },

  computed: {},
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>

<style lang='less' scoped>
</style>