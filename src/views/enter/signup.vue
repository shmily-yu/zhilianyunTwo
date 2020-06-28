<template>
  <div class="acc">
    <logo :text="'欢迎注册至联云'" />
    <van-form @submit="onSubmit">
      <van-field
        @input="checkPhone"
        v-model="form.mobile_phone"
        name="mobile_phone"
        placeholder="手机号"
        type="tel"
        :rules="[
        { required: true, message: '请填写手机号' },
        { pattern:phone_reg, message: '请输入正确手机号' }
        ]"
      />
      <van-field
        v-model="form.code"
        name="code"
        placeholder="验证码"
        type="number"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <template #button>
          <!-- <phoneCode @openInput="openInput" :ready="ready" :form="form" /> -->
          <phoneCode  :ready="ready" :form="form" />
        </template>
      </van-field>
      <van-field
        v-model="form.password"
        name="password"
        placeholder="密码"
        type="password"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="form.inviter_id"
        name="inviter_id"
        placeholder="邀请码"
        :rules="[{ required: true, message: '请填写邀请码' }]"
      />
      <van-field
        v-model="form.true_name"
        name="true_name"
        placeholder="姓名"
        :rules="[{ required: true, message: '请填写姓名' }]"
      />
      <div class="btn">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          :disabled="empty||!ready/*只要有一个是真,按钮就失效*/"
        >注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import phoneCode from "../../components/phone-code";
import logo from "../../components/logo";
import { reg, hasEmpty } from "../../tools/index.js";
import { mapMutations } from "vuex";

export default {
  components: { logo, phoneCode },
  data() {
    return {
      phone_reg: reg.phone, //正则
      ready: false,
      // codeFlag: true, //验证码输入框是否禁用
      form: {
        inviter_id: this.$route.query.createcode,
        mobile_phone: "",
        code: "",
        password: "",
        true_name: ""
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
    // openInput() {
    //   this.codeFlag = false;
    // },
    ...mapMutations(["set_mobile_phone"]),
    onSubmit(e) {
      console.log(e);
      this.$api.getSign(e).then(res => {
        console.log(res);
        if (res) {
          this.set_mobile_phone(e.mobile_phone);
          this.$router.push({name:'acc'})
        } else {
          console.log(res);
        }
      }).catch(err=>{console.log(err);})
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
</style>