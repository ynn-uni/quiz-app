<template>
  <view class="bg-linear">
    <cu-custom :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">竞猜答题</block>
    </cu-custom>
    <user-pannel ref="pannel" :content="content" />
    <subject
      v-if="questionList.length"
      type="exercise"
      :list="questionList"
      @select="handleSelect"
      @finish="handleFinished"
    />
  </view>
</template>

<script>
import UserPannel from '../../components/user-pannel.vue';
import Subject from '../../components/subject.vue';
import { getQuestions } from '../../apis/index';
import { mapGetters } from 'vuex';
export default {
  components: { UserPannel, Subject },
  data() {
    return {
      questionList: null,
      answerList: []
    };
  },
  computed: {
    ...mapGetters(['userInfo']),
    wrongCount() {
      return this.answerList.filter(i => !i).length;
    },
    content() {
      let correctRate = 100;
      const length = this.answerList.length;
      const rightCount = this.answerList.filter(i => i).length;
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
      this.answerList.push(evt);
    },
    handleFinished(evt) {
      uni.showModal({
        title: '恭喜！',
        content: `完成练习，${this.content}`,
        cancelText: '返回首页',
        confirmText: '再次练习',
        success: function(res) {
          if (res.confirm) {
            uni.navigateTo({
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

<style lang="scss"></style>
