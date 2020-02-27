<template>
  <view class="subject" :style="{'margin-top': type === 'pk' ? '180rpx': '100rpx'}">
    <view class="title padding-lr">
      <text>{{`(${currentIndex + 1}/${list.length})`}} {{ curQuestion.title }}</text>
    </view>
    <view class="options">
      <view class="option-item margin-top" v-for="item in curQuestion.options" :key="item.id">
        <button
          :class="[
						'cu-btn round text-purple bg-white',
						item.id === selectOptionId && isRight === true ? 'is-right' : '',
						item.id === selectOptionId && isRight === false ? 'is-wrong' : ''
					]"
          @click="handleSelect(item.id)"
        >
          <text
            v-if="item.id === curQuestion.answer"
            :style="{ color: isRight === false ? '#F38B00' : '#fff' }"
            class="status cuIcon-check text-orange"
          ></text>
          <text v-if="item.id !== curQuestion.answer" class="status cuIcon-close"></text>
          {{ item.content }}
        </button>
      </view>
    </view>
    <view v-if="type === 'review'" class="action">
      <button class="next-btn cu-btn round bg-orange text-white" @click="turnToNext">下一题</button>
      <button class="next-btn cu-btn round text-purple" @click="turnToPrev">上一题</button>
      <navigator class="text-white text-lg" url="/pages/index/index">继续挑战</navigator>
    </view>
    <view v-if="type === 'exercise' && selectOptionId" class="action">
      <button class="next-btn cu-btn round bg-orange text-white" @click="turnToNext">下一题</button>
      <button class="next-btn cu-btn round text-purple" @click="turnToPrev">上一题</button>
      <navigator class="text-white text-lg" url="/pages/index/index">返回首页</navigator>
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
    type: {
      type: String,
      validator(value) {
        return ['pk', 'review', 'exercise'].indexOf(value) !== -1;
      },
      default: 'pk'
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
    curQuestion() {
      const index = this.currentIndex;
      return this.list[index];
    },
    isRight() {
      const id = this.selectOptionId;
      if (!id) {
        return null;
      }
      if (id === this.curQuestion.answer) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    handleSelect(evt) {
      if (this.selectOptionId != null || this.type === 'review') return;
      this.selectOptionId = evt;
      this.curQuestion.selected = evt;
      this.$emit('select', this.isRight);
      // this.$emit('select', {
      //   isRight: this.isRight,
      //   selected: evt
      // });
    },
    turnToNext(delay = 0) {
      setTimeout(() => {
        this.changeIndex(1);
        this.selectOptionId = null;
      }, delay);
    },
    turnToPrev(delay = 0) {
      setTimeout(() => {
        this.changeIndex(-1);
        this.selectOptionId = null;
      }, delay);
    },
    changeIndex(step) {
      const length = this.list.length;
      if (this.currentIndex + 1 < length) {
        this.currentIndex += step;
      } else {
        // 所有问题都答完
        this.$emit('finish');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.subject {
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
    .next-btn {
      margin: 30rpx 0;
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
