<template>
	<view class="ready" :style="{ height: `calc(100vh - ${customBar})` }">
		<view class="title">准备就绪！</view>
		<view class="left-side left">
			<image class="name-bg left" src="../../static/images/ready-left-bg.png"></image>
			<image class="victory-bg left bottom" src="../../static/images/ready-left-tag.png"></image>
			<image class="avatar" :src="user.avatar"></image>
			<text class="nickname">{{ user.name }}</text>
			<text class="victory">{{ user.victory }}连胜</text>
		</view>
		<view class="right-side right">
			<image class="name-bg right" src="../../static/images/ready-right-bg.png"></image>
			<image class="victory-bg right bottom" src="../../static/images/ready-right-tag.png"></image>
			<image class="avatar" :src="opponent.avatar"></image>
			<view class="nickname">{{ opponent.name }}</view>
			<view class="victory">{{ opponent.victory }}连胜</view>
		</view>
		<view class="vs-image"><image src="../../static/images/vs.png"></image></view>
	</view>
</template>

<script>
export default {
	 props: {
    user: {
      type: Object,
      default: () => {}
    },
    opponent: {
      type: Object,
      default: () => {}
    }
  },
	data() {
		return {
			customBar: this.CustomBar
		};
	}
};
</script>

<style lang="scss" scoped>
.ready {
	position: relative;
	padding-top: 180rpx;
	.title {
		animation: enlarge 0.3s 0.2s linear forwards;
		text-align: center;
		font-size: 54rpx;
		font-weight: bold;
		text-indent: 1em;
		color: #fff;
		opacity: 0.1;
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
			text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
		}
	}
	.left-side {
		top: 160rpx;
		animation: fadeInUpLeft 1s 0s linear forwards;
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
		animation: fadeInBottomRight 1s 0s linear forwards;
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
		animation: enlarge 0.3s 1.1s linear forwards;
		top: 450rpx;
		left: 50%;
		margin-left: (-180rpx);
		text-align: center;
		image {
			width: 380rpx;
			height: 380rpx;
		}
		opacity: 0;
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

/*从左下到右上*/
@keyframes fadeInUpLeft {
	from {
		opacity: 0;
		transform: translate(-1000px, -800px);
	}
	to {
		opacity: 1;
		transform: translate(0, 0);
	}
}
/*从左下到右上*/
@keyframes fadeInBottomRight {
	from {
		opacity: 0;
		transform: translate(1000px, 800px);
	}
	to {
		opacity: 1;
		transform: translate(0, 0);
	}
}
/* 放大效果*/
@keyframes enlarge {
	from {
		opacity: 0;
		transform: scale(0.1, 0.1);
	}
	to {
		opacity: 1;
		transform: scale(1, 1);
	}
}
</style>
