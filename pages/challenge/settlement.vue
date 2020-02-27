<template>
  <view class="settlement">
    <view class="settlement-top">
      <view class="left-side left">
        <image class="bg-image" src="../../static/images/settlement-left.png" />
        <image class="avatar" :src="userInfo.avatar" />
        <text class="nickname">{{ userInfo.name }}</text>
        <text class="score">
          {{ userScore }}
          <text class="label">分</text>
        </text>
        <image class="victory" src="../../static/images/settlement-victory.png" />
        <text class="victory-text">{{ settlementInfo.streak }}连胜</text>
      </view>
      <view class="status">
        <image
          v-if="challengeStatus === 'success'"
          class="status-image"
          src="../../static/images/settlement-success.png"
        />
        <image
          v-if="challengeStatus === 'fail'"
          class="status-image"
          src="../../static/images/settlement-fail.png"
        />
        <image
          v-if="challengeStatus === 'draw'"
          class="status-image"
          src="../../static/images/settlement-draw.png"
        />
        <image class="status-label" src="../../static/images/settlement-label.png" />
        <text class="status-text">{{ challengeText }}</text>
      </view>
      <view class="right-side right">
        <image class="bg-image" src="../../static/images/settlement-right.png" />
        <image class="avatar" :src="opponentInfo.avatar" />
        <text class="nickname">{{ opponentInfo.name }}</text>
        <text class="score">
          {{ opponentScore }}
          <text class="label">分</text>
        </text>
      </view>
    </view>
    <view class="credit">
      <view class="credit-item">
        <view class="credit-label">
          <image src="../../static/images/settlement-gem.png" />
          <text>积分</text>
        </view>
        <view>+{{ settlementInfo.score }}</view>
      </view>
      <view class="credit-line"></view>
      <view class="credit-item">
        <view class="credit-label">
          <image src="../../static/images/settlement-sword.png" />
          <text>经验</text>
        </view>
        <view>+{{ settlementInfo.experience }}</view>
      </view>
      <view class="credit-line"></view>
    </view>
    <view class="action">
      <button class="cu-btn round again bg-orange" @click="reChallenge">继续挑战</button>
      <button class="cu-btn round review" @click="handleReview">回顾本局</button>
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
      const { type } = this.settlementInfo;
      if (type === 1) {
        return 'success';
      }
      if (type === 2) {
        return 'fail';
      }
      return 'draw';
    },
    challengeText() {
      switch (this.challengeStatus) {
        case 'success':
          return '挑战成功';
        case 'fail':
          return '挑战失败';
        default:
          return '平局';
      }
    }
  },
  mounted() {
    this.isRun();
  },
  methods: {
    isRun() {
      const { run } = this.settlementInfo;
      if (run) {
        setTimeout(() => {
          uni.showModal({
            title: '恭喜获得胜利！',
            content: '您的对手已逃跑',
            showCancel: false
          });
        }, 200);
      }
    },
    reChallenge() {
      uni.redirectTo({
        url: '/pages/challenge/challenge'
      });
    },
    handleReview() {
      uni.redirectTo({
        url: '/pages/review/review'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.settlement {
  .settlement-top {
    position: relative;
    height: 400rpx;
    overflow: hidden;
  }
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
      width: 6em;
      font-size: 20rpx;
      font-weight: 500;
      color: #fff;
      line-height: 90rpx;
      white-space: nowrap;
      text-overflow: ellipsis;
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
    display: flex;
    flex-direction: column;
    top: 20rpx;
    animation: fadeInLeftToRight 1s 0s linear forwards;
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
    .victory {
      margin-top: 32rpx;
      width: 200rpx;
      height: 80rpx;
    }
    .victory-text {
      margin-top: -64rpx;
      color: #fff;
      font-size: 30rpx;
      font-weight: 500;
      text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
      white-space: nowrap;
      text-indent: 1em;
      z-index: 3;
    }
  }
  .right-side {
    top: 20rpx;
    animation: fadeInRightToLeft 1s 0s linear forwards;
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
    top: 10rpx;
    left: 50%;
    display: flex;
    flex-direction: column;
    margin-left: -100rpx;
    text-align: center;
    z-index: 1;
    animation: enlarge 0.3s 1.1s linear forwards;
    opacity: 0;
    .status-image {
      width: 200rpx;
      height: 200rpx;
      z-index: 1;
    }
    .status-label {
      margin-top: -50rpx;
      width: 200rpx;
      height: 100rpx;
    }
    .status-text {
      margin-top: -60rpx;
      font-size: 30rpx;
      color: #fff;
      text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
      z-index: 2;
    }
  }

  .credit {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 40rpx;
    font-weight: 500;
    line-height: 70rpx;
    animation: fadeInLeftToRight 0.5s 1.3s linear forwards;
    opacity: 0;
    .credit-item {
      display: flex;
      justify-content: space-between;
      margin-top: 60rpx;
      width: 400rpx;
    }
    .credit-label {
      image {
        width: 70rpx;
        height: 70rpx;
        margin-right: 10rpx;
        vertical-align: middle;
      }
    }
    .credit-line {
      margin-top: 10rpx;
      width: 444rpx;
      height: 4rpx;
      background: linear-gradient(
        270deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 1) 50%,
        rgba(255, 255, 255, 0) 100%
      );
    }
  }

  .action {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-top: 80rpx;
    animation: opacity 0.5s 2s linear forwards;
    opacity: 0;
    .cu-btn {
      width: 400rpx;
      height: 100rpx;
      font-size: 40rpx;
      &.cu-btn {
        margin-top: 36rpx;
      }
    }
    .again {
      color: #fff;
    }
    .review {
      color: #5705a8;
    }
  }

  .left {
    left: 0;
  }
  .right {
    right: 0;
  }
}
/*从左到右*/
@keyframes fadeInLeftToRight {
  from {
    opacity: 0;
    transform: translateX(-1000px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
/*从右到左*/
@keyframes fadeInRightToLeft {
  from {
    opacity: 0;
    transform: translateX(1000px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
/* 放大效果*/
@keyframes enlarge {
  from {
    opacity: 0;
    transform: scale(0.1, 0.1);
  }
  to {
    opacity: 1;
    transform: scale(1, 1);
  }
}
@keyframes opacity {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>