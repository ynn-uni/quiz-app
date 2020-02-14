<template>
	<view class="index-page bg-linear">
		<cu-custom><block slot="content">竞猜答题</block></cu-custom>
		<index-header></index-header>
		<user-level></user-level>
		<view class="index-bottom flex flex-direction justify-around flex-sub">
			<view class="index-brand">
				<image src="../../static/images/brand.png"></image>
			</view>
			
			<view class="index-action flex justify-around">
				<view class="margin-top">
					<navigator url="/pages/exercise/exercise">
						<image src="../../static/images/exercise.png"></image>
					</navigator>
				</view>
				<view>
					<navigator url="/pages/challenge/challenge">
						<image src="../../static/images/challenge.png"></image>
					</navigator>
				</view>
			</view>
			<view class="index-go" hover-class="btn-hover-class">
				<image class="btn-image" src="../../static/images/start.png"></image>
			</view>
		</view>
		
		<image class="index-bg" src="../../static/images/index-bg.png"></image>
	</view>
</template>

<script>
import IndexHeader from './header.vue';
import UserLevel from './level.vue'
export default {
	components: { IndexHeader, UserLevel },
	data() {
		return {
			
		};
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
	.index-page {
		position: relative;
		z-index: -2;
		.index-bottom {
			position: absolute;
			top: 600rpx;
			bottom: 0;
			left: 0;
			right: 0;
		}
		.index-brand {
			margin-top: 20rpx;
			text-align: center;
			image {
				width: 400rpx;
				height: 160rpx;
			}
		}
		.index-bg {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 850rpx;
			z-index: -1;
		}
		.index-action {
			padding: 0 80rpx;
			image {
				width: 280rpx;
				height: 320rpx;
			}
		}
		.index-go {
			padding-bottom: 20rpx;
			text-align: center;
			image {
				width: 320rpx;
				height: 120rpx;
			}
		}
	}
</style>
<style>
	.btn-hover-class {
		transform: translate(1rpx, 1rpx);
	}
</style>
