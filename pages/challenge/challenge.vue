<template>
  <view class="bg-linear">
    <cu-custom :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">擂台挑战</block>
    </cu-custom>
    <arrange v-if="isMatched" :user="userInfo"></arrange>
    <ready v-if="isReady" :user="userInfo" :opponent="opponentInfo"></ready>
    <quiz v-if="isQuiz" :questions="qusetionList" @score="postSocre"></quiz>
  </view>
</template>

<script>
import Arrange from './arrange';
import Ready from './ready';
import Quiz from './quiz.vue';
import WebsocketUtils from '@/utils/websocket';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { getQuestions } from '../../apis/index';
export default {
  components: { Arrange, Ready, Quiz },
  data() {
    return {
      qusetionList: []
    };
  },
  computed: {
    ...mapState('challenge', ['isMatched', 'isReady', 'isQuiz']),
    ...mapGetters(['userInfo', 'opponentInfo', 'socketInstance'])
  },
  watch: {
    isReady(val) {
      if (val === false) {
        this.changeQuizStatus(true);
      }
    }
  },
  onShow: function(options) {
    this.qusetionList = getQuestions();
    this.initWebsocket().then(instance => {
      instance.send({ data: 'matching' });
    });
  },
  onUnload: function() {
    this.closeWebsocket();
  },
  methods: {
    ...mapMutations('challenge', ['changeQuizStatus']),
    ...mapActions('challenge', ['initWebsocket', 'closeWebsocket'])
  }
};
</script>

<style lang="scss">
</style>
