<template>
  <div class="my">
    <userInfo :obj="obj" />
    <div v-for="(item, index) in list" :key="index">
      <router-link :to="{path:item.path,query:item.info}">
        <div class="user_part u-f u-f-jsb">
          <div class="u-f-ac">
            <i class="part_icon" :class="item.img"></i>
            <i class="part_name">{{item.part}}</i>
          </div>
          <div class="u-f-ac">
            <i v-if="item.info==='count'" class="count">{{obj.count}}人</i>
            <i v-if="item.info==='dot'" class="dot"></i>
            <i class="icon iconfont icon-jiantou"></i>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import userInfo from "../../components/userinfo";
import { mapState } from "vuex";

export default {
  components: {
    userInfo
  },
  data() {
    return {
      obj: {},
      list: [
        {
          img: "icon iconfont icon-tuijian",
          part: "我的推荐",
          info: "count",
          path: "/recommend"
        },
        {
          img: "icon iconfont icon-xiazai",
          part: "我的专属讲师",
          info: " ",
          path: "/teacher"
        },
        {
          img: "icon iconfont icon-13",
          part: "分享",
          info: "dot",
          path: "/share"
        },
        {
          img: "icon iconfont icon-mimasuo",
          part: "密码",
          info: "",
          path: "/change"
        },
        {
          img: "icon iconfont icon-guanyu",
          part: "关于我们",
          info: "",
          path: "/about"
        },
        {
          img: "icon iconfont icon-tuichu",
          part: "退出账户",
          info: { info: "exit" },
          path: "/acc"
        }
      ]
    };
  },
  computed: { ...mapState(["mobile_phone"]) },
  methods: {
    getData() {
      let data = { mobile_phone: this.mobile_phone };
      this.$api.getMyInfo(data).then(res => {
        if (res) {
          this.obj = res.Response;
        }
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getData();
  }
};
</script>

<style lang='less' scoped>
.my {
  padding: 0 20px;
}
i {
  display: block;
  font-style: normal;
}
.user_part {
  margin: 20px 20px 0;
  color: #ffffff;
  height: 120px;
}
.dot {
  width: 15px;
  height: 15px;
  background: rgba(255, 82, 122, 1);
  border-radius: 50%;
}
.icon-jiantou {
  font-size: 40px;
  padding: 0 0 0 26px;
}
.count {
  font-size: 30px;
}
.part_icon {
  font-size: 50px;
  margin-right: 20px;
}
.part_name {
  font-size: 30px;
}
</style>