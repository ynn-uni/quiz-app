<template>
  <view class="bg-linear">
    <cu-custom :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">竞猜答题</block>
    </cu-custom>
    <user-pannel ref="pannel" :content="content" />
    <view
      v-if="questionList.length"
      class="serial-number"
    >{{ curIndex + 1 }} / {{ questionList.length }}</view>
    <question
      v-if="questionList.length"
      ref="question"
      :question="curQuestion"
      :disabled="disabled"
      @select="handleSelect"
    />
    <view class="action-wrap" v-if="showNext">
      <button
        v-if="curIndex < questionList.length - 1"
        class="action-btn cu-btn round bg-orange text-white"
        @click="handleNext"
      >下一题</button>
      <button
        v-else
        class="action-btn cu-btn round bg-orange text-white"
        @click="handlerFinish"
      >完成练习</button>
    </view>
  </view>
</template>

<script>
import UserPannel from '../../components/user-pannel.vue';
import Subject from '../../components/subject.vue';
import Question from '../../components/Question.vue';
import { getQuestions } from '../../apis/index';
import { mapGetters } from 'vuex';
export default {
  components: { UserPannel, Question },
  data() {
    return {
      questionList: null,
      curIndex: 0,
      showNext: false,
      answerList: []
    };
  },
  computed: {
    ...mapGetters(['userInfo']),
    curQuestion() {
      return this.questionList && this.questionList[this.curIndex];
    },
    content() {
      let correctRate = 100;
      const length = this.answerList.length;
      const rightCount = this.answerList.filter(i => i.isRight).length;
      if (length) {
        correctRate = rightCount / length * 100;
      }
      return `正确率：${correctRate.toFixed(0)}%`;
    }
  },
  onLoad() {
    this.getQuestionLsit();
  },
  methods: {
    getQuestionLsit() {
      getQuestions().then(res => {
        this.questionList = res.data;
      });
    },
    handleSelect(evt) {
      this.showNext = true;
      this.answerList.push(evt);
    },
    handleNext() {
      this.curIndex++;
      this.showNext = false;
      this.$refs.question.resetResult();
    },
    handlerFinish(evt) {
      uni.showModal({
        title: '恭喜！',
        content: `完成练习，${this.content}`,
        cancelText: '返回首页',
        confirmText: '再次练习',
        success: function(res) {
          if (res.confirm) {
            uni.redirectTo({
              url: '/pages/exercise/exercise'
            });
          } else if (res.cancel) {
            uni.navigateTo({
              url: '/pages/index/index'
            });
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
.action-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-top: 20rpx;
  .action-btn {
    margin: 30rpx 0;
  }
  .cu-btn {
    position: relative;
    padding: 24rpx;
    width: 50%;
    font-size: 32rpx;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  }
}
</style>
