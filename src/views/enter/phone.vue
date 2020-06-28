<template>
  <div class="acc">
    <logo :text="'欢迎登录至联云'" />
    <van-form @submit="onSubmit">
      <van-field
        @input="checkPhone"
        v-model="form.mobile_phone"
        name="手机号"
        placeholder="手机号"
        type="tel"
        :rules="[
        { required: true, message: '请填写手机号' },
        { pattern:phone_reg, message: '请输入正确手机号' }
        ]"
      />
      <van-field
        v-model="form.code"
        name="验证码"
        placeholder="验证码"
        type="number"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <template #button>
          <phoneCode  :ready="ready" :form="form" />
        </template>
      </van-field>
      <div class="btn">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          :disabled="empty||!ready/*只要有一个是真,按钮就失效*/"
        >登录</van-button>
      </div>
      <router-link class="phonelogin" :to="{name:'acc'}">密码登录</router-link>
    </van-form>
  </div>
</template>

<script>
import phoneCode from "../../components/phone-code";
import logo from "../../components/logo";
import { reg, hasEmpty } from "../../tools/index.js";
import { mapState, mapMutations } from "vuex";

export default {
  components: { logo, phoneCode },
  data() {
    return {
      phone_reg: reg.phone, //正则
      ready: false,
      codeFlag: true, //验证码输入框是否禁用
      form: {
        mobile_phone: "",
        code: "",
        get_type: 1
      }
    };
  },
  computed: {
    ...mapState(["mobile_phone"]),
    empty() {
      return hasEmpty(this.form);
    }
  },
  methods: {
    // input事件检测手机号码输入状态,如果正确则发送验证码按钮激活
    checkPhone(val) {
      this.phone_reg.test(val) ? (this.ready = true) : (this.ready = false);
    },
    // 解禁验证码输入框
    // openInput() {
    //   this.codeFlag = false;
    // },
    ...mapMutations(["set_token", "set_mobile_phone"]),
    onSubmit() {
      let data = this.form;
      this.$api.getLogin(data).then(res => {
        if (res) {
          this.set_token(res.Response);
          this.set_mobile_phone(data.mobile_phone);
          this.$router.push("/");
        } else {
          console.log(res);
        }
      });
    }
  },
  created() {
    if (this.mobile_phone != "undefined" && this.mobile_phone) {
      this.ready = true; // 如果已有账号，则发送验证码按钮直接激活
      this.form.mobile_phone = this.mobile_phone; // 如果是注册跳转过来，直接填写手机号
    }
  }
};
</script>

<style lang='less' scoped>
.van-form {
  padding: 0 70px;
}
.acc {
  height: 100vh;
  background: #000;
}
.van-cell {
  padding: 30px 30px;
}
.btn {
  margin: 50px auto;
  width: 500px;
}

.phonelogin {
  text-align: center;
  font-size: 20px;
  margin: 30px 140px;
  display: block;
  color: rgba(196, 196, 196, 1);
}
</style>