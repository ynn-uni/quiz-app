<template>
  <view class="bg-linear">
    <cu-custom :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">挑战回顾</block>
    </cu-custom>
    <user-pannel :self="userInfo" />
    <subject ref="subject" type="review" :list="questionList" @finish="handleFinish"></subject>
  </view>
</template>

<script>
import Subject from '../../components/subject';
import { mapGetters } from 'vuex';
export default {
  name: 'Review',
  components: { Subject },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['questionList'])
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>