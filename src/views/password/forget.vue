<template>
  <div class="acc ex-head">
    <navBar :name="navBar.name" :pathName="navBar.pathName" :right="navBar.right" />
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
        :disabled="codeFlag"
        :rules="[{ required: true, message: '请填写验证码' }]"
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
        >下一步</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import phoneCode from "../../components/phone-code";
import { reg, hasEmpty } from "../../tools/index.js";
import { mapState, mapMutations } from "vuex";
import navBar from "../../components/nav-bar";

export default {
  components: { phoneCode, navBar },
  data() {
    return {
      navBar: {
        name: "忘记密码",
        pathName: "acc",
        right: false
      },
      phone_reg: reg.phone, //正则
      ready: false,
      codeFlag: true, //验证码输入框是否禁用
      form: {
        get_type: 1,
        mobile_phone: "",
        code: ""
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
    ...mapMutations(["set_mobile_phone", "set_mobile_code"]),
    onSubmit() {
      this.set_mobile_phone(this.form.mobile_phone);
      this.set_mobile_code(this.form.code);
      this.$router.push("/forgetnext");
    }
  }
};
</script>

<style lang='less' scoped>
.ex-head {
  height: calc(100vh - 46px);
  padding-top: 46px;
}
.van-form {
  padding: 70px 70px 0;
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