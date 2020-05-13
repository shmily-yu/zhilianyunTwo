<template>
  <div class="home u-f-ajc">
    <div class="first u-f-ajc">林沐风</div>
    <button @click="getIndex">点击请求</button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["set_token"]),
    getIndex() {
      let data = {
        mobile_phone: "16657030107",
        password: "111111",
        login_type: 0,
        code: "0648"
      };
      this.$api.getIndexShow(data).then(res => {
        console.log(res); //直接拿到数据
      });
    }
  },
  mounted() {
    let data = {
      mobile_phone: "16657030107",
      password: "111111",
      login_type: 0,
      code: "0648"
    };
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
</style>
