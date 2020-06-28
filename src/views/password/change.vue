<template>
  <div class="acc ex-head">
    <navBar :name="navBar.name" :pathName="navBar.pathName" :right="navBar.right" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.mobile_phone"
        readonly
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
          <phoneCode  :ready="true" :form="form" />
        </template>
      </van-field>
      <div class="btn">
        <van-button round block type="info" native-type="submit" :disabled="empty">下一步</van-button>
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
        name: "修改密码",
        pathName: "my",
        right: false
      },
      phone_reg: reg.phone, //正则
      form: {
        get_type: 1,
        mobile_phone: "",
        code: ""
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
    // 解禁验证码输入框
    openInput() {
      this.codeFlag = false;
    },
    ...mapMutations(["set_mobile_code"]),
    onSubmit() {
      this.set_mobile_code(this.form.code);
      this.$router.push("/changenext");
    }
  },
  created() {
    this.form.mobile_phone = this.mobile_phone;
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
  // height: 100vh;
  background: #000;
}
.van-cell {
  padding: 30px 30px;
}
.btn {
  width: 500px;
  margin: 50px auto;
}
</style>