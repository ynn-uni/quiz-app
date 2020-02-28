<template>
  <view class="cover-page bg-linear">
    <image class="cover" src="../../static/images/cover.gif" />
    <!-- <button class="setting" open-type="openSetting">授权设置</button> -->
  </view>
</template>

<script>
export default {
  name: 'Cover',
  onLoad() {
    setTimeout(() => {
      uni.navigateTo({
        url: '/pages/index/index'
      });
    }, 2000);
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