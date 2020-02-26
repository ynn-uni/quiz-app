<template>
  <view class="bg-linear">
    <cu-custom :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">擂台挑战</block>
    </cu-custom>
    <matching v-if="isMatched" :user="userInfo"></matching>
    <ready v-if="isReady" :user="userInfo" :opponent="opponentInfo"></ready>
    <quiz v-if="isQuiz && questionList.length" :questions="questionList"></quiz>
    <settlement v-if="isFinished"></settlement>
  </view>
</template>

<script>
import Matching from './matching';
import Ready from './ready';
import Quiz from './quiz.vue';
import Settlement from './settlement';
import WebsocketUtils from '@/utils/websocket';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  components: { Matching, Ready, Quiz, Settlement },
  data() {
    return {};
  },
  computed: {
    ...mapState('challenge', ['isMatched', 'isReady', 'isQuiz', 'isFinished']),
    ...mapGetters([
      'questionList',
      'userInfo',
      'opponentInfo',
      'socketInstance'
    ])
  },
  watch: {
    isReady(val) {
      if (val === false) {
        this.changeQuizStatus(true);
      }
    }
  },
  onShow: function(options) {
    this.initWebsocket().then(instance => {
      instance.send({
        operate: 'MATCH',
        data: 'matching'
      });
    });
  },
  onUnload: function() {
    this.closeWebsocket();
  },
  mounted() {
    console.log(this.questionList);
  },
  methods: {
    ...mapMutations('challenge', ['changeQuizStatus']),
    ...mapActions('challenge', ['initWebsocket', 'closeWebsocket'])
  }
};
</script>

<style lang="scss">
</style>
