<template>
  <div class>
    <div class="hot_news u-f u-f-jsb u-f-ac">
      <div class="hot_news_bg u-f-ac">
        <img src="../../assets/img/kuang.png" />
        <span class="hot_news_bg_word">{{word}}</span>
      </div>
      <div class="more_news" v-if="right">
        <router-link :to="{name:'news'}">更多</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    word:String,
    right:Boolean,
  },
  components: {},
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
.hot_news_bg {
  position: relative;
  img {
    width: 260px;
    height: 57px;
  }
  span {
    position: absolute;
    left: 42px;
    font-size: 36px;
    font-weight: bold;
    color: rgba(37, 36, 41, 1);
  }
}
//修改router link to里面a的样式
.more_news > a {
  font-size: 24px;
  font-weight: 500;
  color: rgba(196, 196, 196, 1);
}
.more_news > a:active {
  color: rgba(196, 196, 196, 0.746);
}
</style>