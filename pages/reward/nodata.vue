<template>
	<view class="nodata flex flex-direction align-center justify-center" :style="{'height':height+'px'}">
		<image src="../../static/images/reword_jiayou.png" mode=""></image>
		<view class="text margin-top-lg">
			您暂未获得任何奖品，加油鸭！
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
	image{
		width:200rpx;
		height:270rpx;
	}
	.text{
		font-size:24rpx;
		font-weight:300;
		color:rgba(50,72,92,1);
		line-height:34rpx;
	}
</style>
