<template>
  <view class="cover-page">
    <image class="cover" src="../../static/images/cover.gif" />
    <button
      class="login"
      open-type="getUserInfo"
      type="primary"
      :bindgetuserinfo="bindGetUserInfo"
    >登录</button>
    <button class="setting" open-type="openSetting">授权设置</button>
  </view>
</template>

<script>
export default {
  name: '',
  data() {
    return {};
  },
  onLoad() {
    this.wxLogin();
  },
  methods: {
    wxLogin() {
      uni.login({
        success: res => {
          console.log(res.code);
          this.login(res.code).then(res => {
            console.log(res);
          });
        }
      });
    },
    bindGetUserInfo() {
      console.log(e.detail.userInfo);
    },
    getUserInfo() {
      uni.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            uni.getUserInfo({
              withCredentials: true,
              success: res => {
                console.log(res.userInfo);
              }
            });
          }
        }
      });
    },
    getUserToken(code) {
      return uni.request({
        url: 'http://47.107.151.209:9801/User/login',
        data: {
          code
        },
        methods: 'POST'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.cover-page {
  position: relative;
  overflow: hidden;
  .cover {
    width: 100%;
    height: 100vh;
  }
  .setting,
  .login {
    position: absolute;
    bottom: 30px;
    left: 50%;
    width: 50%;
    transform: translateX(-50%);
  }
  .setting {
    bottom: 100px;
  }
}
</style>