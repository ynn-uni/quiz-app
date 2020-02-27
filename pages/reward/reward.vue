<template>
	<view class="bg-linear rew">
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">奖励</block>
		</cu-custom>
		<view class="reward flex flex-direction align-center">
			<view class="reward_img flex flex-direction align-center">
				<image src="../../static/images/reword_kouzhao.png" mode=""></image>
				<view class="text margin-tb-xs">
					口罩一只
				</view>
			</view>
			<view class="title flex justify-center">
				<image src="../../static/images/reword_tab.png" mode=""></image>
				<view class="text">
					本期奖品
				</view>
			</view>
			<view class="content flex flex-direction align-center margin-top-lg">
				
				<view class="notice padding">
					<view class="no_title text-center">
						奖品规则
					</view>
					1、每24小时在排名前200名中随机抽取20名获奖者，免费赠送十只口罩。
					<br>
					2、获奖的用户请在首页点击头像进入“个人资料”编辑收货信息，方便工作人员及时与您联系。
					<br>
					3、本活动最终归释权属活动方所有。
				</view>
				<view class="reward_content" >
					<view class="reward_tab flex justify-center align-center margin-tb-sm">
						<view class="tab  margin-right-lg" :class="status=='1'||status=='01'?'active':''" @click="changeStatus('1')">
							我的获奖记录
						</view>
						<view class="tab" :class="status=='2'||status=='02'?'active':''" @click="changeStatus('2')">
							往期获奖记录
						</view>
					</view>
					<view class="data" >
						<NoData v-if="status=='01'||status=='02'" :height="height"></NoData>
						<MyReward v-if="status=='1'" :height="height" v-on:ListenChild="ShowChild"></MyReward>
						<PastReward v-if="status=='2'" :height="height" v-on:ListenChild="ShowChild"></PastReward>
					</view>
				</view>
			
			</view>
		</view>
	</view>
</template>

<script>
	import NoData from './nodata.vue'
	import MyReward from './my_reward.vue'
	import PastReward from './past_reward.vue'

	export default {
		data() {
			return {
				// nodata:true,
				status:'1',//0没有数据 1查看我的获奖记录 2 查看往期记录
				height:'0'
			}
		},
		components:{
			NoData,
			MyReward,
			PastReward
		},
		onShow() {
			var that=this
			 let info = uni.createSelectorQuery();
			 var height=0;
			 var top=0;
			 info.select(".rew").boundingClientRect(function(data) { //data - 各种参数
			 // 　console.log(data.height,data.top) 
				height=data.height
				top=data.top
			 }).exec()
			 info.select(".data").boundingClientRect(function(data) { //data - 各种参数
			 // 　console.log(height-(data.top-top),data.top) 
			  that.height=height-(data.top-top)
			  // console.log(that.height) 
			 }).exec()
			
				
		},
		methods: {
			changeStatus(stauts){
				this.status=stauts
			},
			 ShowChild: function(data) {
				this.status=data
			},
		}
	}
</script>

<style scoped lang="scss">
.rew{
	position: fixed;
	top: 0rpx;
	bottom: 40rpx;
}
.reward{
	width: 750rpx;
	
	.reward_img{
		image{
			width: 244rpx;
			height: 188rpx;
		}
		.text{
			font-size: 24rpx;
			line-height:34rpx;
			color: #fff;
			
		}
	}
	.title{
		position: relative;
		image{
			width:408rpx;
			height: 70rpx;
		}
		.text{
			margin-top: 4rpx;
			position: absolute;
			font-size:36rpx;
			color: #fff;
		}
	}
	.content{
		width:680rpx;
		background:rgba(255,255,255,1);
		border-radius:16rpx;
		padding: 20rpx 40rpx;
		
		
		.notice{
			width:636rpx;
			background:rgba(215,200,243,1);
			border-radius:12rpx;
			font-size:24rpx;
			font-weight:500;
			color:rgba(255,255,255,1);
			line-height:40rpx;
			text-align: justify;
			.no_title{
				font-size: 28rpx;
			}
		}
		.reward_content{
			.reward_tab{
				.tab{
					font-size:28rpx;
					font-weight:500;
					color:rgba(220,215,222,1);
					line-height:40rpx;
				}
				.active{
					border-bottom: 2rpx solid rgba(160,66,187,1);
					color:rgba(160,66,187,1);
				}
			}
		}
	}
}
</style>
