<template>
	<view class="address flex flex-direction align-center">
		<view class="title text-center margin-top-lg margin-bottom-sm">
			编辑收货信息
		</view>
		<view class="cu-form-group my-group margin-tb-xs">
			<text class='cuIcon-people margin-right-sm color_mycuicon'></text>
			<input placeholder="姓名" name="input" v-model="name"></input>
		</view>
		<view class="cu-form-group my-group margin-tb-xs">
			<text class='cuIcon-phone margin-right-sm color_my'></text>
			<input placeholder="电话" name="input" v-model="phone"></input>
		</view>
		<view class="cu-form-group my-group margin-tb-xs">
			<text class='cuIcon-location margin-right-sm color_mycuicon'></text>
			<input placeholder="地址" name="input" v-model="address"></input>
		</view>
		<button class="cu-btn round lg bg-orange margin-top-sm" @click="save">保存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:null,
				phone:null,
				address:null
			}
		},
		
		methods: {
			save(){
				console.log(this.name,this.phone,this.address)
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
