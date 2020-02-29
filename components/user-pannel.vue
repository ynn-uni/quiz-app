<template>
	<view class="user-pannel flex justify-between padding">
		<view class="user-self bg-blue">
			<view class="user-avatar">
				<image :src="userInfo.avatar"></image>
			</view>
			<view class="pannel-text">
				<text>{{ userInfo.name || '' }}</text>
				<view class="text-lg">
					{{ pk ? userScore : content }}
				</view>
			</view>
		</view>
		<view v-if="pk" class="timer">
			<view class="timer-content text-sm">{{ time }}s</view>
		</view>
		<view  v-if="pk" class="user-opponent bg-red">
			<view class="user-avatar">
				<image :src="opponentInfo.avatar"></image>
			</view>
			<view class="pannel-text text-right">
				<text>{{ opponentInfo.name || '' }}</text>
				<view class="text-lg">
					{{ opponentScore }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		props: {
			pk: {
				type: Boolean,
				default: false
			},
			content: {
				type: String,
				default: ''
			},
			time: {
				type: Number,
				default: 10
			}
		},
		computed: {
			...mapGetters([
				'userInfo',
				'opponentInfo',
				'userScore',
				'opponentScore'
			])
		}
	}
</script>

<style lang="scss" scoped>
	.user-pannel {
		.user-self,
		.user-opponent {
			display: flex;
			min-width: 320rpx;
			align-items: center;
			padding: 12rpx;
			border-radius: 5000rpx;
			color: #fff;
		}
		.user-self {
			padding-right: 32rpx;
		}
		.user-opponent {
			flex-direction: row-reverse;
		}
		
		.user-avatar {
			width: 72rpx;
			height: 72rpx;
			border-radius: 72rpx;
			border: 4px solid #fff;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.pannel-text {
			font-size: 20rpx;
			margin-left: 20rpx;
			margin-right: 20rpx;
		}
		.timer {
			position: absolute;
			left: 50%;
			width: 110rpx;
			height: 110rpx;
			transform: translate(-50%, -6rpx);
			background: #fff;
			border: 10rpx solid #5c039f;
			border-radius: 50%;
			padding: 20rpx;
			.timer-content {
				height: 100%;
				line-height: 55rpx;
				text-align: center;
				color: #fff;
				background: #5c039f;
				border-radius: 50%;
				
			}
		}
	}
</style>
