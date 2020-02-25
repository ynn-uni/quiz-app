<template>
  <view class="settlement">
    <view class="left-side left">
      <image class="bg-image" src="../../static/images/settlement-left.png"></image>
      <image class="avatar" :src="userInfo.avatar"></image>
      <text class="nickname">{{ userInfo.name }}</text>
      <text class="score">190<text class="label">分</text></text>
    </view>
    <view class="status">
      <image class="status-image" src="../../static/images/settlement-success.png"></image>
      <image class="status-label" src="../../static/images/settlement-label.png"></image>
      <text>平局</text>
    </view>
    <view class="right-side right">
      <image class="bg-image" src="../../static/images/settlement-right.png"></image>
      <image class="avatar" :src="opponentInfo.avatar"></image>
      <text class="nickname">{{ opponentInfo.name || '阿道夫阿斯蒂芬' }}</text>
      <text class="score">190<text class="label">分</text></text>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Settlement',
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'opponentInfo',
      'userScore',
      'opponentScore',
      'settlementInfo'
    ]),
    challengeStatus() {
      const { userScore, opponentScore } = this
      if (userScore > opponentScore) {
        return 'success'
      }
      if (userScore < opponentScore) {
        return 'fail'
      }
      return 'draw'
    }
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
  .settlement {
    position: relative;
    .left-side,
    .right-side {
      position: absolute;
      .avatar,
      .nickname,
      .score {
        position: absolute;
      }
      .bg-image {
        width: 350rpx;
        height: 256rpx;
      }
      .avatar {
        width: 72rpx;
        height: 72rpx;
        border: 8rpx solid #fff;
        border-radius: 100rpx;
        overflow: hidden;
		  }
      .nickname {
        width: 8em;
        font-size: 20rpx;
        font-weight: 500;
        color: #fff;
        line-height: 90rpx;
        overflow: hidden;
      }
      .score {
        font-size: 72rpx;
        font-weight: 500;
        color: #fff;
        .label {
          font-size: 40rpx;
        }
      }
    }
    .left-side {
      top: 20rpx;
      .avatar {
        top: 12rpx;
        left: 62rpx;
      }
      .nickname {
        left: 160rpx;
      }
      .score {
        top: 136rpx;
        left: 30rpx;
      }
    }
    .right-side {
      top: 20rpx;
      .avatar {
        top: 12rpx;
        right: 58rpx;
      }
      .nickname {
        right: 160rpx;
        text-align: right;
      }
      .score {
        top: 136rpx;
        right: 30rpx;
      }
    }

    .status {
      position: absolute;
      width: 200rpx;
      height: 200rpx;
      .status-image {
        position: absolute;
      }
      .status-label {
        position: absolute;
        width: 200rpx;
        height: 100rpx;
      }
    }
    
    .left {
      left: 0;
    }
    .right {
      right: 0;
    }
    .bottom {
      bottom: 0;
    }
  }
</style>