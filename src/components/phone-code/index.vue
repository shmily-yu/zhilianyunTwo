<template>
  <div class="phoneCode">
    <van-button
      :disabled="wait||!ready/*只要有一个是真,按钮就失效*/"
      @click="getCode"
      native-type="button"
      size="small"
      type="info"
      class="u-f-ac"
    >{{msg}}</van-button>
  </div>
</template>

<script>
export default {
  props: { ready: Boolean, form: Object },
  components: {},
  data() {
    return { msg: "获取", wait: false, clock: 30 };
  },
  computed: {},
  methods: {
    //获取验证码
    getCode() {
      let data = this.form;
      this.$api.getPhoneCode(data).then(res => {
        this.wait = true; //验证码按钮失效，开始倒计时
        this.countdown();
        this.$toast.success("发送成功");
      });
      this.$emit("openInput", ""); //按下按钮，触发父组件的事件，使输入框解禁
    },
    // 重置倒计时
    countdown() {
      this.clock = 30;
      setInterval(() => {
        this.clock -= 1;
        this.msg = `${this.clock}秒后获取`;
        if (this.clock <= 0) {
          clearInterval(this.timer);
          this.wait = false;
          this.msg = "重新获取";
        }
      }, 1000);
    }
  }
};
</script>

<style lang='less' scoped>
.van-button--small {
  min-width: 82px;
  height: 50px;
  background: rgba(0, 129, 250, 1);
  border-radius: 10px;
  font-size: 26px;
  line-height: 0;
  /deep/span {
    display: flex;
    align-self: center;
    justify-content: center;
  }
}
</style>