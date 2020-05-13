<template>
  <div class="home u-f-ajc">
    <div class="first u-f-ajc">林沐风</div>
    <button @click="getIndex">点击请求</button>
    <van-uploader :after-read="afterRead" />
    <div class="u-f-ajc">
      <img :src="imgUrl" alt />
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      imgUrl: "",
      data: {
        mobile_phone: "16657030107",
        password: "111111",
        login_type: 0,
        code: "0648"
      }
    };
  },
  methods: {
    ...mapMutations(["set_token"]),
    getIndex() {
      let data = this.data;
      this.$api.getIndexShow(data).then(res => {
        console.log(res); //直接拿到数据
      });
    },
    // 上传图片注意
    afterRead(file) {
      let data = new FormData();
      data.append("mobile_phone", "16657030107");
      data.append("file", file.file);
      console.log(data);
      this.$api.getPic(data).then(res => {
        console.log(res);
        this.imgUrl = res;
      });
    }
  },
  mounted() {
    let data = this.data;
    // 不用再加Code的判断来弹出提示框了
    this.$api.getLogin(data).then(res => {
      this.$toast("登录成功");
      this.set_token(res);
    });
  }
};
</script>
<style lang="less" scoped>
.home {
  height: 100vh;
  flex-direction: column;
}
.first {
  font-size: 23px;
  color: black;
}
img {
  width: 200px;
  height: 200px;
}
</style>
