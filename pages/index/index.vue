<template>
  <view class="index-page bg-linear">
    <image class="index-bg" src="../../static/images/index-bg.png" />
    <view class="index-content">
      <cu-custom>
        <block slot="content">竞猜答题</block>
      </cu-custom>
      <index-header v-on:ListenChild1="checkUserLogin"></index-header>
      <user-level></user-level>
      <view class="index-bottom flex flex-direction justify-around flex-sub">
        <view class="index-brand">
          <image src="../../static/images/brand.png" />
        </view>
        <view class="index-mode flex justify-between">
          <view class="index-mode-item margin-top" @click="handleClick('exercise')">
            <image src="../../static/images/exercise.png" />
            <image
              v-if="selectedMode === 'exercise'"
              class="index-mode-mask"
              src="../../static/images/mode-mask.png"
            />
          </view>
          <view class="index-mode-item">
            <image src="../../static/images/challenge.png" @click="handleClick('challenge')" />
            <image
              v-if="selectedMode === 'challenge'"
              class="index-mode-mask"
              src="../../static/images/mode-mask.png"
            />
          </view>
        </view>
        <view class="index-go" hover-class="btn-hover-trans">
          <image class="btn-image" src="../../static/images/start.png" @click="turnToPage" />
        </view>
      </view>
      <ModelLogin v-on:ListenChild="ShowChild" :modalname="modalname"></ModelLogin>
    </view>
  </view>
</template>

<script>
import IndexHeader from './header.vue';
import UserLevel from './level.vue';
import { loginOrRegister, getUserInfoApi } from '../../apis';
import ModelLogin from '../../components/modelLogin.vue';
export default {
  components: { IndexHeader, UserLevel, ModelLogin },
  data() {
    return {
      selectedMode: null,
      challengeUrl: '/pages/challenge/challenge',
      exerciseUrl: '/pages/exercise/exercise',
      isresolve: null,
      modalname: null
    };
  },
  onShareAppMessage(e) {
    return {
      title: '答题竞猜？比比看吧！',
      path: '/pages/index/index'
    };
  },
  onShow() {
    this.wxLogin();
  },
  methods: {
    handleClick(evt) {
      this.selectedMode = evt;
      // setTimeout(() => {
      // 	this.turnToPage()
      // }, 0)
    },
    turnToPage() {
      const urlKey = this.selectedMode + 'Url';
      uni.navigateTo({
        url: this[urlKey]
      });
    },

    //登陆相关
    wxLogin() {
      uni.login({
        success: res => {
          // 获取code
          this.code = res.code;
          this.checkUserSetting();
        }
      });
    },
    ShowChild: function(data) {
      console.log(data);
      this.modalname = null;
      if (data === '授权成功') {
        this.isresolve = true;

        this.userInfoApi();
      }
    },
    checkUserLogin: function(data) {
      console.log(data);
      this.modalname = 'noregister';
    },
    // 检查用户授权设置
    checkUserSetting() {
      uni.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            this.isresolve = true;
            this.userInfoApi();
          }
        }
      });
    },

    userInfoApi() {
      uni.getUserInfo({
        withCredentials: true,
        success: res => {
          loginOrRegister({
            code: this.code,
            iv: res.iv,
            encryptedData: res.encryptedData
          }).then(res => {
            this.$store.commit('user/updateToken', res.data.token);
            this.fatchUserInfoByToken();
          });
        }
      });
    },
    fatchUserInfoByToken() {
      getUserInfoApi().then(res => {
        const {
          battle,
          defeat,
          id,
          level,
          nickname,
          portrait,
          score,
          sex,
          streak,
          train,
          today_rank,
          today_score,
          experience
        } = res.data;
        const userinfo = {
          name: nickname,
          avatar: portrait,
          level: level,
          victory: streak, //胜场
          credit: score, // 积分
          battle,
          defeat, //败场
          id,
          sex,
          train,
          today_rank,
          today_score,
          experience
        };
        this.$store.commit('user/updateUserInfo', userinfo);
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
