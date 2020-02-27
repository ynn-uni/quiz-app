<template>
  <view
    class="cu-modal"
    :class="modalname=='noregister'?'show':modalname=='DialogModal2'?'show':modalname=='DialogModal4'?'show':''"
  >
    <view class="cu-dialog">
      <view class="cu-bar bg-white justify-end">
        <view class="content">提示</view>
        <view class="action" @tap="hideModal">
          <text class="cuIcon-close text-red"></text>
        </view>
      </view>
      <view
        class="padding-xl"
      >{{modalname=='noregister'?'获取微信授权?':modalname=='DialogModal2'?'确定删除该设备？':modalname=='DialogModal4'?'获取手机授权?':''}}</view>
      <view class="cu-bar bg-white justify-end">
        <view class="action">
          <button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
          <!-- 弹出授权框 -->
          <button
            class="cu-btn bg-green margin-left"
            open-type="getUserInfo"
            @getuserinfo="getUserInfo"
            @click="makesure"
            v-if="modalname=='noregister'"
          >确定</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      iv: '',
      encryptedData: ''
    };
  },
  props: {
    modalname: ''
  },

  methods: {
    getUserInfo() {
      uni.getSetting({
        success: res => {
          console.log(res);

          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            this.$emit('ListenChild', '授权成功');
          }
        }
      });
      // this.$emit('ListenChild', '授权成功');
    },
    makesure() {
      this.$emit('ListenChild', '点击确认');
    },
    hideModal(e) {
      this.$emit('ListenChild', '点击取消');
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
