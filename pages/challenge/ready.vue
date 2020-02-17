<template>
	<view class="ready" :style="{'height': `calc(100vh - ${customBar})`}">
		<view class="title">准备就绪！</view>
		<view class="left-side left">
			<image class="name-bg left" src="../../static/images/ready-left-bg.png"></image>
			<image class="victory-bg left bottom" src="../../static/images/ready-left-tag.png"></image>
			<image class="avatar" :src="avatar"></image>
			<text class="nickname">{{ nickname }}</text>
			<text class="victory">{{ 0 }}连胜</text>
		</view>
		<view class="right-side right">
			<image class="name-bg right" src="../../static/images/ready-right-bg.png"></image>
			<image class="victory-bg right bottom" src="../../static/images/ready-right-tag.png"></image>
			<image class="avatar" :src="avatar"></image>
			<view class="nickname">{{ nickname }}</view>
			<view class="victory">{{ 0 }}连胜</view>
		</view>
		<view class="vs-image">
			<image src="../../static/images/vs.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		computed: {
			nickname: () => getApp().globalData.nickname,
			avatar: () => getApp().globalData.avatar,
			victory: () => getApp().globalData.victory
		},
		data() {
			return {
				customBar: this.CustomBar
			}
		}
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
		.left-side,
		.right-side {
			position: absolute;
			.victory-bg,
			.avatar,
			.nickname,
			.victory {
				position: absolute;
			}
			.victory-bg {
				width: 210rpx;
				height: 186rpx;
				bottom: 0;
			}
			.avatar {
				border: 8rpx solid #fff;
				border-radius: 100rpx;
				overflow: hidden;
				width: 100rpx;
				height: 100rpx;
			}
			.nickname {
				font-size: 36rpx;
				font-weight: 500;
				color: #fff;
				transform: rotateZ(30deg);
			}
			.victory {
				font-size: 40rpx;
				color: #fff;
				font-weight: 500;
				transform: rotateZ(30deg);
				text-shadow:0px 1px 2px rgba(0,0,0,0.5);
			}
		}
		.left-side {
			top: 160rpx;
			.name-bg {
				width: 350rpx;
				height: 575rpx;
			}
			.avatar {
				top: 99rpx;
				left: 60rpx;
			}
			.nickname {
				top: 257rpx;
				left: 54rpx;
			}
			.victory {
				top: 469rpx;
				left: 50rpx;
			}
		}
		.right-side {
			top: 560rpx;
			.name-bg {
				width: 390rpx;
				height: 490rpx; // 470
				padding-bottom: 20rpx;
			}
			.avatar {
				top: 18rpx;
				right: 60rpx;
			}
			.nickname {
				top: 190rpx;
				right: 27px;
			}
			.victory {
				top: 376rpx;
				right: 13px;
			}
		}
		
		.vs-image {
			position: absolute;
			top: 450rpx;
			left: 50%;
			transform: translateX(-50%);
			text-align: center;
			image {
				width: 380rpx;
				height: 380rpx;
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
