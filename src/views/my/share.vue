<template>
  <div class="share">
    <div class="u-f-ajc head">
      <van-icon class="left_icon" name="arrow-left" @click="onClickLeft" size="22" color="#ffffff" />分享
    </div>

    <!-- 图片 -->
    <div class="img_box" v-show="!flag">
      <img :src="imgUrl" style="width:100%;height:100%" @load="shareLoad" />
    </div>
    <div class="u-f-ajc save_tip">长按图片即可保存个人二维码</div>

    <!-- canvas -->
    <div id="canvas" v-show="flag"></div>

    <!-- HTML -->
    <div id="box" class="box" v-show="flag">
      <div>
        <div class="u-f-ajc word_one">您的邀请码为</div>
        <div class="u-f-ajc">
          <span class="number u-f-ajc">{{createcode}}</span>
        </div>
        <div class="u-f-ajc word_two"></div>
        <div class="u-f-ajc">
          <div class="two_code">
            <img :src="code_url" @load="loading" />
            <!-- <img src="../../assets/img/浩瀚星空.jpg" alt /> -->
            <img class="angle angle_one" src="../../assets/img/形状 987 拷贝 10.png" alt />
            <img class="angle angle_two" src="../../assets/img/形状 987 拷贝 10.png" alt />
            <img class="angle angle_three" src="../../assets/img/形状 987 拷贝 10.png" alt />
            <img class="angle angle_four" src="../../assets/img/形状 987 拷贝 10.png" alt />
          </div>
        </div>
        <div class="u-f-ajc word_three">扫描二维码完成邀请注册</div>
      </div>
    </div>
  </div>
</template>
<script>
import html2canvas from "html2canvas";
import { mapState } from "vuex";
export default {
  name: "share",
  data() {
    return {
      time: "",
      flag: true,
      imgUrl: "",
      code_url: "",
      createcode: ""
    };
  },
  computed: {
    ...mapState(["mobile_phone"])
  },
  created() {
    this.$store.commit("showLoading");
    this.getData();
  },

  methods: {
    //后台返回来的二维码图片加载完成后，开始绘制canvas
    loading() {
      this.draw();
      this.flag = false;
    },
    //图片转换完成后，隐藏loading
    shareLoad() {
      this.$store.commit("hideLoading");
    },
    // 将图片转为base64格式
    img2base64(url, crossOrigin) {
      return new Promise(resolve => {
        const img = new Image();
        img.onload = () => {
          const c = document.createElement("canvas");
          c.width = img.naturalWidth;
          c.height = img.naturalHeight;
          const cxt = c.getContext("2d");
          cxt.drawImage(img, 0, 0);
          // 得到图片的base64编码数据
          resolve(c.toDataURL("image/png"));
        };
        // 结合合适的CORS响应头，实现在画布中使用跨域<img>元素的图像
        crossOrigin && img.setAttribute("crossOrigin", crossOrigin);
        img.src = url;
      });
    },

    getData() {
      let data = { mobile_phone: "13586401416" };
      this.$api.getShare(data).then(res => {
        console.log(res);
        //   let obj = res
        //   let image = obj.code_url; //要转成base64的图片
        //   this.img2base64(image, "Anonymous").then(res => {
        //     this.code_url = res;
        //   });
        this.$store.commit("hideLoading");
      });
    },
    onClickLeft() {
      this.$router.push("/my");
    },
    draw() {
      var that = this;
      html2canvas(document.getElementById("box")).then(function(canvas) {
        document.getElementById("canvas").appendChild(canvas);
        that.imgUrl = canvas.toDataURL("image/png");
      });
    }
  }
};
</script>
<style lang="less" scoped>
.save_tip {
  font-size: 2vh;
  color: #ffffff;
}
.word_three {
  padding: 4vh 0 0;
  color: #6c6c6c;
  font-size: 14px;
}

.word_two {
  padding: 10px 0;
  color: #6c6c6c;
  font-size: 14px;
  margin: 0 24px;
  border-bottom: 1px dashed #c4c4c4;
}
.number {
  border-radius: 6px;
  line-height: 24px;
  width: 60%;
  padding: 12px 20px;
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 6px;
  color: #0081fa;
  background: #e5f2fe;
}
.word_one {
  color: #121325;
  line-height: 24px;
  padding: 30px 0 10px;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 4px;
}
.share {
  background: url("../../assets/img/我的推荐 拷贝.png");
  background-size: 100% 100%;
  height: 100vh;
}
.head {
  position: relative;
  padding: 10px 0px;
  color: #ffffff;
  font-size: 18px;
}
.left_icon {
  position: absolute;
  left: 8px;
}
.img_box {
  margin: 8vh 4vh 6vh;
  height: 68vh;
  border-radius: 20px;
  border: 7px solid #0081fa;
  img {
    border-radius: 12px;
  }
}
.box {
  background: rgba(255, 255, 255, 0);
  margin: 10vh 4vh 6vh;
  height: 70vh;
  border-radius: 20px;
  // border: 7px solid #0081fa;
  color: #ffffff;
}

.two_code {
  position: relative;
  background: #ffffff;
  width: 30vh;
  height: 30vh;
  padding: 10px;
  margin-top: 20px;
  .angle {
    position: absolute;
    width: 3vh;
    height: 3vh;
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
  img {
    width: 100%;
    height: 100%;
  }
}
</style>