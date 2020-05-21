<template>
  <div class="userinfo ex-head">
    <navBar :name="navBar.name" :pathName="navBar.pathName" :right="navBar.right" />
    <div v-for="(item, index) in list" :key="index" class="u-f u-f-jsb item">
      <div class="u-f-ac">{{item.name}}</div>
      <div class="u-f-ac">
        <span v-if="item.img!=''">
          <van-uploader :after-read="afterRead" :max-count="1">
            <img class="img" :src="item.img" />
          </van-uploader>
        </span>
        <span v-if="item.info!=''">{{item.info}}</span>
        <span class="icon iconfont icon-jiantou" />
      </div>
    </div>
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
        name: "个人信息",
        pathName: "my",
        right: false
      },

      obj: {},
      list: [
        {
          name: "头像",
          info: "",
          img: this.obj.imgurl
            ? this.obj.imgurl
            : require("../../assets/img/头像.png")
        },
        { name: "姓名", info: this.obj.true_name, img: "" },
        { name: "手机号", info: this.obj.mobile_phone, img: "" },
        { name: "子公司", info: this.obj.comp_name, img: "" }
      ]
    };
  },
  computed: {},
  methods: {
    // 上传图片
    afterRead(file) {
      console.log(file);
      let data = new FormData();
      data.append("mobile_phone", this.obj.mobile_phone);
      data.append("file", file.file);
      this.$api.getPic(data).then(res => {
        if (res) {
          this.list[0].img = res.Response;
        }
      });
    }
  },
  beforeCreate() {
    this.obj = JSON.parse(sessionStorage.getItem("obj"));
  }
};
</script>

<style lang='less' scoped>
.userinfo {
  background: url("../../assets/img/我的推荐 拷贝.png") no-repeat;
  background-size: 100% 100%;
}
.ex-head {
  height: calc(100vh - 46px);
  padding-top: 46px;
}
.item {
  padding: 60px 50px;
  font-size: 28px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.icon-jiantou {
  padding-left: 40px;
  font-size: 30px;
}
.img {
  width: 110px;
  height: 110px;
  border-radius: 50%;
}
</style>