<template>
  <div class="about ex-head">
    <navBar :name="navBar.name" :pathName="navBar.pathName" :right="navBar.right" />
    <div class="u-f-ajc">
      <img class="img" src="../../assets/img/LOGO.png" alt />
    </div>
    <div class="u-f-ajc text"></div>
  </div>
</template>

<script>
import navBar from "../../components/nav-bar";

export default {
  props: {},
  components: {
    navBar
  },
  data() {
    return {
      navBar: {
        name: "关于我们",
        pathName: "my",
        right: false
      }
    };
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
.about {
  background: url("../../assets/img/我的推荐 拷贝.png") no-repeat;
  background-size: 100% 100%;
}
.ex-head {
  height: calc(100vh - 46px);
  padding-top: 46px;
}
.img {
  width: 193px;
  height: 193px;
  margin-top: 100px;
}
.text {
  flex-direction: column;
  font-size: 28px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 48px;
}
</style>