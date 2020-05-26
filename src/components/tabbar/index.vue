<template>
  <div>
    <van-tabbar v-model="active" :border="false" active-color="#1989fa" inactive-color="#8E8D8E">
      <!-- 设置默认选中颜色有两种方法 -->
      <!-- replace 是否在跳转时替换当前页面历史 -->
      <van-tabbar-item v-for="(item, index) in list" :key="index" :name="item.name" :to="item.path">
        <span>{{item.span}}</span>
        <template>
          <!-- #icon="props" -->
          <!-- :style="{color:props.active?'blue':'#999999'}" -->
          <div class="icon" :class="item.class"></div>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  mounted() {},
  watch: {
    $route: {
      handler: function(to, from) {
        let p = to.name;
        if (p === "my" || p === "home") {
          this.active = p;
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      active: "home",
      list: [
        {
          name: "home",
          span: "首页",
          class: "icon iconfont icon-shouye",
          path: "/home"
        },
        {
          name: "my",
          span: "我的",
          class: "icon iconfont icon-wode",
          path: "/my"
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.van-tabbar {
  background: #252429;
  height: 98px;
  .icon {
    font-size: 38px;
  }
}
</style>