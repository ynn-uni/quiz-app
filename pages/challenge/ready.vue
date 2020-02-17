<template>
	<view class="ready">
		<view class="title">准备就绪！</view>
		<view class="left-side left">
			<view class="left-bg">
				<image class="name-bg left" src="../../static/images/ready-left-bg.png"></image>
				<image class="win-bg left bottom" src="../../static/images/ready-left-tag.png"></image>
			</view>
		</view>
		<view class="right-side right">
			<view class="right-bg">
				<image class="name-bg right" src="../../static/images/ready-right-bg.png"></image>
				<image class="win-bg right bottom" src="../../static/images/ready-right-tag.png"></image>
			</view>
		</view>
		<view class="vs-image none">
			<image src="../../static/images/vs.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
	.ready {
		position: relative;
		padding-top: 180rpx;
		.title {
			text-align: center;
			font-size: 54rpx;
			font-weight: bold;
			color: #fff;
		}
		.left-side {
			position: absolute;
			top: 160rpx;
			.left-bg {
				.name-bg {
					width: 350rpx;
					height: 575rpx;
				}
				.win-bg {
					position: absolute;
					width: 210rpx;
					height: 186rpx; 
				}
			}
		}
		.right-side {
			position: absolute;
			top: 560rpx;
			.right-bg {
				.name-bg {
					width: 350rpx;
					height: 480rpx;
				}
				.win-bg {
					position: absolute;
					width: 210rpx;
					height: 186rpx; 
				}
			}
		}
		
		.vs-image {
			display: none;
			text-align: center;
			image {
				width: 500rpx;
				height: 500rpx;
			}
		}
		.left {
			left: 0;
		}
		.right {
			right: 0;
		}
		.bottom {
			bottom: 0;
		}
	}
</style>
