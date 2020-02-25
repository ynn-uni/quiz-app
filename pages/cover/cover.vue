<template>
  <view class="cover-page bg-linear">
    <image class="cover" src="../../static/images/cover.gif" />
	<button class="login" type="primary" @click="checkUserLogin">登录</button>
	<ModelLogin v-on:ListenChild="ShowChild" :modalname="modalname"></ModelLogin>
   <!-- <button
      class="login"
      open-type="getUserInfo"
      type="primary"
      :bindgetuserinfo="bindGetUserInfo"
    >登录</button> -->
    <button class="setting" open-type="openSetting">授权设置</button>
  </view>
</template>

<script>
import {postAction,getAction} from '../../utils/request.js'
import ModelLogin from '../../components/modelLogin.vue'
export default {
  name: '',
  data() {
    return {
		code:null,//登录获取的code
		modalname:null,
		isresolve:false
	};
  },
  components:{
	  ModelLogin
  },
  onLoad() {
    this.wxLogin();
	
  },
  methods: {
    wxLogin() {
		
      uni.login({
        success: res => {
          // 获取code
		  this.code=res.code
		  console.log("code_login:"+res.code)
		 // this.getUserInfo()
			this.getUserInfo()
        }
      });
    },
    bindGetUserInfo() {
      console.log(e.detail.userInfo);
    },
	ShowChild: function (data) {
		console.log(data)
		if(data==="点击确认"){
			this.userInfoApi();
		}else if(data==="点击取消"){
			
		}
		this.modalname=null
		
	},
	checkUserLogin(){
		if(this.isresolve){
			uni.navigateTo({
				url:'/pages/index/index'
			})
		}else{
			this.modalname='noregister'
		}
	},
    getUserInfo() {
		
      uni.getSetting({
        success: res => {
			console.log(res)
			
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
			this.isresolve=true;
           this.userInfoApi();
          }
        }
      });
    },
	
   
	userInfoApi(){
		console.log(this.$store)
		console.log(this.$store.commit)
		uni.getUserInfo({
		  withCredentials: true,
		  success: res => {
		    console.log(res);
			postAction("/User/loginOrRegister",{code:this.code,iv:res.iv,encryptedData:res.encryptedData}).then((res)=>{
				
							  console.log(res)
				// this.setToken(res[1].data.data.token)
				getAction("/User/getUserInfo",{},res[1].data.data.token).then((resoult)=>{
					console.log(resoult)
					this.$store.commit("user/updateUserInfo",resoult[1].data.data)
					uni.navigateTo({
						url:'/pages/index/index'
					})
				})
			})
		  }
		});
	},
	setToken(token){
		uni.setStorage({
			key:'token',
			data:token,
			 success() {
				console.log("设置缓存成功")
			 },
			 fail() {
				 console.log('缓存失败了')
			 }
		});
	},
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