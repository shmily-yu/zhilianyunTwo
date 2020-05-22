<template>
  <div class>
    <div class="user_info u-f-ac u-f-jsb">
      <div class="img_box">
        <img :src="obj.imgurl" @error="obj.imgurl=pic" />
      </div>
      <div class="intro">
        <div class="name u-f-ac">
          {{obj.true_name}}
          <span class="tell">{{obj.mobile_phone}}</span>
        </div>
        <div class="comp">{{obj.comp_name}}</div>
      </div>
      <div class="btn u-f-ajc">
        <div class="u-f-ajc" @click="save">
          <router-link :to="{name:'userinfo'}">编辑</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    obj: Object
  },
  components: {},
  data() {
    return {
      pic: require("../../assets/img/头像.png")
    };
  },
  computed: {},
  methods: {
    save() {
      sessionStorage.setItem("obj", JSON.stringify(this.obj));
      sessionStorage.setItem("pic", JSON.stringify(this.obj.imgurl));
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>

<style lang='less' scoped>
.user_info {
  height: 198px;
  margin: 20px 0 0;
  background: url("../../assets/img/bg.png") no-repeat;
  background-size: contain;
}
.img_box {
  width: 110px;
  height: 110px;
  margin-left: 25px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: #8293dfd7 8px solid;
  }
}
.intro {
  margin-top: 10px;
  margin-right: 40px;
  margin-left: 10px;
}
.name {
  font-size: 40px;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  .tell {
    font-size: 28px;
    font-weight: 500;
    margin-left: 40px;
    margin-top: 10px;
  }
}
.comp {
  height: 40px;
  margin-top: 20px;
  font-size: 26px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.btn {
  margin-right: 20px;
  div {
    font-size: 24px;
    width: 90px;
    height: 50px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
  }
}
a {
  color: #0081fa;
}
</style>