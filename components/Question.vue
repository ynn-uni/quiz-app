<template>
  <view class="question-wrap" :style="{'margin-top': '100rpx'}">
    <view class="title padding-lr">
      <text>{{ question.title }}</text>
    </view>
    <view class="options"></view>
    <view class="option-item margin-top" v-for="item in question.options" :key="item.id">
      <button
        :class="[
						'cu-btn round text-purple bg-white',
						item.id === selectOptionId && isRight === true ? 'is-right' : '',
						item.id === selectOptionId && isRight === false ? 'is-wrong' : ''
					]"
        @click="handleSelect(item.id)"
      >
        <text
          v-if="item.id === question.answer"
          :style="checkIconColor"
          class="status cuIcon-check text-orange"
        ></text>
        <text v-if="item.id !== question.answer" class="status cuIcon-close"></text>
        {{ item.content }}
      </button>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
      default: () => {}
    },
    showAnswer: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectOptionId: null
    };
  },
  computed: {
    isRight() {
      const id = this.selectOptionId;
      if (!id) {
        return null;
      }
      if (id === this.question.answer) {
        return true;
      } else {
        return false;
      }
    },
    checkIconColor() {
      let flag = false;
      if (
        // 用户选择错误，或需要显示答案时
        this.isRight === false ||
        // 用户未选择，且需要显示答案时
        (this.isRight == null && this.showAnswer)
      ) {
        flag = true;
      }
      return `color: ${flag ? '#F38B00' : '#fff'}`;
    }
  },
  methods: {
    resetResult() {
      this.selectOptionId = null;
    },
    handleSelect(evt) {
      if (this.selectOptionId != null || this.disabled) return;
      this.selectOptionId = evt;
      this.$emit('select', {
        isRight: this.isRight,
        selected: this.selectOptionId
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.question-wrap {
  text-align: center;
  .title {
    font-size: 32rpx;
    color: #fff;
  }

  .options {
    margin-top: 80rpx;
  }

  .option-item {
    position: relative;
    margin-top: 60rpx;
    .status {
      position: absolute;
      top: 50%;
      left: 20rpx;
      color: #fff;
      font-size: 40rpx;
      font-weight: bold;
    }
  }

  .action {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 100rpx;
    .action-btn {
      margin: 30rpx 0;
    }
    navigator {
      margin-top: 20rpx;
    }
  }

  .cu-btn {
    position: relative;
    padding-top: 40rpx;
    padding-bottom: 40rpx;
    width: 50%;
    font-size: 36rpx;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
    .status {
      position: absolute;
      top: 50%;
      margin-top: -20rpx;
      left: 20rpx;
      color: #fff;
      font-size: 40rpx;
      font-weight: bold;
    }
    &.is-right {
      color: #fff;
      background-color: $color-orange;
    }
    &.is-wrong {
      color: #fff;
      background-color: $color-red;
    }
  }
}
</style>
