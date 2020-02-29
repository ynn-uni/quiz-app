<template>
  <view class="index-page bg-linear">
    <image class="index-bg" src="../../static/images/index-bg.png" />
    <view class="index-content">
      <cu-custom>
        <block slot="content">竞猜答题</block>
      </cu-custom>
      <index-header @nologin="showAuthModal"></index-header>
      <user-level></user-level>
      <view class="index-bottom flex flex-direction justify-center flex-sub">
        <view class="index-brand margin-bottom-lg">
          <image src="../../static/images/brand.png" />
        </view>
        <view class="index-mode flex justify-between">
          <view class="index-mode-item margin-top" @click="handleModeSelect('exercise')">
            <image src="../../static/images/exercise.png" />
            <image
              v-if="selectedMode === 'exercise'"
              class="index-mode-mask"
              src="../../static/images/mode-mask.png"
            />
          </view>
          <view class="index-mode-item">
            <image src="../../static/images/challenge.png" @click="handleModeSelect('challenge')" />
            <image
              v-if="selectedMode === 'challenge'"
              class="index-mode-mask"
              src="../../static/images/mode-mask.png"
            />
          </view>
        </view>
        <!-- <view class="index-go" hover-class="btn-hover-trans">
        <button class="cu-btn setting sm block" open-type="openSetting">授权设置</button>
          <image class="btn-image" src="../../static/images/start.png" @click="turnToPage" />
        </view>-->
      </view>

      <login-modal ref="modal" @confirm="handleModalConfirm"></login-modal>
    </view>
  </view>
</template>

<script>
import IndexHeader from './header.vue';
import UserLevel from './level.vue';
import { loginOrRegister, getUserInfoApi } from '../../apis';
import LoginModal from '../../components/LoginModal.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
  components: { IndexHeader, UserLevel, LoginModal },
  data() {
    return {
      selectedMode: null,
      challengeUrl: '/pages/challenge/challenge',
      exerciseUrl: '/pages/exercise/exercise'
    };
  },
  computed: {
    ...mapGetters(['token'])
  },
  onShareAppMessage(e) {
    return {
      title: '答题竞猜？比比看吧！',
      path: '/pages/index/index'
    };
  },
  onShow() {
    if (this.token) {
      this.fatchUserInfoByToken();
    }
  },
  methods: {
    ...mapActions('user', [
      'wxLogin',
      'fatchUserInfoByToken',
      'loginWithUserInfo'
    ]),
    handleModeSelect(evt) {
      if (!this.checkUserLogin()) return;

      this.selectedMode = evt;
      setTimeout(() => {
        this.turnToPage();
      }, 0);
    },
    checkUserLogin: function(data) {
      if (!this.token) {
        this.showAuthModal();
        return false;
      }
      return true;
    },
    showAuthModal() {
      this.$refs.modal.show();
    },
    handleModalConfirm(evt) {
      const { iv, encryptedData } = evt;
      this.loginWithUserInfo({ iv, encryptedData });
    },
    turnToPage() {
      const urlKey = this.selectedMode + 'Url';
      uni
        .navigateTo({
          url: this[urlKey]
        })
        .then(() => {
          setTimeout(() => {
            this.selectedMode = null;
          }, 1000);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.index-page {
  position: relative;
  .index-bg {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 850rpx;
  }
  @at-root.index-content {
    z-index: 2;
    .index-bottom {
      position: absolute;
      top: 600rpx;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .index-brand {
      margin-top: 20rpx;
      text-align: center;
      image {
        width: 400rpx;
        height: 160rpx;
      }
    }

    .index-mode {
      padding: 0 80rpx;
      .index-mode-item {
        position: relative;
        width: 275rpx;
        height: 320rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .index-mode-mask {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
      }
    }
    .index-go {
      padding-bottom: 20rpx;
      text-align: center;
      image {
        width: 320rpx;
        height: 120rpx;
      }
    }
  }
}
</style>
