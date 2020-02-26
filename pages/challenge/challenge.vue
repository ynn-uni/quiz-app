<template>
  <view class="bg-linear">
    <cu-custom :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">擂台挑战</block>
    </cu-custom>
    <matching v-if="isDisplay('MATCH')" :user="userInfo"></matching>
    <ready v-if="isDisplay('READY')" :user="userInfo" :opponent="opponentInfo"></ready>
    <quiz v-if="isDisplay('QUIZ') && questionList.length" ref="quiz" :questions="questionList"></quiz>
    <settlement v-if="isDisplay('OVER')"></settlement>
  </view>
</template>

<script>
import Matching from './matching';
import Ready from './ready';
import Quiz from './quiz.vue';
import Settlement from './settlement';
import WebsocketUtils from '@/utils/websocket';
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  components: { Matching, Ready, Quiz, Settlement },
  data() {
    return {
      statusMap: ['CONNECTED', 'MATCH', 'READY', 'QUIZ', 'OVER'],
      statusIndex: 0
    };
  },
  computed: {
    ...mapGetters([
      'questionList',
      'userInfo',
      'opponentInfo',
      'socketInstance'
    ])
  },
  onShow: function(options) {
    this.statusIndex = 0;
    this.initWebsocket().then(instance => {
      instance.onmessage = evt => {
        this.onSocketMessage(evt);
      };
    });
  },
  onUnload: function() {
    this.closeWebsocket();
  },
  methods: {
    ...mapActions('challenge', ['initWebsocket', 'closeWebsocket']),
    isDisplay(step) {
      const { statusIndex, statusMap } = this;
      const curStatus = statusMap[statusIndex];
      return curStatus === step;
    },
    // 监听socket事件
    onSocketMessage(evt) {
      const { state, commit } = this.$store;
      console.log('receive:', evt);
      const { operate, data } = JSON.parse(evt.data);

      switch (operate) {
        case 'CONNECTED':
          this.statusIndex = 1;
          this.socketInstance.send({
            operate: 'MATCH',
            data: 'matching'
          });
          break;
        case 'MATCH':
          this.statusIndex = 2;
          const { rival, subjects } = data;
          const opponentInfo = {
            name: rival.nickname,
            avatar: rival.portrait,
            victory: rival.streak,
            level: rival.level
          };
          commit('challenge/updateOpponentInfo', opponentInfo);
          commit('challenge/updateQuestionList', subjects);
          setTimeout(() => {
            this.statusIndex = 3;
          }, 3000);
          break;
        case 'SCORE':
          commit('challenge/updateOpponentScore', data.score);
          this.$refs.quiz.nextQuestion();
          break;
        case 'OVER':
          this.statusIndex = 4;
          commit('challenge/updateSettlementInfo', data);
          this.closeWebsocket();
          break;
      }
    }
  }
};
</script>

<style lang="scss">
</style>
