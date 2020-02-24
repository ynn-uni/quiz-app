<template>
  <view class="subject">
    <view class="title padding-lr">
      <text>{{`(${currentIndex + 1}/${list.length})`}} {{ question.title }}</text>
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
            :style="{ color: isRight === false ? '#F38B00' : '#fff' }"
            class="status cuIcon-check text-orange"
          ></text>
          <text v-if="item.id !== question.answer" class="status cuIcon-close"></text>
          {{ item.content }}
        </button>
      </view>
    </view>
    <view v-if="!autoNext && selectOptionId" class="action">
      <view class="explain text-center">
        <text class="text-white text-lg">解：{{ question.explain }}</text>
      </view>
      <view>
        <button class="next-btn cu-btn round bg-orange text-white" @click="turnToNext">下一题</button>
        <navigator class="text-white text-lg" url="/pages/index/index">返回首页</navigator>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      required: true,
      type: Array,
      default: () => []
    },
    autoNext: {
      type: Boolean,
      default: false
    },
    delay: {
      type: Number,
      default: 800
    }
  },
  data() {
    return {
      selectOptionId: null,
      currentIndex: 0
    };
  },
  computed: {
    question() {
      const index = this.currentIndex;
      return this.list[index];
    },
    isRight() {
      const question = this.question;
      const id = this.selectOptionId;
      if (!id) {
        return null;
      }
      if (id === question.answer) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    handleSelect(evt) {
      if (this.selectOptionId != null) return;
      this.selectOptionId = evt;
      const question = this.question;
      this.$emit('select', this.isRight);
      if (this.autoNext) {
        this.turnToNext(this.delay);
      }
    },
    turnToNext(delay = 0) {
      setTimeout(() => {
        this.changeIndex();
        this.selectOptionId = null;
      }, delay);
    },
    changeIndex() {
      const length = this.list.length;
      if (this.currentIndex + 1 < length) {
        this.currentIndex += 1;
      } else {
        this.currentIndex = 0;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.subject {
  margin-top: 200rpx;
  text-align: center;
  .title {
    font-size: 32rpx;
    color: #fff;
  }
  .options {
    margin-top: 120rpx;
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
    margin-top: 100rpx;
    .next-btn {
      margin: 64rpx 0;
    }
  }

  .cu-btn {
    position: relative;
    padding-top: 40rpx;
    padding-bottom: 40rpx;
    min-width: 50%;
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
