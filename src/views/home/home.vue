<template>
  <div class="home">
    <Search />
    <Swiper :list="imgList" />
    <noticeBar :text="text" :id="notice_id" />
    <newsBar :word="word" :right="right" />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div v-for="(item, index) in list" :key="index">
        <router-link
          :to="{name:'newsdetail', params: {id:item.id,createcode:code,mobile_phone:mobile}}"
        >
          <newsItem :item="item" />
        </router-link>
      </div>
    </van-list>
  </div>
</template>

<script>
import noticeBar from "../../components/noticebar/index";
import Search from "../../components/search/index";
import Swiper from "../../components/swiper/index";
import newsBar from "../../components/newsbar";
import { mapState, mapMutations } from "vuex";
import newsItem from "../../components/news-item";

export default {
  name: "home",
  components: {
    newsItem,
    Search,
    Swiper,
    noticeBar,
    newsBar
  },
  data() {
    return {
      loading: false,
      finished: false,

      word: "热点资讯",
      right: true, //是否显示右侧 更多
      text: "", //公告
      imgList: [], //轮播图
      notice_id: 0, //公告id
      list: [] //列表
    };
  },
  computed: { ...mapState(["mobile_phone", "code"]),
  mobile() {
      return window.btoa(this.mobile_phone); //加密
    } },
  methods: {
    
    onLoad() {
      let data = { mobile_phone: this.mobile_phone };
      this.$api.getHome(data).then(res => {
        if (res) {
          this.list = res.Response.news; //将数组一次性全部赋值,这里不用page
          this.loading = false; // 加载状态结束
          this.finished = true; //加载完成后不再触发load事件，同时出现'没有更多了'文字提示
        }
      });
    },

    ...mapMutations(["set_code"]),
    // 获取首页非列表以外的信息
    getData() {
      let data = { mobile_phone: this.mobile_phone };
      this.$api.getHome(data).then(res => {
        if (res) {
          let obj = res.Response;
          this.imgList = obj.lunbos;
          this.text = obj.content_text;
          this.notice_id = obj.notice_id;
        } else {
          console.log(res);
        }
      });
    },
    //获取邀请码
    getShare() {
      let data = { mobile_phone: this.mobile_phone };
      this.$api.getShare(data).then(res => {
        if (res) {
          this.set_code(res.Response.createcode);
        }
      });
    }
  },
  created() {
    this.getData();
    this.getShare();
  }
};
</script>

<style lang='less' scoped>
.home {
  background: #252429;
  padding: 0 20px;
}

.van-pull-refresh {
  margin-bottom: 50px;
}
/deep/.van-list__placeholder {
  margin-bottom: 50px;
}
</style>