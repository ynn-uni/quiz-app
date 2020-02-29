<template>
  <view>
    <user-pannel ref="pannel" />
    <view
      v-if="questionList.length"
      class="serial-number"
    >{{ curIndex + 1 }} / {{ questionList.length }}</view>
    <question
      v-if="questionList.length"
      ref="question"
      :question="curQuestion"
      :disabled="true"
      :show-answer="true"
      @select="handleSelect"
    />
    <view class="action-wrap">
      <button
        v-if="curIndex > 0"
        class="next-btn cu-btn round text-purple fl"
        @click="turnToPrev"
      >上一题</button>
      <button
        v-if="curIndex < questionList.length - 1"
        class="prev-btn cu-btn round text-purple fr"
        @click="turnToNext"
      >下一题</button>
    </view>
    <view class="nav-wrap flex justify-center">
      <navigator
        class="text-white text-lg"
        url="/pages/challenge/challenge"
        open-type="redirect"
      >继续挑战</navigator>
    </view>
  </view>
</template>

<script>
import UserPannel from '../../components/user-pannel';
import Question from '../../components/Question.vue';
import { mapGetters } from 'vuex';
export default {
  name: 'Review',
  components: { UserPannel, Question },
  data() {
    return {
      curIndex: 0
    };
  },
  computed: {
    ...mapGetters(['questionList']),
    curQuestion() {
      return this.questionList && this.questionList[this.curIndex];
    }
  },
  mounted() {},
  methods: {
    turnToNext() {
      this.curIndex += 1;
      this.selectOptionId = null;
    },
    turnToPrev() {
      this.curIndex -= 1;
      this.selectOptionId = null;
    }
  }
};
</script>

<style lang="scss">
.action-wrap {
  overflow: hidden;
  margin-bottom: 20rpx;
  .next-btn {
    margin-left: -50rpx;
    padding: 24rpx 0;
  }
  .prev-btn {
    margin-right: -50rpx;
    padding: 24rpx 0;
  }
  .cu-btn {
    position: relative;
    padding: 24rpx;
    width: 40%;
    font-size: 32rpx;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  }
}
.nav-wrap {
  text-align: center;
  margin-top: 60rpx;
}
</style>