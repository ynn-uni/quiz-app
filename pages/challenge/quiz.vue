<template>
  <view class="quiz">
    <user-pannel ref="pannel" :pk="true" :time="countNum" />
    <Question
      ref="question"
      :question="curQuestion"
      :show-answer="showAnswer"
      :disabled="disableClick"
      @select="onUserSelect"
    ></Question>
    <view class="score animation-reverse animation-slide-top" v-if="scoreAnim">
      <text>+</text>
      {{ curScore }}
    </view>
  </view>
</template>

<script>
import UserPannel from '../../components/user-pannel.vue';
import Question from '../../components/Question.vue';
import { mapGetters } from 'vuex';
export default {
  props: {
    questions: {
      type: Array,
      default: () => []
    }
  },
  components: { UserPannel, Question },
  data() {
    return {
      limitTime: 10,
      countNum: 10,
      timerId: null,
      scoreAnim: false,
      curScore: 0,
      nextFlag: false,
      showAnswer: false,
      disableClick: false,
      curIndex: 0
    };
  },
  computed: {
    ...mapGetters(['userScore', 'opponentScore']),
    curQuestion() {
      return this.questions[this.curIndex];
    },
    isFinished() {
      return this.curIndex + 1 === this.questions.length;
    }
  },
  mounted() {
    this.start();
  },
  /**
   * 流程：
   * 1. 进入页面，开始计时
   * 2. 用户选择或timeout
   * 3. 计算分数并同步:
   * 4. 下一题
   */
  methods: {
    start() {
      this.countDown();
    },
    onUserSelect(val) {
      const { isRight, selected } = val;
      this.storeUserAnswer(selected);
      this.stopCountDown();
      this.calcScore(isRight);
      this.nextQuestion();
    },
    timeOut() {
      this.stopCountDown();
      this.calcScore(false);
      this.nextQuestion();
      // 当事件结束时显示答案
      this.showAnswer = true;
    },
    storeUserAnswer(answer) {
      this.curQuestion.selected = answer;
      this.$store.commit('challenge/updateQuestionList', this.questions);
    },
    calcScore(rightAnswer) {
      const score = rightAnswer ? this.countNum * 10 : 0;
      this.curScore = score;
      this.scoreAnim = true;
      this.$store.commit('challenge/updateUserScore', this.userScore + score);
      this.$store.dispatch('challenge/uploadSocre', score);
    },
    nextQuestion() {
      if (this.isFinished) {
        this.handleFinish();
        return;
      }
      if (this.nextFlag === true) {
        this.disableClick = true;
        setTimeout(() => {
          this.curIndex++;
          this.reset();
          this.$refs.question.resetResult();
          this.nextFlag = false;
          this.showAnswer = false;
          this.disableClick = false;
        }, 1000);
      } else {
        this.nextFlag = true;
      }
    },
    reset() {
      this.countDown();
      this.curScore = 0;
      this.scoreAnim = false;
      this.countNum = this.limitTime;
    },
    countDown() {
      this.timerId = setInterval(() => {
        if (this.countNum - 1 < 0) {
          this.timeOut();
          return;
        }
        this.countNum--;
      }, 1000);
    },
    stopCountDown() {
      clearInterval(this.timerId);
    },
    handleFinish() {
      this.stopCountDown();
      this.$store.dispatch('challenge/finishQuiz');
    }
  }
};
</script>

<style lang="scss">
.quiz {
  .score {
    position: fixed;
    width: 100%;
    top: 25%;
    font-size: 60rpx;
    font-weight: bold;
    color: #fff;
    text-shadow: #fc0 0 0 6px;
    text-align: center;
    text {
      vertical-align: 6rpx;
    }
  }
}
</style>
