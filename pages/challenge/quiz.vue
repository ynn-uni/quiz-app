<template>
  <view class="quiz">
    <user-pannel ref="pannel" :pk="true" :time="countNum" />
    <subject
      ref="subject"
      type="pk"
      :list="questions"
      @select="onUserSelect"
      @finish="handleFinish"
    ></subject>
    <view class="score animation-reverse animation-slide-top" v-if="scoreAnim">
      <text>+</text>
      {{ curScore }}
    </view>
  </view>
</template>

<script>
import UserPannel from '../../components/user-pannel.vue';
import Subject from '../../components/subject.vue';
import { mapGetters } from 'vuex';
export default {
  props: {
    questions: {
      type: Array,
      default: () => []
    }
  },
  components: { UserPannel, Subject },
  data() {
    return {
      limitTime: 10,
      subjectList: this.subjectList,
      countNum: 10,
      timerId: null,
      scoreAnim: false,
      curScore: 0,
      finished: false,
      nextFlag: false
    };
  },
  computed: {
    ...mapGetters(['userScore', 'opponentScore'])
  },
  watch: {
    timerId(val) {
      console.log('id', val);
    }
  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      this.countDown();
    },
    onUserSelect(val) {
      this.stopCountDown();
      this.calcScore(val);
      this.nextQuestion();
    },
    timeOut() {
      this.stopCountDown();
      this.calcScore(false);
      this.nextQuestion();
    },
    calcScore(rightAnsower) {
      const score = rightAnsower ? this.countNum * 10 : 0;
      this.curScore = score;
      this.scoreAnim = true;
      this.$store.commit('challenge/updateUserScore', this.userScore + score);
      this.$store.dispatch('challenge/uploadSocre', score);
    },
    nextQuestion() {
      if (this.finished) return;
      if (this.nextFlag === true) {
        setTimeout(() => {
          this.$refs.subject.turnToNext();
          this.reset();
          this.nextFlag = false;
        }, 1500);
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
      this.finished = true;
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
