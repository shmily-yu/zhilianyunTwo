<template>
  <div class="swiper">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in list" :key="index">
        <router-link to>
          <img class="swipe_img" v-lazy="item.imgurl" />
        </router-link>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  props: {
    list: Array
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
.van-swipe {
  padding: 14px 0;
}

.swipe_img {
  height: 284px;
  width: 100%;
  border-radius: 10px;
}
</style>