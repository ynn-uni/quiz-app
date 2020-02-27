<template>
  <view class="bg-linear">
    <cu-custom :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">规则说明</block>
    </cu-custom>
    <view class="rule flex flex-direction align-center margin-top-lg">
      <view class="title margin-top-sm margin-bottom-sm">— 规则说明 —</view>
      <view class="notice padding">
        温馨提示:
        <br />网络质量会影响(答题)数据上传，进而影响得分，建议你在良好的网络环境下参与答题。
      </view>
      <view class="content">
        <view class="margin-tb-sm">一、参赛资格</view>
        <view class="margin-tb-sm">本活动仅限支付宝实名认证用户参加。</view>

        <view class="margin-tb-sm">二、活动时间</view>

        <view class="margin-tb-sm">本赛季活动时间为1月6日至1月12日。</view>
        <view class="margin-tb-sm">三、活动规则</view>

        <view class="margin-tb-sm">1、参与规则:符合参赛资格的用户，可在限定时间内，打开[答答星球小程序]参与本赛季答题挑战。</view>
        <view
          class="margin-tb-sm"
        >2、比赛规则:本赛季答题可选择1V1对战模式或单人答题模式，用户根据自己的判断在限定时间内选择正确答案，每局结束后按照答题总分判断胜负。挑战当前等级答题获胜加一颗星，失败减一颗星，平局或挑战非当前等级答题均不增不减。</view>
        <view
          class="margin-tb-sm"
        >3、得分规则: 1V1对战模式中，每次答题最长时间为10秒，答题错误、超时回答，均不得分;限定时间内答题正确，则根据答题时间得分，时间越短，得分越高。</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {}
};
</script>

<style scoped lang="scss">
.rule {
  width: 680rpx;
  background: rgba(255, 255, 255, 1);
  border-radius: 16rpx;
  padding: 20rpx 40rpx;
  margin-left: 35rpx;
  position: fixed;
  top: 120rpx;
  bottom: 40rpx;
  .title {
    font-size: 36rpx;
    font-weight: 500;
    color: rgba(84, 84, 84, 1);
    line-height: 50rpx;
  }
  .notice {
    width: 636rpx;
    background: rgba(215, 200, 243, 1);
    border-radius: 12rpx;
    font-size: 26rpx;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 40rpx;
    text-align: justify;
  }
  .content {
    width: 628rpx;
    font-size: 26rpx;
    font-weight: 500;
    color: rgba(84, 84, 84, 1);
    line-height: 40rpx;
    text-align: justify;
  }
}
</style>
