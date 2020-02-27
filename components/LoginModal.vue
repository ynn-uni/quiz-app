<template>
  <view class="cu-modal" :class="showModal ? 'show' : ''">
    <view class="cu-dialog">
      <view class="cu-bar bg-white justify-end">
        <view class="content">您还未登录</view>
        <view class="action" @tap="handleCancel">
          <text class="cuIcon-close text-red"></text>
        </view>
      </view>
      <view class="padding-xl">请先登录后在进行操作！</view>
      <view class="cu-bar bg-white justify-end">
        <view class="action">
          <button class="cu-btn line-green text-green" @tap="handleCancel">暂不登录</button>
          <button
            class="cu-btn bg-green margin-left"
            open-type="getUserInfo"
            @getuserinfo="getUserInfo"
            @click="handleConfirm"
          >立即登录</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    show() {
      this.showModal = true;
    },
    close() {
      this.showModal = false;
    },
    handleConfirm() {
      this.close();
    },
    getUserInfo(evt) {
      const errMsg = evt.detail.errMsg;
      if (errMsg === 'getUserInfo:ok') {
        this.$emit('confirm', evt.detail);
      }
    },
    handleCancel() {
      this.close();
      this.$emit('cancel');
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
