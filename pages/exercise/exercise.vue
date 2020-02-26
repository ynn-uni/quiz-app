<template>
  <view class="bg-linear">
    <cu-custom :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">竞猜答题</block>
    </cu-custom>
    <user-pannel :self="userInfo" />
    <subject v-if="questionList.length" type="exercise" :list="questionList" />
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
      questionList: null
    };
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  onLoad() {
    this.getQuestionLsit();
  },
  methods: {
    getQuestionLsit() {
      getQuestions().then(res => {
        console.log(res);
        this.questionList = res.data;
      });
    }
  }
};
</script>

<style lang="scss"></style>
