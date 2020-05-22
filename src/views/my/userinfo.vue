<template>
  <div class="userinfo ex-head">
    <navBar :name="navBar.name" :pathName="navBar.pathName" :right="navBar.right" />
    <div v-for="(item, index) in list" :key="index" class="u-f u-f-jsb item">
      <div class="u-f-ac">{{item.name}}</div>
      <div class="u-f-ac">
        <span v-if="item.img!=''">
          <van-uploader :after-read="afterRead" :before-read="beforeRead" :max-count="1">
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
import navBar from "../../components/nav-bar/index.vue";
import { mapState } from "vuex";
import { compressImage } from "../../tools/index";
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
      pic: "", //头像
      list: [
        {
          name: "头像",
          info: "",
          img: this.pic ? this.pic : require("../../assets/img/头像.png")
        },
        { name: "姓名", info: this.obj.true_name, img: "" },
        { name: "手机号", info: this.obj.mobile_phone, img: "" },
        { name: "子公司", info: this.obj.comp_name, img: "" }
      ]
    };
  },
  computed: { ...mapState(["mobile_phone"]) },
  methods: {
    // 上传图片前调用压缩方法
    beforeRead(file) {
      return new Promise((resolve, reject) => {
        let img = compressImage(file);
        resolve(img);
      });
    },
    // 上传图片
    afterRead(img) {
      // console.log(img); //这只是一个普通对象
      // 不管是file还是bold,都转成file文件
      let name = new Date().getTime(); //通过时间来给图片命名
      let file = new File([img.file], `${name}.jpg`, {
        type: img.file.type
      });
      let data = new FormData();
      data.append("mobile_phone", this.mobile_phone);
      data.append("file", file);
      this.$api.getPic(data).then(res => {
        if (res) {
          sessionStorage.removeItem("pic");
          sessionStorage.setItem("pic", JSON.stringify(res.Response));
          this.list[0].img = res.Response;
        }
      });
    }
  },
  beforeCreate() {
    this.obj = JSON.parse(sessionStorage.getItem("obj"));
    this.pic = JSON.parse(sessionStorage.getItem("pic"));
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