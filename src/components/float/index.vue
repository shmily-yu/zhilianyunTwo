<template>
  <div class="float u-f-ac u-f-jsb" v-if="!mobile_phone">
    <div class="u-f">
      <img src="../../assets/img/logo (1).png" alt />
      <div class="center">
        <div class="linehead">至联云</div>
        <div class="intro">技术重构世界，数据引领未来。</div>
      </div>
    </div>
    <router-link :to="{name:'signup', query: {createcode:this.$route.params.createcode}}">
      <div class="join u-f-ajc">加入</div>
    </router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {},
  components: {},
  data() {
    return {};
  },
  computed: { ...mapState(["mobile_phone"]) },
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>

<style lang='less' scoped>
.float {
  position: fixed;
  bottom: 0;
  height: 140px;
  width: 100%;
  background: rgba(30, 29, 33, 1);
  img {
    width: 100px;
    height: 100px;
    margin-left: 50px;
  }
  .join {
    margin-right: 32px;
    width: 99px;
    height: 46px;
    background: rgba(0, 129, 250, 1);
    border-radius: 23px;
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
.center {
  margin-left: 30px;
  .linehead {
    margin-top: 10px;
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(0, 129, 250, 1);
    line-height: 36px;
  }
  .intro {
    margin-top: 10px;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(196, 196, 196, 1);
  }
}
</style>