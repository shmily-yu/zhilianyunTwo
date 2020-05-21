<template>
  <div class>
    <router-link :to="{name:'notice',query:{id:this.id}}">
      <van-notice-bar :text="text" left-icon="volume-o" color="#FFFFFF" background="#252429" />
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    id:Number
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
.van-notice-bar {
  margin: 0px 0 20px;
  height: 70px;
  
}
</style>