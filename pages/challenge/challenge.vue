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
      instance.onopen = () => {
        instance.send({
          operate: 'MATCH',
          data: 'matching'
        });
      };
      instance.onmessage = evt => {
        this.onSocketMessage(evt);
      };
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
    ...mapActions('challenge', ['initWebsocket', 'closeWebsocket']),

    // 监听socket事件
    onSocketMessage(evt) {
      const { commit } = this.$store;
      console.log('----', evt);
      const { operate, data } = JSON.parse(evt.data);
      if (operate === 'MATCH') {
        const { rival, subjects } = data;
        const opponentInfo = {
          name: rival.nickname,
          avatar: rival.portrait,
          score: rival.score,
          victory: rival.streak,
          level: rival.level
        };
        commit('challenge/updateOpponentInfo', opponentInfo);
        commit('challenge/updateQuestionList', subjects);
        commit('challenge/changeMatchStatus', false);
        commit('challenge/changeReadyStatus', true);
        setTimeout(() => {
          commit('challenge/changeReadyStatus', false);
        }, 3000);
      }
      if (operate === 'SCORE') {
        commit('challenge/updateOpponentScore', data.score);
      }
      if (operate === 'OVER') {
        commit('challenge/updateSettlementInfo', data);
      }
    }
  }
};
</script>

<style lang="scss">
</style>
