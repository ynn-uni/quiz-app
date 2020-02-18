<template>
	<view class="my_reward" :style="{'height':height+'px'}">
		<view class="item flex align-center padding-tb-sm" v-for="(item,index) in 10" :key="index">
			<view class="data">
				{{index+1}}、2020年2月10日
			</view>
			<image src="../../static/images/reword_kouzhao.png" mode=""></image>
			<view class="num">
				x1
			</view>
			<view class="btn active">
				点击兑换
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:{
			height:String
		},
		
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.my_reward{
		height: 100%;
		overflow-y:scroll;
		.item{
			width: 636rpx;
			image{
				width: 66rpx;
				height: 48rpx;
				margin-left: 36rpx;
				margin-right: 86rpx;
			}
			.data{
				width:236rpx;
				height:40rpx;
				font-size:26rpx;
				color:rgba(168,174,184,1);
				line-height:40rpx;
			}
			.num{
				font-size:24rpx;
				font-weight:600;
				color:rgba(95,1,151,1);
				margin-right: 64rpx;
			}
			.btn{
				text-align: center;
				width:104rpx;
				background:rgba(216,216,216,1);
				border-radius:14rpx;
				color:rgba(160,66,187,1);
				line-height:32rpx;
				font-size: 22rpx;
				padding: 4rpx;
			}
			.active{
				background:rgba(160,66,187,1);
				color: #fff;
			}
		}
	}
</style>
