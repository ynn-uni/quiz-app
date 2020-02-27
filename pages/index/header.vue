<template>
  <view class="index-header flex justify-between padding">
    <view class="flex flex-direction">
      <view class="flex flex-direction">
        <button class="share-image" open-type="share">
          <image src="../../static/images/share.png" />
        </button>
        <button class="label share-label" open-type="share">分享</button>
      </view>
      <view
        class="flex flex-direction margin-top-sm"
        @click="checkIsLogin('/pages/ranking/ranking')"
      >
        <image src="../../static/images/board.png" />
        <view class="label">排行榜</view>
      </view>
    </view>
    <view class="user-info">
      <view class="avatar" @click="checkIsLogin('/pages/my/my')">
         <open-data type="userAvatarUrl" ></open-data>
      </view>
      <view class="nickname">
        <open-data type="userNickName"></open-data>
      </view>
    </view>
    <view class="flex flex-direction">
      <navigator class="flex flex-direction" url="/pages/rule/rule">
        <image src="../../static/images/rule.png" />
        <view class="label">规则</view>
      </navigator>
      <view class="flex flex-direction margin-top-sm" @click="checkIsLogin('/pages/reward/reward')">
        <image src="../../static/images/reward.png" />
        <view class="label">奖励</view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['userInfo','token'])
  },
  onShareAppMessage(e) {
    return {
      title: '答题竞猜？比比看吧！',
      path: '/pages/index/index'
    };
  },
  methods: {
    checkIsLogin(url) {
		console.log(this.token)
      if (this.token) {
        uni.navigateTo({
          url: url
        });
      } else {
        this.$emit('nologin');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$bg-label: #7f41c1;
.index-header {
  image {
    width: 70rpx;
    height: 70rpx;
  }
  .label {
    display: inline-block;
    width: 80rpx;
    margin-top: 10rpx;
    font-size: 20rpx;
    line-height: 36rpx;
    color: #fff;
    text-align: center;
    background-color: $bg-label;
    border-radius: 500rpx;
  }
  .share-image {
    display: flex;
    padding: unset;
    background: none;
  }
  .share-label {
    padding-left: 0;
    padding-right: 0;
  }
  .user-info {
    .avatar {
      border-radius: 160rpx;
      width: 160rpx;
      height: 160rpx;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
      overflow: hidden;
    }
    .nickname {
      margin-top: 16rpx;
      font-size: 32rpx;
      color: #fff;
      text-align: center;
    }
  }
}
</style>
