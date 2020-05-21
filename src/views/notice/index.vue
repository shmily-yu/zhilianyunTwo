<template>
  <div class="detail ex-head">
    <navBar :name="navBar.name" :pathName="navBar.pathName" :right="navBar.right" />
    <div class="title">{{obj.title}}</div>
    <div class="info u-f u-f-jsb">
      <div class="eye">
        <span class="icon iconfont icon-yanjing"></span>
        <span>{{obj.is_show}}</span>
      </div>
      <div class="time">作者：{{obj.author}}</div>
      <div class="time">{{addtime(obj.add_time)}}</div>
    </div>

    <div class="word" v-html="obj.content"></div>
    <div class="end u-f-ajc">END</div>
    <div class="u-f-ajc">
      <img src="../../assets/img/gungxian2.png" class="img" alt />
    </div>
  </div>
</template>

<script>
import navBar from "../../components/nav-bar";
import { getDate } from "../../tools/index.js";
import { mapState } from "vuex";

export default {
  props: {},
  components: {
    navBar
  },
  data() {
    return {
      navBar: {
        name: "公告详情",
        pathName: "home",
        right: false
      },
      obj: {}
    };
  },
  computed: { ...mapState(["mobile_phone"]) },
  methods: {
    addtime(val) {
      return getDate(val);
    },
    onLoad() {
      let data = {
        notice_id: this.$route.query.id,
        mobile_phone: this.mobile_phone
      };
      this.$api.getNoticeId(data).then(res => {
        console.log(res);
        if (res) {
          this.obj = res.Response;
        }
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.onLoad();
  }
};
</script>

<style lang='less' scoped>
.icon-yanjing {
  font-size: 30px;
  margin-right: 10px;
}

.detail {
  background: #333333;
}
.ex-head {
  height: calc(100% - 46px);
  padding-top: 46px;
}
.title {
  padding: 0 50px;
  font-size: 40px;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}
.info {
  padding: 10px 50px;
  font-size: 26px;
  font-weight: 500;
  color: rgba(106, 106, 106, 1);
}
.word {
  padding: 0 50px;
  font-size: 28px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 48px;
}
/deep/.word img {
  width: 100%;
  height: 100%;
}
.end {
  padding: 10px 0;
  font-size: 26px;
  font-weight: 500;
  color: rgba(196, 196, 196, 1);
}
.img {
  width: 370px;
  height: 30px;
  margin-left: 30px;
}
</style>