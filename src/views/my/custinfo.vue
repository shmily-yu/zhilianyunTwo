<template>
  <div class="custinfo ex-head u-f-ajc">
    <navBar :name="navBar.name" :pathName="navBar.pathName" :right="navBar.right" />
    <div class="box">
      <!-- 名字和状态 -->
      <div class="head_box">
        <div class="conect_type u-f-ajc" :class="obj.is_talk==='是'?'already_bg':'none_bg'">
          <span>{{obj.is_talk==='是'?'已沟通':'未沟通'}}</span>
        </div>
        <div class="name">{{obj.true_name}}</div>
      </div>
      <!-- list -->
      <div class="u-f-jsb u-f item" v-for="(item, index) in list" :key="index">
        <div>{{item.name}}</div>
        <div>{{item.info}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "../../components/nav-bar";
import { mapState } from "vuex";

export default {
  props: {},
  components: { navBar },
  data() {
    return {
      navBar: {
        name: "信息客户",
        pathName: "recommend",
        right: false
      },
      obj: {},
      list: [
        { name: "手机号", info: "mobile_phone" },
        { name: "注册时间", info: "reg_time" },
        { name: "初步沟通", info: "is_talk" },
        { name: "讲师姓名", info: "teacher_true_name" },
        { name: "讲师培训", info: "is_teachering" },
        { name: "讲师成交状态", info: "is_teachering_end" },
        { name: "踢单员姓名", info: "ti_true_name" },
        { name: "踢单员成交状态", info: "ti_status_msg" },
        { name: "合同", info: "ht_count" }
      ]
    };
  },
  computed: { ...mapState(["mobile_phone"]) },
  methods: {
    getUser() {
      let data = {
        user_id: this.$route.query.user_id,
        mobile_phone: this.mobile_phone
      };
      this.$api.getUserInfo(data).then(res => {
        if (res) {
          this.obj = res.Response;
          for (let key in this.obj) {
            for (let item of this.list) {
              if (item.info == key) {
                item.info = this.obj[key]; //注意:拿对象的value用obj[]
              }
            }
          }
          // console.log(this.list);
        }
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getUser();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>

<style lang='less' scoped>
.custinfo {
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
  width: 588px;
  height: 1087px;
}
.head_box {
  position: relative;
  padding: 60px 0;
  border-bottom: 2px dashed #ffffff;
}
.name {
  font-size: 55px;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}
.already_bg {
  background: url("../../assets/img/weigoutong.png") no-repeat;
  background-size: cover;
}
.none_bg {
  background: url("../../assets/img/lanse.png") no-repeat;
  background-size: cover;
}
.conect_type {
  position: absolute;
  width: 128px;
  height: 65px;
  right: -50px;
  top: 80px;
  font-size: 28px;
  span {
    padding: 8px 0 0;
  }
}
.item {
  padding: 28px 0;
  font-size: 30px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
</style>