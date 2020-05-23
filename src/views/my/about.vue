<template>
  <div class="about ex-head">
    <navBar :name="navBar.name" :pathName="navBar.pathName" :right="navBar.right" />
    <div class="u-f-ajc">
      <img class="img" src="../../assets/img/LOGO.png" alt />
    </div>
    <div class="text u-f-ajc" v-html="text"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import navBar from "../../components/nav-bar";

export default {
  name: "about",
  props: {},
  components: {
    navBar
  },
  data() {
    return {
      text: "",
      navBar: {
        name: "关于我们",
        pathName: "my",
        right: false
      }
    };
  },
  computed: { ...mapState(["mobile_phone"]) },
  methods: {
    getData() {
      let data = { mobile_phone: this.mobile_phone };
      this.$api.getAboutUs(data).then(res => {
        if (res) {
          this.text = res.Response;
        }
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getData();
  },
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
  min-height: calc(100vh - 46px);
  padding-top: 46px;
}
.img {
  width: 193px;
  height: 193px;
  margin-top: 100px;
}
.text {
  /deep/p {
    font-size: 16px;
    text-indent: 2em;
    span {
      text-indent: 2em;
    }
  }
  padding: 16px 20px 0;
  flex-direction: column;
  color: rgba(255, 255, 255, 1);
  line-height: 24px;
}
</style>