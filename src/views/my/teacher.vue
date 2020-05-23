<template>
  <div class="teacher ex-head u-f-ajc">
    <navBar :name="navBar.name" :pathName="navBar.pathName" :right="navBar.right" />
    <div class="box">
      <!-- 名字-->
      <div class="head_box">
        <div class="name">讲师: &#8195 {{obj.user_name}}</div>
      </div>
      <div class="u-f-jsb u-f item">
        <div>{{obj.true_name}}</div>
        <div>{{obj.mobile_phone}}</div>
      </div>

      <!--二维码  -->
      <div class="u-f-ajc">
        <img :src="obj.wechat_img" alt class="code" />
      </div>
      <div class="u-f-ajc text">微信二维码</div>
    </div>
  </div>
</template>

<script>
import navBar from "../../components/nav-bar";
import { mapState } from "vuex";

export default {
  name: "teacher",
  props: {},
  components: { navBar },
  data() {
    return {
      navBar: {
        name: "专属讲师",
        pathName: "my",
        right: false
      },
      obj: {}
    };
  },
  computed: { ...mapState(["mobile_phone"]) },
  methods: {
    getData() {
      let data = { mobile_phone: this.mobile_phone };
      this.$api.getTeacher(data).then(res => {
        if (res) {
          this.obj = res.Response;
          console.log(res);
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
.teacher {
  position: relative;
  background: url("../../assets/img/客户信息 拷贝.png") no-repeat;
  background-size: contain;
}
.ex-head {
  height: calc(100vh - 46px);
  padding-top: 46px;
}
.box {
  position: absolute;
  width: 520px;
  height: 1087px;
}
.head_box {
  position: relative;
  padding: 60px 0;
}
.name {
  font-size: 55px;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}

.item {
  padding: 28px 0;
  font-size: 30px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.code {
  width: 400px;
  height: 400px;
  margin-top: 100px;
}
.text {
  padding: 30px 0;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
}
</style>