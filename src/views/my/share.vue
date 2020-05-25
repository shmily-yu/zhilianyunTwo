<template>
  <div class="share ex-head u-f-ajc">
    <navBar class="nav" :name="navBar.name" :pathName="navBar.pathName" :right="navBar.right" />

    <div class="u-f-ajc box">
      <!-- html -->
      <div class="html" id="html">
        <div class="title u-f-ajc">您的邀请码为</div>
        <div class="u-f-ajc">
          <span class="code u-f-ajc">
            <span>{{obj.createcode}}</span>
          </span>
        </div>
        <div class="tip u-f-ajc">好友可在注册时直接填写邀请码</div>
        <div class="u-f-ajc imgbox">
          <img class="img" :src="obj.code_url" @load="loading" />
          <img class="angle angle_one" src="../../assets/img/形状 987 拷贝 10.png" alt />
          <img class="angle angle_two" src="../../assets/img/形状 987 拷贝 10.png" alt />
          <img class="angle angle_three" src="../../assets/img/形状 987 拷贝 10.png" alt />
          <img class="angle angle_four" src="../../assets/img/形状 987 拷贝 10.png" alt />
        </div>
      </div>

      <!-- img -->
      <img :src="img" id="img" v-show="flag" @load="flag=true" />
    </div>

    <div class="u-f-ajc toast">扫描二维码完成邀请注册</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import html2canvas from "html2canvas";
import { img2base64 } from "../../tools/index"; //转base64方法
import navBar from "../../components/nav-bar";
export default {
  name: "share",
  props: {},
  components: { navBar },
  data() {
    return {
      flag: false,
      navBar: {
        name: "分享",
        pathName: "my",
        right: false
      },
      img: "", //合成图片url
      obj: {
        code_url: "",
        createcode: ""
      }
    };
  },
  computed: { ...mapState(["mobile_phone"]) },
  methods: {
    // 获取后台
    getData() {
      let data = { mobile_phone: this.mobile_phone };
      this.$api.getShare(data).then(res => {
        if (res) {
          this.obj.createcode = res.Response.createcode; //邀请码
          let img = res.Response.code_url; //图片url
          img2base64(img, "Anonymous").then(res => {
            this.obj.code_url = res;
          });
        }
        console.log(this.obj);
      });
    },
    //后台返回来的二维码图片加载完成后，开始绘制canvas
    loading() {
      this.draw();
    },
    // 绘制canvas
    draw() {
      html2canvas(document.getElementById("html")).then(canvas => {
        document.createElement("canvas");
        this.img = canvas.toDataURL("image/png");
      });
    }
  },
  created() {
    this.getData();
  },
  mounted() {}
};
</script>

<style lang='less' scoped>
.share {
  background: url("../../assets/img/我的推荐 拷贝.png") no-repeat;
  background-size: 100% 100%;
  flex-direction: column;
}
.ex-head {
  min-height: calc(100vh - 46px);
  padding-top: 46px;
}

.box {
  position: relative;
}
// html
.html {
  z-index: -1;
  width: 608px;
  height: 873px;
  background: rgba(255, 255, 255, 1);
  // border-radius: 30px;
  border: 16px solid #0081fa;
}
.title {
  margin: 50px 0 20px;
  letter-spacing: 6px;
  height: 38px;
  font-size: 40px;
  font-weight: bold;
  color: rgba(18, 19, 37, 1);
}
.img {
  width: 377px;
  height: 377px;
  padding: 10px;
}
.code {
  margin: 20px 0 20px;
  width: 287px;
  height: 90px;
  background: rgba(229, 242, 254, 1);
  border-radius: 10px;
  span {
    font-size: 50px;
    font-weight: bold;
    color: rgba(0, 129, 250, 1);
  }
}
.tip {
  font-size: 24px;
  font-weight: 500;
  color: rgba(108, 108, 108, 1);
}
.imgbox {
  width: 387px;
  margin: 50px auto;
  position: relative;
  .angle {
    position: absolute;
    width: 40px;
    height: 40px;
  }
  .angle_one {
    left: 0;
    top: 0;
  }
  .angle_two {
    right: 0;
    top: 0;
    transform: rotate(90deg);
  }
  .angle_three {
    left: 0;
    bottom: 0;
    transform: rotate(-90deg);
  }
  .angle_four {
    right: 0;
    bottom: 0;
    transform: rotate(180deg);
  }
}
.toast {
  margin: 40px 0 0;
  color: #fff;
  font-size: 22px;
}

// img
#img {
  position: absolute;
  width: 608px;
  height: 873px;
}
</style>