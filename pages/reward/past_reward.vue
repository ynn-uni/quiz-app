<template>
	<view class="past" :style="{'height':height+'px'}">
		<view class="title flex justify-between align-center">
			<view class="back">
				<text class="cuIcon-back"></text>
				上一期
			</view>
			<view class="text">
				第1期（2020年2月9日）
			</view>
			<view class="next">
				下一期
				<text class="cuIcon-right"></text>
			</view>
		</view>
		<view class="list" :style="{'height':(height-23)+'px'}">
			<view class="item flex align-center justify-center padding-tb-xs" v-for="(item,index) in 10" :key="index">
				<image class="margin-right-lg" src="../../static/images/rank.png" mode=""></image>
				陈xx
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
	.past{
		height: 100%;
		// overflow-y:scroll;
		.title{
			width:636rpx;
			height:46rpx;
			background:rgba(205,175,255,1);
			.back,.next{
				font-size:24rpx;
				font-weight:400;
				color:rgba(246,241,239,1);
				line-height:34rpx;
				text{
					margin: 0 20rpx;
				}
			}
			.text{
				font-size:24rpx;
				font-weight:400;
				color:rgba(160,66,187,1);
			}
		}
		.list{
			height: 350rpx;
			overflow-y:scroll;
			.item{
				float: left;
				font-size:28rpx;
				font-weight:500;
				color:rgba(160,66,187,1);
				width: 50%;
				image{
					border-radius: 50%;
					width: 72rpx;
					height: 72rpx;
				}
			}
		}
	}
</style>
