<template>
  <div class="result">
    <div class="u-f-ajc title">查询结果</div>
    <div class="u-f-ajc">
      <div class="center">
        <div class="name u-f-ac">
          托管数据中心:
          <span>{{obj.datacenter_cn_name}}</span>
        </div>
        <div class="address">
          <div>数据中心地址:</div>
          <span>{{obj.address}}</span>
        </div>
        <div class="time">查询日期：{{formatDate(new Date().getTime(), 'YY/MM/DD')}}</div>
      </div>
    </div>
    <div class="node u-f-ac">
      <van-icon name="card" color="#2f63d9" />节点数
    </div>
    <div class="u-f-ajc list">
      <div class="point" v-for="(item, index) in list" :key="index">
        <div>{{item.datacenter_cn_name + item.china_name}}</div>
        <div>
          <span>编号:</span>
          {{item.kj_sn}}
        </div>
        <div>{{item.china_name}} {{item.jigui_number}}列 {{item.jigui_number}}号柜 {{item.jixiang_num}}号机 {{item.jiediannum}}节点</div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "../../tools/index.js";
export default {
  data() {
    return {
      obj: {},
      list: []
    };
  },
  computed: {
    formatDate() {
      return formatDate;
    }
  },
  created() {
    let data = JSON.parse(sessionStorage.getItem("data"));
    this.$api.getResult(data).then(res => {
      if (res) {
        this.obj = res.Response.hetong_info;
        this.list = res.Response.kjlists;
      }
    });
  }
};
</script>

<style lang='less' scoped>
.result {
  min-height: 100vh;
  background: url("../../assets/img/我的推荐 拷贝.png");
  background-size: 100% 100%;
}
.list {
  flex-direction: column;
  padding-bottom: 20px;
}
.title {
  height: 100px;
  color: #fff;
  font-size: 40px;
}
.center {
  color: #fff;
  width: 600px;
  height: 300px;
  margin: 40px 0 0;
  padding: 20px 40px;
  border-radius: 20px;
  .name {
    font-size: 36px;
    margin: 40px 0 20px;
    height: 60px;
    padding: 10px 0;
    border-bottom: 2px solid #fff;
    span {
      margin-left: 20px;
      font-size: 30px;
    }
  }
  .address {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    div {
      padding: 0px 0 6px;
    }
    font-size: 36px;
    margin: 20px 0 20px;
    height: 80px;
    padding: 10px 0px 26px;
    border-bottom: 2px solid #fff;
    span {
      padding: 16px 0 16px;
      font-size: 30px;
    }
  }
  .time {
    font-size: 24px;
    color: #999;
    text-align: right;
  }
}
.node {
  color: #fff;
  padding: 80px 40px 40px;
  font-size: 35px;
  /deep/.van-icon-card {
    font-size: 50px;
    margin-right: 10px;
  }
}
.point {
  width: 600px;
  height: 200px;
  margin: 20px 0;
  background: #fff;
  padding: 20px 40px;
  border-radius: 20px;
}
.point > div:nth-child(1) {
  color: #2f63d9;
  font-size: 38px;
}
.point > div:nth-child(2) {
  color: #999;
  padding: 20px 0 10px;
  font-size: 30px;
}
.point > div:nth-child(3) {
  padding: 20px 0 10px;
  font-size: 34px;
}
</style>