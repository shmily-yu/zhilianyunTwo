<template>
  <div class="recommend ex-head">
    <navBar :name="navBar.name" :pathName="navBar.pathName" :right="navBar.right" />
    <!-- tab切换 -->
    <div class="all">总人数:{{nums_all}}</div>
    <div class="step">初步沟通人数:{{talk_nums_all}}</div>
    <div class="u-f-jsb u-f type">
      <div v-for="(item, index) in type" :key="index">
        <div
          class="partName u-f-ajc"
          :class="{type_bg:typeIndex==index}"
          @click="changType(index)"
        >{{item.name}}</div>
      </div>
    </div>
    <!-- 列表 -->
    <div v-for="(item, index) in list[typeIndex].list" :key="index" class>
      <router-link :to="{name:'custinfo',query:{id:item.user_id}}">
        <div class="item">
          <div
            @click.prevent="changeStatus(item.user_id,index)"
            :class="item.is_talk===0?'already_bg':'none_bg'"
            class="u-f-ajc conect_type"
          >
            <span>{{item.is_talk===0?'未沟通':'已沟通'}}</span>
          </div>
          <div class="name">
            客户姓名
            <span>{{item.true_name}}</span>
          </div>
          <div class="phone">
            联系电话
            <span>{{item.mobile_phone}}</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import navBar from "../../components/nav-bar";
import { mapState } from "vuex";
export default {
  props: {},
  components: { navBar },
  data() {
    return {
      nums_all: "",
      talk_nums_all: "",
      typeIndex: 0,
      navBar: {
        name: "我的推荐",
        pathName: "my",
        right: false
      },
      type: [{ name: "全部" }, { name: "已沟通" }, { name: "未沟通" }],
      list: [
        { name: "all_infos", list: [] },
        { name: "in_talk_infos", list: [] },
        { name: "no_talk_infos", list: [] }
      ]
    };
  },
  computed: { ...mapState(["mobile_phone"]) },
  methods: {
    // 修改状态
    changeStatus(id) {
      let data = { mobile_phone: this.mobile_phone, user_id: id };
      this.$api.getStatus(data).then(res => {
        if (res) {
          console.log(res);
          this.$toast.success("已沟通");
          this.getData();
        }
      });
    },
    // tab切换
    changType(i) {
      this.typeIndex = i;
      // console.log(this.list[i].name);
    },
    getData() {
      let data = { mobile_phone: this.mobile_phone };
      this.$api.getMyInvite(data).then(res => {
        if (res) {
          this.nums_all = res.Response.nums_all;
          this.talk_nums_all = res.Response.nums_all;
          this.list[0].list = res.Response.all_infos;
          this.list[1].list = res.Response.in_talk_infos;
          this.list[2].list = res.Response.no_talk_infos;
        }
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getData();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>

<style lang='less' scoped>
.recommend {
  height: 100%;
  background: url("../../assets/img/我的推荐 拷贝.png") no-repeat;
  background-size: 100% 100%;
}
.ex-head {
  padding-top: 46px;
  padding-bottom: 40px;
  min-height: 100vh;
}

.step,
.all {
  padding: 10px 60px;
  font-weight: 500;
  font-size: 36px;
  color: #ffffff;
}
.type {
  padding: 20px 60px;
  font-weight: 500;
  font-size: 30px;
  color: #ffffff;
}

.type_bg {
  background: url("../../assets/img/矩形 2 拷贝 12.png") no-repeat;
  background-size: contain;
}
.already_bg {
  background: url("../../assets/img/weigoutong.png") no-repeat;
  background-size: cover;
}
.none_bg {
  background: url("../../assets/img/lanse.png") no-repeat;
  background-size: cover;
}
.partName {
  width: 198px;
  height: 54px;
}
.item {
  position: relative;
  height: 200px;
  border-radius: 10px;
  margin: 10px 40px 10px 20px;
  border: 2px solid #004dff69;
}
.name {
  font-size: 30px;
  margin: 47px 0 0 40px;
  span {
    margin-left: 40px;
  }
}
.phone {
  font-size: 30px;
  margin: 30px 0 0 40px;
  span {
    margin-left: 40px;
  }
}
a {
  color: #ffffff;
}
.conect_type {
  position: absolute;
  width: 128px;
  height: 65px;
  right: -20px;
  top: 55px;
  font-size: 28px;
  span {
    padding: 10px 0 0;
  }
}
</style>