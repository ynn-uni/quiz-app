<template>
	<view class="my_reward" :style="{'height':height+'px'}">
		<view class="item flex align-center padding-tb-sm" v-for="(item,index) in 10" :key="index">
			<view class="data">
				{{index+1}}、2020年2月10日
			</view>
			<image src="../../static/images/reword_kouzhao.png" mode=""></image>
			<view class="num">
				x1
			</view>
			<!-- <view class="btn">
				兑换完成
			</view> -->
			<button class="btn active" @tap="showModal" data-target="DialogModal1">点击兑换</button>
			
		</view>
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				
				<view class="padding-xl text-center my_text">
					您的兑换申请已提交，
					<br>
					2个工作日内工作人员会联系您。
				</view>
				<view class="cu-bar bg-white flex justify-center">
					
						<view class="my_btn" @tap="hideModal">
							确定
						</view>
						
		
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalName: null,
			}
		},
		props:{
			height:String
		},
		
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			}
		}
	}
</script>

<style scoped lang="scss">
	.my_reward{
		height: 100%;
		overflow-y:scroll;
		.item{
			width: 636rpx;
			image{
				width: 66rpx;
				height: 48rpx;
				margin-left: 36rpx;
				margin-right: 86rpx;
			}
			.data{
				width:236rpx;
				height:40rpx;
				font-size:26rpx;
				color:rgba(168,174,184,1);
				line-height:40rpx;
			}
			.num{
				font-size:24rpx;
				font-weight:600;
				color:rgba(95,1,151,1);
				margin-right: 64rpx;
			}
			.btn{
				text-align: center;
				width:104rpx;
				background:rgba(216,216,216,1);
				border-radius:14rpx;
				color:rgba(160,66,187,1);
				line-height:32rpx;
				font-size: 22rpx;
				padding: 4rpx;
			}
			
			.active{
				background:rgba(160,66,187,1);
				color: #fff;
			}
		}
		.cu-modal{
			.cu-dialog{
				.my_text{
					font-size: 24rpx;
					color:rgba(84,84,84,1);
					line-height: 44rpx;
				}
				.cu-bar{
					.my_btn{
						font-size:32rpx;
						font-weight:500;
						color:rgba(95,2,153,1);
						line-height:44rpx;
					}
				}
				
			}
			
		}
		
	}
</style>
