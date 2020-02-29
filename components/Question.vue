<template>
  <view class="question-wrap">
    <view class="flex align-center title">
      <text>{{ question.title }}</text>
    </view>
    <view class="options">
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
    height: 280rpx;
    padding: 20rpx 100rpx 20rpx;
    text-align: left;
    font-size: 32rpx;
    line-height: 1.6em;
    color: #fff;
    overflow: scroll;
  }

  .options {
    height: 460rpx;
    .option-item {
      position: relative;
      margin-top: 36rpx;
      .status {
        position: absolute;
        top: 60%;
        left: 20rpx;
        color: #fff;
        font-size: 40rpx;
        font-weight: bold;
      }
    }
  }

  .cu-btn {
    position: relative;
    padding: 24rpx;
    width: 60%;
    font-size: 32rpx;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
    .status {
      position: absolute;
      top: 50%;
      margin-top: -20rpx;
      left: 20rpx;
      color: #fff;
      font-size: 36rpx;
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
