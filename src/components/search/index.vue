<template>
  <div class="search">
    <van-search @search="onSearch" v-model="value" background="#252429" placeholder="请输入搜索关键词" />
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      value: ""
    };
  },
  computed: {},
  methods: {
    onSearch(val) {
      this.$router.push({ name: "search", query: { val: val } });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>

<style lang='less' scoped>
.search {
  width: 100%;
}
.van-search {
  padding: 10px 0;
  .van-field__left-icon {
    background: #274684;
  }
  .van-search__content {
    background: #333;
  }
  //   输入框里字体颜色
  /deep/.van-field__control {
    color: #ffffff;
  }
}
</style>