<template>
	<view class="address flex flex-direction align-center">
		<view class="title text-center margin-top-lg margin-bottom-sm">
			编辑收货信息
		</view>
		<view class="cu-form-group my-group margin-tb-xs">
			<text class='cuIcon-people margin-right-sm color_mycuicon'></text>
			<input placeholder="姓名" name="input" v-model="name" disabled></input>
		</view>
		<view class="cu-form-group my-group margin-tb-xs">
			<text class='cuIcon-phone margin-right-sm color_my'></text>
			<input placeholder="电话" name="input" v-model="tel" disabled></input>
		</view>
		<view class="cu-form-group my-group margin-tb-xs">
			<text class='cuIcon-location margin-right-sm color_mycuicon'></text>
			<input placeholder="地址" name="input" v-model="address" disabled></input>
		</view>
		<!-- <button class="cu-btn round lg bg-orange margin-top-sm" @click="save">保存</button> -->
		<button class="cu-btn round lg bg-orange margin-top-sm" @tap='wxaddress'>编辑</button>
	</view>
</template>

<script>
import {setUserInfo} from '../../../apis'
	export default {
		data() {
			return {
				name:null,
				tel:null,
				address:null
			}
		},
		// /User/setUserInfo
		
		methods: {
			wxaddress() {
			    const that=this
			    const arr={}
			    wx.getSetting({
			      success(res) { 
			        if (res.authSetting['scope.address']) { 
			          wx.chooseAddress({
			            success(res) { 
							that.setAddressInfo(res)
							
			            }
			          }) 
			        } else {
			          if (res.authSetting['scope.address'] == false) { 
			            wx.openSetting({
			              success(res) { 
			                console.log(res)
			              }
			            })
			          } else { 
			            wx.chooseAddress({
			              success(res) { 
							  that.setAddressInfo(res)
			                
			              }
			            })
			          }
			        }
			      }
			    })
			},
			 setAddressInfo(data){
				 this.name=data.userName
				 this.tel=data.telNumber
				 this.address=data.cityName+data.countyName+data.detailInfo
				 this.save()
			 },
			save(){
				console.log(this.name,this.tel,this.address)
				if(this.name&&this.tel&&this.address){
					setUserInfo({
						truename:this.name,
						mobile:this.tel,
						address:this.address
					}).then((res)=>{
						console.log(res)
						if(res.status==200){
								uni.showToast({
									title: '成功',
									icon: 'none'
							});
						}else{
							uni.showToast({
									title: '失败',
									icon: 'none'
							});
						}
					})
				}else{
					uni.showModal({
						title:"请填完基本信息"
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.address{
		.title{
			color: #fff;
			font-size:32rpx;
		}
		.my-group{
			width: 560rpx;
			min-height: 80rpx;
			border-radius: 40rpx;
			input{
				font-size:24rpx;
				font-weight:400;
				color:rgba(168,174,184,1);
			}
			.color_my{
				color: #5c0e84;
				font-size: 36rpx;
				width: 30rpx;
				line-height: 08rpx;
			}
			.color_mycuicon{
				width: 30rpx;
				line-height: 28rpx;
				font-size: 24rpx;
				color: #5c0e84;
				text-align: center;
				border: 1px solid #5c0e84;
				border-radius: 50%;
			}
		}
	}
</style>
