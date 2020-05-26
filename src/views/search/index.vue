<template>
  <div class>
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
    <!-- 列表 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="list">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div v-for="(item, index) in list" :key="index">
          <router-link
            :to="{name:'newsdetail', params: {id:item.id,createcode:code,mobile_phone:mobile}}"
          >
            <newsItem :item="item" />
          </router-link>
        </div>
      </van-list>
    </van-pull-refresh>
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
      value: this.$route.query.val,
      loading: false,
      finished: false,
      refreshing: false,
      page: 1,
      list: []
    };
  },
  computed: { ...mapState(["mobile_phone", "code"]),mobile() {
      return window.btoa(this.mobile_phone); //加密
    }, },
  methods: {
    
    onLoad() {
      let data = {
        new_title: this.value,
        mobile_phone: this.mobile_phone,
        page: this.page
      };
      this.$api.getSearch(data).then(res => {
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
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.page = 1; //重置参数page
      this.onLoad();
    },
    onSearch() {
      this.page = 1;
      this.list = [];
      this.onLoad();
    }
  }
};
</script>

<style lang='less' scoped>
.list {
  margin: 0 50px;
}
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
    background: #333333;
  }
  //   输入框里字体颜色
  /deep/.van-field__control {
    color: #ffffff;
  }
}
.head {
  background: #252429;
}
.van-search__action:active {
  background: #252429;
}
</style>