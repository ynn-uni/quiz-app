<template>
	<view class="index-page bg-linear">
		<image class="index-bg" src="../../static/images/index-bg.png"></image>
		<view class="index-content">
			<cu-custom><block slot="content">竞猜答题</block></cu-custom>
			<index-header></index-header>
			<user-level></user-level>
			<view class="index-bottom flex flex-direction justify-around flex-sub">
				<view class="index-brand"><image src="../../static/images/brand.png"></image></view>
				<view class="index-mode flex justify-between">
					<view class="index-mode-item margin-top" @click="handleClick('exercise')">
						<image src="../../static/images/exercise.png"></image>
						<image v-if="selectedMode === 'exercise'" class="index-mode-mask" src="../../static/images/mode-mask.png"></image>
					</view>
					<view class="index-mode-item">
						<image src="../../static/images/challenge.png" @click="handleClick('challenge')"></image>
						<image v-if="selectedMode === 'challenge'" class="index-mode-mask" src="../../static/images/mode-mask.png"></image>
					</view>
				</view>
				<view class="index-go" hover-class="btn-hover-trans">
					<image class="btn-image" src="../../static/images/start.png" @click="turnToPage"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import IndexHeader from './header.vue';
import UserLevel from './level.vue';
export default {
	components: { IndexHeader, UserLevel },
	data() {
		return {
			selectedMode: null,
			challengeUrl: '/pages/challenge/challenge',
			exerciseUrl: '/pages/exercise/exercise'
		};
	},
	methods: {
		handleClick(evt) {
			this.selectedMode = evt;
			// setTimeout(() => {
			// 	this.turnToPage()
			// }, 0)
		},
		turnToPage() {
			const urlKey = this.selectedMode + 'Url'
			uni.navigateTo({
    		url: this[urlKey]
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.index-page {
	position: relative;
	.index-bg {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 850rpx;
	}
	@at-root.index-content {
		z-index: 2;
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

		.index-mode {
			padding: 0 80rpx;
			.index-mode-item {
				position: relative;
				width: 275rpx;
				height: 320rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.index-mode-mask {
				position: absolute;
				top: 0;
				left: 0;
				z-index: 10;
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
}
</style>
