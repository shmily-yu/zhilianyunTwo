<template>
  <div class="detail ex-head">
    <navBar :name="navBar.name" :pathName="navBar.pathName" :right="navBar.right" />
    <div class="title">{{obj.title}}</div>
    <div class="info u-f u-f-jsb">
      <div class="eye">
        <span class="icon iconfont icon-yanjing"></span>
        <span>{{obj.read_nums}}</span>
      </div>
      <div class="time">{{addtime(obj.add_time)}}</div>
    </div>
    <div class="u-f-ajc">
      <img :src="obj.imgurl" class="bigpic" />
    </div>
    <div class="word" v-html="obj.content"></div>
    <div class="end u-f-ajc">END</div>
    <div class="u-f-ajc">
      <img src="../../assets/img/gungxian2.png" class="img" alt />
    </div>
    <newsBar :word="word" :right="right" class="newsbar" />
    <!-- list -->
    <van-list
      :immediate-check="false"
      class="newlist"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div v-for="(item, index) in list" :key="index">
        <router-link
          :to="{name:'newsdetail', params: {id:item.id,createcode:$route.params.createcode,mobile_phone:$route.params.mobile_phone}}"
        >
          <newsItem :item="item" />
        </router-link>
      </div>
    </van-list>
    <!-- 浮窗 -->
    <float />
  </div>
</template>

<script>
import float from "../../components/float";
import navBar from "../../components/nav-bar";
import newsBar from "../../components/newsbar";
import { getDate } from "../../tools/index.js";
import newsItem from "../../components/news-item";

export default {
  props: {},
  components: {
    navBar,
    newsBar,
    float,
    newsItem
  },
  data() {
    return {
      word: "相关资讯",
      right: false, //是否显示右侧更多
      navBar: {
        name: "资讯详情",
        pathName: "news",
        right: true
      },
      loading: false,
      finished: false,
      obj: {},
      list: []
    };
  },
  computed: {
    mobile() {
      return window.atob(this.$route.params.mobile_phone); //解密
    }
  },
  methods: {
    addtime(val) {
      return getDate(val);
    },
    onLoad() {
      let data = {
        id: this.$route.params.id,
        mobile_phone: this.mobile, //base64解密
        createcode: this.$route.params.createcode
      };
      this.$api.getDetailData(data).then(res => {
        if (res) {
          this.obj = res.Response.news_info;
          this.list = res.Response.rand_news; //将数组一次性全部赋值,这里不用page
          this.loading = false; // 加载状态结束
          this.finished = true; //加载完成后不再触发load事件，同时出现'没有更多了'文字提示
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
.newsbar {
  padding: 15px 0;
}
.newlist {
  margin-bottom: 140px;
  padding: 0 50px;
}
// 主图
.bigpic {
  margin-top: 10px;
  width: 690px;
  height: 416px;
  border-radius: 10px;
}
</style>