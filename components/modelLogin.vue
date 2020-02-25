<template>
	<view class="cu-modal" :class="modalname=='noregister'?'show':modalname=='DialogModal2'?'show':modalname=='DialogModal4'?'show':''">
		<view class="cu-dialog">
			<view class="cu-bar bg-white justify-end">
				<view class="content">提示</view>
				<view class="action" @tap="hideModal">
					<text class="cuIcon-close text-red"></text>
				</view>
			</view>
			<view class="padding-xl">
				
				{{modalname=='noregister'?'获取微信授权?':modalname=='DialogModal2'?'确定删除该设备？':modalname=='DialogModal4'?'获取手机授权?':''}}
				
			</view>
			<view class="cu-bar bg-white justify-end">
				<view class="action">
					<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
					<!-- 弹出授权框 -->
					<button class="cu-btn bg-green margin-left" @tap="makesure" open-type="getUserInfo"
				  bindgetuserinfo="bindGetUserInfo" v-if="modalname=='noregister'">确定</button>
				  <!-- 确定 -->
					<!-- <button
					  class="login"
					  open-type="getUserInfo"
					  type="primary"
					  :bindgetuserinfo="bindGetUserInfo"
					>登录</button> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default{
		data(){
			return{
				iv:'',
				encryptedData:''
			}
			
		},
		props:{
			modalname:'',
			
		},
		getPhoneNumber(e){
			console.log(e)
			this.iv=e.detail.iv;
			this.encryptedData=e.detail.encryptedData;
			
		},
		methods:{
			bindGetUserInfo() {
			  console.log(e.detail.userInfo);
			},
			getUserInfo() {
				console.log("kkk")
			  uni.getSetting({
			    success: res => {
					// this.getIvandSessioncode()
					 this.modalname="noregister"
			      if (res.authSetting['scope.userInfo']) {
			        // 已经授权，可以直接调用 getUserInfo 获取头像昵称
			        uni.getUserInfo({
			          withCredentials: true,
			          success: res => {
			            console.log({code:this.code,iv:res.iv,encryptedData:res.encryptedData});
						postAction("/User/loginOrRegister",{code:this.code,iv:res.iv,encryptedData:res.encryptedData}).then((res)=>{
							
										  console.log(res)
							
						})
			          }
			        });
			      }else{
					 this.modalname="noregister"
				  }
			    }
			  });
			},
			makesure(){
				this.$emit("ListenChild","点击确认")
			},
			hideModal(e) {
				this.$emit("ListenChild","点击取消")
			},
		}
	}
</script>

<style lang="scss" scoped>
</style>
