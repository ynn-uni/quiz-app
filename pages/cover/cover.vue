<template>
  <view class="cover-page bg-linear">
    <image class="cover" src="../../static/images/cover.gif" />
    <button v-if="showBtn" class="cu-btn setting" @click="turnToIndex">进入首页</button>
    <!-- <button class="setting" open-type="openSetting">授权设置</button> -->
  </view>
</template>

<script>
export default {
  name: 'Cover',
  data() {
    return {
      showBtn: false
    };
  },
  onLoad() {
    setTimeout(() => {
      this.turnToIndex();
    }, 3000);
    setTimeout(() => {
      this.showBtn = true;
    }, 10000);
  },
  methods: {
    turnToIndex() {
      uni.navigateTo({
        url: '/pages/index/index'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.cover-page {
  position: relative;
  overflow: hidden;
  .cover {
    width: 100%;
    height: 100vh;
  }
  .setting {
    position: absolute;
    bottom: 30px;
    left: 50%;
    width: 50%;
    transform: translateX(-50%);
  }
}
</style>