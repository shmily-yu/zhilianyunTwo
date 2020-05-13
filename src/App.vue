<template>
  <div id="app">
    <keep-alive include="share">
      <router-view />
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
  name: "App",
  components: {
    Loading
  }
};
</script>

<style lang="less">
</style>
