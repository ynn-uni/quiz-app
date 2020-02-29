<template>
  <view class="flex flex-direction align-center">
    <view class="person-avatar round">
      <open-data type="userAvatarUrl" />
    </view>
    <view class="person-name text-df text-center margin-top-sm">
      <open-data type="userNickName" />
    </view>
    <view class="progress-wrapper flex justify-center align-center">
      <progress
        class="progress"
        :percent="percent"
        border-radius="7px"
        stroke-width="7px"
        background-color="#3d0273"
        active-color="#ffce24"
        :active="true"
      />
      <view class="progress-label">lv{{ userInfo.level||0 }}</view>
    </view>
    <view class="sorce flex justify-center align-center">
      <image src="../../../static/images/gem.png" mode />积分
      <view class="num">{{userInfo.credit||0}}分</view>
    </view>
    <view class="info">
      <view class="info_item flex align-center margin-tb-sm">
        <view class="left flex justify-center align-center">
          <view class="title">用户编号：</view>
          <view class="val">{{userInfo.id||0}}</view>
        </view>
        <view class="right flex justify-center align-center">
          <view class="title">用户等级：</view>
          <view class="val">lv{{userInfo.level||0}}</view>
        </view>
      </view>
      <view class="info_item flex align-center margin-tb-sm">
        <view class="left flex justify-center align-center">
          <view class="title">胜率：</view>
          <view class="val">{{winRate||0}}%</view>
        </view>
        <view class="right flex justify-center align-center">
          <view class="title">总场次：</view>
          <view class="val">{{userInfo.battle||0}}场</view>
        </view>
      </view>
      <view class="info_item flex align-center margin-tb-sm">
        <view class="left flex justify-center align-center">
          <view class="title">经验：</view>
          <view class="val">{{userInfo.experience.current||0}}/{{userInfo.experience.need||0}}</view>
        </view>
        <view class="right flex justify-center align-center">
          <view class="title">胜场：</view>
          <view class="val">{{(userInfo.battle - userInfo.defeat)||0}}场</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['userInfo']),
    winRate() {
      if (this.userInfo.battle) {
        return (
          (1 - this.userInfo.defeat / this.userInfo.battle) *
          100
        ).toFixed(2);
      }
      return 0;
    },
    percent() {
      if (this.userInfo.experience) {
        const { need, current } = this.userInfo.experience;
        return (current / need).toFixed(2) * 100;
      } else {
        return 0;
      }
    }
  },
  methods: {}
};
</script>

<style scoped lang="scss">
$bg-label: #7f41c1;
.person-avatar {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
  overflow: hidden;
}
.person-name {
  font-size: 32rpx;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 44rpx;
}
.progress-wrapper {
  margin-bottom: 40rpx;
  .progress {
    width: 240rpx;
  }
  .progress-label {
    margin-left: 24rpx;
    padding: 2rpx 10rpx;
    font-size: 24rpx;
    font-weight: 500;
    color: #fff;
    border-radius: 8rpx;
    background-color: $bg-label;
  }
}
.sorce {
  font-size: 40rpx;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 56rpx;
  image {
    width: 45rpx;
    height: 65rpx;
    margin-right: 20rpx;
  }
  .num {
    margin-left: 30rpx;
  }
}
.info {
  .info_item {
    width: 560rpx;
    height: 80rpx;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 50rpx;
  }
  .left,
  .right {
    width: 50%;
    line-height: 54rpx;
    text-align: center;
    font-size: 24rpx;
    .title {
      color: #5c0e84;
    }
    .val {
      color: #fff;
    }
  }
  .left {
    border-right: 1px solid rgba(96, 2, 150, 1);
  }
}
</style>
