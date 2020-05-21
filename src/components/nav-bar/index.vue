<template>
  <div class="navBar">
    <van-nav-bar
      :title="name"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      :border="false"
    >
      <template #right v-if="this.right">
        <van-icon name="more-o" size="18" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    pathName: String,
    right: Boolean
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.push({ name: this.pathName });
    },
    onClickRight() {
      if (this.right) {
        this.$toast("点击右上方分享");
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>

<style lang='less' scoped>
.navBar {
  position: absolute;
  top: 0;
  width: 100%;
}
</style>