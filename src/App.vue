<template>
  <div id="app">
    <keep-alive include="share">
      <router-view :key="$route.fullPath" />
    </keep-alive>
    <Loading v-show="LOADING"></Loading>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Loading from "@/components/loading";

export default {
  computed: {
    ...mapState(["LOADING"])
  },
  components: {
    Loading
  },
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
</style>

