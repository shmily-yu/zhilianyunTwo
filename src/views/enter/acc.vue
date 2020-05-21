<template>
  <div class="acc">
    <logo :text="'登录'" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.mobile_phone"
        name="手机号"
        placeholder="手机号"
        type="tel"
        :rules="[{ required: true, message: '请填写手机号' },{ pattern:phone_reg, message: '请输入正确手机号' }]"
      />
      <van-field
        v-model="form.password"
        name="密码"
        placeholder="密码"
        type="password"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <router-link class="forget" :to="{name:'forget'}">忘记密码</router-link>
      <div class="btn">
        <van-button round block type="info" native-type="submit" :disabled="empty">登录</van-button>
      </div>
      <router-link class="phonelogin" :to="{name:'phone'}">验证码登录</router-link>
      <router-link class="signup" :to="{name:'signup'}">还未注册?</router-link>
    </van-form>
  </div>
</template>

<script>
import logo from "../../components/logo";
import { reg, hasEmpty } from "../../tools/index.js";
import { mapState, mapMutations } from "vuex";

export default {
  components: { logo },
  data() {
    return {
      phone_reg: reg.phone,
      form: {
        mobile_phone: "",
        password: "",
        get_type: 0
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
    ...mapMutations(["set_token", "set_mobile_phone"]),
    onSubmit() {
      let data = this.form;
      this.$api.getLogin(data).then(res => {
        // 做一下空值判断，不然如果密码错误会报错，因为请求失败是不返回res的 ，是undefined
        if (res) {
          this.set_token(res.Response);
          this.set_mobile_phone(data.mobile_phone);
          this.$router.push("/");
        } else {
          console.log(res);
        }
      });
    },
    //退出登录跳转过来则清除token和手机号
    clear() {
      localStorage.removeItem("token");
      sessionStorage.removeItem("mobile_phone");
      this.form.mobile_phone = "";
    }
  },
  created() {
    this.form.mobile_phone = this.mobile_phone;
  },
  mounted() {
    if (this.$route.query.info === "exit") {
      this.clear_user_info();
    }
  }
};
</script>

<style lang='less' scoped>
.van-form {
  padding: 0 70px;
}
.acc {
  height: 100%;
  width: 100%;
  background: #000;
}
.van-cell {
  padding: 30px 30px;
}
.btn {
  margin: 50px 30px 0;
}
.forget {
  float: right;
  font-size: 20px;
  padding: 10px 10px;
  margin: 10px;
  display: block;
  color: rgba(196, 196, 196, 1);
}
.phonelogin {
  text-align: center;
  font-size: 20px;
  margin: 30px 140px;
  display: block;
  color: rgba(196, 196, 196, 1);
}
.signup {
  text-align: center;
  font-size: 20px;
  margin: 400px 140px 0;
  display: block;
  color: rgba(196, 196, 196, 1);
}
</style>