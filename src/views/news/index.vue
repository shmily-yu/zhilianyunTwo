<template>
  <div class="news">
    <div class="u-f-ac head">
      <router-link :to="{name:'home'}">
        <span class="icon iconfont icon-jiantou-copy" />
      </router-link>
      <van-search
        left-icon
        background="#252429"
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <template #action>
          <div @click="onSearch" class="icon iconfont icon-search"></div>
        </template>
      </van-search>
    </div>
    <van-tabs
      title-active-color="#ffffff"
      title-inactive-color="#ffffff"
      background="#252429"
      color="#1989fa"
      v-model="active"
      :border="false"
      @click="onClick"
      animated
    >
      <van-tab
        v-for="(item, index) in tabList"
        :title="item.type_name"
        :name="item.id"
        :key="index"
        line-height="6"
        line-width="10"
      >
        <!-- 列表 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="box">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
          >
            <div v-for="(item, index) in list" :key="index">
              <newsItem :item="item" />
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import newsItem from "../../components/news-item";
import { mapState } from "vuex";
export default {
  props: {},
  components: { newsItem },
  data() {
    return {
      value: "",
      active: "", //选中的tab
      zx_type: "", //资讯类型
      loading: false,
      finished: false,
      refreshing: false,
      page: 1,
      list: [],
      tabList: []
    };
  },
  computed: { ...mapState(["mobile_phone"]) },
  methods: {
    // 资讯类型
    getType() {
      let data = { mobile_phone: this.mobile_phone };
      this.$api.getNewType(data).then(res => {
        if (res) {
          this.tabList = res.Response;
          this.active = this.tabList[0].type_name;
          this.zx_type = this.tabList[0].id;
          this.onLoad();
        }
      });
    },
    onLoad() {
      let data = {
        zx_type: this.zx_type,
        mobile_phone: this.mobile_phone,
        page: this.page
      };
      this.$api.getListData(data).then(res => {
        //   如果下拉刷新开启，数组清空后，下拉刷新关闭
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }
        if (res) {
          this.list.push(...res.Response);
          this.page += 1; //参数page+1
          this.loading = false;
          if (res.Response.length == 0) {
            this.finished = true;
          }
        }
      });
    },
    onSearch(val) {
      this.$router.push({ name: "search", query: { val: val } });
    },
    onClick(name) {
      this.list = [];
      this.finished = false;
      this.loading = true;
      this.zx_type = name; //重置参数一:资讯类型
      this.page = 1; //重置参数二:当前页数
      this.onLoad();
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.page = 1; //重置参数page
      this.onLoad();
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getType();
  }
};
</script>

<style lang='less' scoped>
.icon-jiantou-copy,
.icon-search {
  color: #fff;
  font-size: 34px;
  padding: 0 20px;
}
.van-search {
  width: 100%;
  .van-field__left-icon {
    background: #274684;
  }
  .van-search__content {
    background: #333;
  }
  //   输入框里字体颜色
  /deep/.van-field__control {
    color: #ffffff;
  }
}
.head {
  background: #252429;
}
.box {
  padding: 0 40px;
}
/deep/.van-tab--active {
  font-size: 38px;
}
</style>