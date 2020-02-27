<template>
  <view class="bg-linear">
    <user-pannel ref="pannel" />
    <subject ref="subject" type="review" :list="questionList" @finish="handleFinish"></subject>
  </view>
</template>

<script>
import UserPannel from '../../components/user-pannel';
import Subject from '../../components/subject';
import { mapGetters } from 'vuex';
export default {
  name: 'Review',
  components: { UserPannel, Subject },
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