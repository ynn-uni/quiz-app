<template>
  <view class="arrange">
	<view  class="arrange-image">
		<image src="../../static/images/map.png"></image>
	</view>
	<view class="flex justify-center align-center">
		<view class="search">
			<view class="search-bg"></view>
			<view class="search-image">
				<image class="search-image-inner" src="../../static/images/search.png"></image>
			</view>
		</view>
		<text class="margin-left text-white">正在搜索匹配的对手</text>
	</view>
	<view class="user text-center">
		<view class="avatar"><open-data type="userAvatarUrl"></open-data></view>
		<view class="nickname"><open-data type="userNickName"></open-data></view>
		<view class="level">lv{{level}}</view>
	</view>
  </view>
</template>

<script>
export default {
  name: 'Arrange',
  props: {
	level: {
		type: Number,
		default: 1
	}  
  },
  data() {
    return {}
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
	.arrange {
		.arrange-image {
			padding-top: 60rpx;
			padding-bottom: 60rpx;
			text-align: center;
			image {
				width: 480rpx;
				height: 480rpx;
			}
		}
		.search {
			position: relative;
			width: 60rpx;
			height: 60rpx;
			border: 1rpx solid rgba(255, 255, 255, 0.6);
			padding: 8rpx;
			border-radius: 50%;
			.search-bg {
				width: 40rpx;
				height: 40rpx;
				border-radius: 50%;
				background: rgba(255, 255, 255, 0.6);
			}
			.search-image {
				position: absolute;
				top: -4rpx;
				animation:spin 2s infinite linear;
				transform-origin: 50% 40rpx;
			}
			.search-image-inner{
				width: 60rpx;
				height: 60rpx;
				animation: spin-reverse 2s infinite linear;
			}
		}
		.user {
			font-weight: 500;
			.avatar {
				margin: 60rpx auto 40rpx;
				width: 160rpx;
				height: 160rpx;
				border-radius: 160rpx;
				box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.5);
				overflow: hidden;
			}
			.nickname {
				font-size: 32rpx;
				color: #fff;
			}
			.level {
				margin-top: 10rpx;
				color: #fff;
			}
		}
		
		@keyframes spin{
			to{transform: rotate(1turn);}
		}
		@keyframes spin-reverse{
			from{
				transform:rotate(1turn);
			}
		}
	}
</style>