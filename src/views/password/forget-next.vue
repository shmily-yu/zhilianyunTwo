<template>
  <div class="acc ex-head">
    <navBar :name="navBar.name" :pathName="navBar.pathName" :right="navBar.right" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.password"
        name="password"
        type="password"
        placeholder="请输入新密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="form.two"
        name="two"
        type="password"
        placeholder="请确认密码"
        :rules="[{ required: true, message: '请填写密码' },
        {validator:checkPwd,message:'两次密码不一致'}
        ]"
      />
      <div class="btn">
        <van-button round block type="info" native-type="submit" :disabled="empty">完成</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { hasEmpty } from "../../tools/index.js";
import { mapState } from "vuex";
import navBar from "../../components/nav-bar";

export default {
  components: { navBar },
  data() {
    return {
      navBar: {
        name: "忘记密码",
        pathName: "forget",
        right: false
      },
      form: {
        password: "",
        two: "",
        get_type: 2
      }
    };
  },
  computed: {
    ...mapState(["mobile_phone", "mobile_code"]),
    empty() {
      return hasEmpty(this.form);
    }
  },
  methods: {
    //两次密码一致校验
    checkPwd(val) {
      return this.form.password === val;
    },
    onSubmit() {
      let data = {
        ...this.form,
        code: this.mobile_code,
        mobile_phone: this.mobile_phone
      };
      this.$api.getPwd(data).then(res => {
        if (res) {
          this.$store.commit("set_mobile_phone", data.mobile_phone);
          this.$toast.success("修改成功");
          this.$router.push("/acc");
        } else {
          this.$router.push("/forget");
        }
      });
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