<template>
  <view class="question-wrap">
    <view
      class="flex align-center title"
      :class=" {
        'animation-slide-left': slideIn,
        'animation-slide-right': slideOut,
        'animation-reverse': slideOut
      }"
    >
      <text>{{ question.title }}</text>
    </view>
    <view class="options">
      <view class="option-item margin-top" v-for="(item, index) in question.options" :key="item.id">
        <button
          :class="['cu-btn round text-purple bg-white',
            item.id === selectOptionId && isRight === true ? 'is-right' : '',
            item.id === selectOptionId && isRight === false ? 'is-wrong' : '',
            showAnimation && item.id === selectOptionId && isRight === false ? 'animation-shake' : '',
            showAnimation && slideOut ? 'option-slide-botton' : ''
          ]"
          @click="handleSelect(item.id)"
          :style="{'animation-delay':  `0.${question.options.length - index}s` }"
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
    },
    showAnimation: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selectOptionId: null,
      slideIn: this.showAnimation ? true : false,
      slideOut: false
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
  watch: {
    'question.title': {
      handler(val, oldVal) {
        if (val !== oldVal && this.showAnimation) {
          this.slideOut = true;
          setTimeout(() => {
            this.slideIn = true;
            this.slideOut = false;
          }, 500);
        }
      }
    },
    //回顾问题时，当问题中包含selected字段时，激活选中该选项
    'question.selected': {
      handler(val) {
        if (val) {
          this.selectOptionId = val;
        } else {
          this.selectOptionId = null;
        }
      }
    }
  },
  methods: {
    buttonClass(item) {
      return {
        'is-right': item.id === this.selectOptionId && this.isRight === true,
        'is-wrong': item.id === this.selectOptionId && this.isRight === false,
        'animation-reverse': this.slideOut,
        'animation-slide-bottom': this.slideOut,
        'animation-shake': this.showAnimation && this.isRight === false
      };
    },
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
    .option-slide-botton {
      animation-duration: 0.3s;
      animation-name: btn-slide-bottom;
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
      margin-top: -26rpx;
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
@keyframes btn-slide-bottom {
  0% {
    opacity: 1;
    transform: translateY(0);
  }

  100% {
    opacity: 0;
    transform: translateY(800rpx);
  }
}
.animation-delay-0 {
  animation-delay: 0s;
}
.animation-delay-1 {
  animation-delay: 0.1s;
}
.animation-delay-2 {
  animation-delay: 0.2s;
}
.animation-delay-3 {
  animation-delay: 0.3s;
}
.animation-delay-4 {
  animation-delay: 0.4s;
}
</style>
