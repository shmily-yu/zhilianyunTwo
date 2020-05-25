<template>
  <div class>
    <router-link
      :to="{name:'newsdetail', params: {id:item.id,createcode:code,mobile_phone:mobile}}"
    >
      <div class="news_item u-f u-f-jsb">
        <div class="news_item_left">
          <div class="news_item_title">{{item.title}}</div>
          <div class="news_item_bottom u-f u-f-jsb">
            <div class="news_item_bottom_left u-f-ac">
              <div class="icon iconfont icon-yanjing"></div>
              <div class="news_item_look">{{item.read_nums}}</div>
            </div>
            <div class="news_item_time">{{addtime(item.add_time)}}</div>
          </div>
        </div>
        <div class="news_item_right">
          <img :src="item.imgurl" alt />
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getDate } from "../../tools/index.js"; //外部引入的方法要重新注册，不要加this
export default {
  props: {
    item: Object
  },
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(["code", "mobile_phone"]),
    mobile() {
      return window.btoa(this.mobile_phone); //base64加密
    }
  },
  methods: {
    addtime(val) {
      return getDate(val);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>

<style lang='less' scoped>
.news_item {
  height: 180px;
  margin-top: 20px;
  // 左边样式
  .news_item_left {
    width: 430px;
    padding: 20px 0px 0 0px;
    // 标题
    .news_item_title {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 430px;
      height: 110px;
      font-size: 30px;
      font-weight: 500;
      color: rgba(243, 243, 247, 1);
    }
    // 时间 人数
    .news_item_bottom {
      height: 50px;
      font-size: 26px;
      font-weight: 500;
      color: rgba(106, 106, 106, 1);
      //眼睛图标
      .icon-yanjing {
        font-size: 30px;
        margin-right: 10px;
      }
    }
  }
  // 右边图片样式
  .news_item_right {
    padding: 23px 0 19px 29px;
    img {
      width: 229px;
      height: 138px;
      border-radius: 10px;
    }
  }
}
</style>




