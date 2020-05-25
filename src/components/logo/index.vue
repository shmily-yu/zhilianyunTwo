<template>
  <div class="logo u-f-ac">
    <div class="head_bg">
      <van-row>
        <van-col span="16">
          <img src="@/assets/img/LOGO123.png" alt class="img" />
        </van-col>
      </van-row>
      <div class="head_word">
        <div>Hello,</div>
        <div>{{text}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["text"]
};
</script>
<style lang="less" scoped>
.logo {
  height: 400px;
}
.head_bg {
  padding: 20px 40px 0px;
  position: relative;
}

.head_word {
  position: absolute;
  top: 40px;
  left: 70px;
}
.head_word > div {
  font-size: 52px;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}
.img {
  width: 400px;
  height: 230px;
}
</style>