<template>
	<view class="level">
		<view class="progress-wrapper flex justify-center align-center">
			<progress class="progress" :percent="percent" border-radius="7px" stroke-width="7px" background-color="#3d0273" active-color="#ffce24" :active="true" />
			<view class="progress-label">lv{{ level }}</view>
		</view>
		<view class="score flex">
			<view class="score-item">
				<view>{{ score }}分</view>
				<view class="label">当前得分</view>
			</view>
			<view class="score-item">
				<view>{{ ranking }}</view>
				<view class="label">当前排名</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			progressOptions: {
				'border-radius': '14px',
				'stroke-width': '14px',
				backgroundColor: '#3d0273',
				activeColor: '#ffce24'
			},
			percent: '40',
			level: 4,
			score: 2000,
			ranking: 124
		};
	}
};
</script>

<style lang="scss" scoped>
$bg-label: #7f41c1;
.level {
	margin-top: -40rpx;
	padding: 0 80rpx;
	.progress-wrapper {
		margin-bottom: 40rpx;
		.progress {
			width: 240rpx;
		}
		.progress-label {
			margin-left: 24rpx;
			padding: 2rpx 10rpx;
			font-size: 24rpx;
			font-weight: 500;
			color: #fff;
			border-radius: 8rpx;
			background-color: $bg-label;
		}
	}
	.score {
		color: #fff;
		padding: 20rpx 30rpx;
		background-color: $bg-label;
		border-radius: 200rpx;
		.score-item {
			text-align: center;
			padding: 0 70rpx;
			font-size: 36rpx;
			font-weight: 500;
			z-index: 2;
			.label {
				margin-top: 12rpx;
				font-size: 28rpx;
				font-weight: 400;
			}
		}
		.score-item + .score-item {
			border-left: 1px solid;
			border-color: rgba(255, 255, 255, 0.25);
		}
	}
}
</style>
