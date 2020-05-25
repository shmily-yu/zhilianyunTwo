<template>
  <div class="acc">
    <logo :text="'欢迎查询！'" />
    <van-form @submit="onSubmit">
      <van-field
        left-icon="manager"
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
        left-icon="lock"
        v-model="form.code"
        name="查询码"
        placeholder="查询码"
        type="number"
        :disabled="codeFlag"
        :rules="[{ required: true, message: '请填写查询码' }]"
      >
        <template #button>
          <phoneCode @openInput="openInput" :ready="ready" :form="form" />
        </template>
      </van-field>
      <div class="btn">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          :disabled="empty||!ready/*只要有一个是真,按钮就失效*/"
        >查询</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import phoneCode from "../../components/phone-code";
import logo from "../../components/logo";
import { reg, hasEmpty } from "../../tools/index.js";

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
        datacenter_id: "2"
      }
    };
  },
  computed: {
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
    openInput() {
      this.codeFlag = false;
    },
    onSubmit() {
      sessionStorage.setItem("data", JSON.stringify(this.form));
      this.$router.push("/result");
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
  margin: 50px 30px 0;
}
</style>