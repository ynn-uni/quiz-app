<template>
	<view class="bg-linear ">
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">排行榜</block>
		</cu-custom>
		<view class="rank flex flex-direction align-center">
			<image class="ran_img" src="../../static/images/rank.png" mode=""></image>
			<view class="rank_list  bg-white flex flex-direction align-center" >
				<!-- <view class="rank_tab flex align-center justify-center padding-tb bg-white">
					<view class="tab" :class="changerank==0?'active':'' " @click="changeRank(0)">
						今日排行
					</view>
					<view class="line"></view>
					<view class="tab" :class="changerank==1?'active':''" @click="changeRank(1)">
						好友排行
					</view>
				</view> -->
				<view v-if="ranking.length<=0" class="rank_itemlist text-center flex align-center justify-center" :style="{'height':height+'px'}">
					暂无相关数据
				</view>
				<view v-if="ranking.length>0" class="rank_itemlist" :style="{'height':height+'px'}">
					<view class="rank_item padding-sm flex align-center justify-between" v-for="(item,index) in ranking" :key="index">
						<view class="left flex align-center">
							<view class="num ">
								{{index+1}}
							</view>
							<image class="rank_headimg margin-lr-sm" :src="item.user.portrait" mode=""></image>
							<view class="info flex flex-direction align-center">
								<view class="name">
									{{item.user.nickname}}
								</view>
								<view class="my_class text-center">
									lv{{item.user.level}}
								</view>
							</view>
						</view>
						<view class="right flex align-center">
							<image src="../../static/images/gem.png" mode=""></image>
							{{item.sum}}
						</view>
						
					</view>
				</view>
				
			</view>
		</view>
		<!-- <view class="own text-center">
			当前我的排名343437
		</view> -->
	</view>
</template>

<script>
import { getScoreRankingList } from '../../apis';
	export default {
		data() {
			return {
				changerank:0,
				height:'0',
				ranking:[]
			}
		},
		onLoad() {
			//适应排行榜列表显示高度
			 var that=this
			 let info = uni.createSelectorQuery();
			 var height=0;
			 var top=0;
			 info.select(".rank").boundingClientRect(function(data) { //data - 各种参数
			 　
				height=data.height
				top=data.top
			 }).exec()
			 info.select(".rank_itemlist").boundingClientRect(function(data) { //data - 各种参数
			 　
			  that.height=height-(data.top-top)
			 
			 }).exec()

			 getScoreRankingList().then((res)=>{
				 console.log(res)
				 this.ranking=res.data;
			 })     
		},
		methods: {
			changeRank(status){
				this.changerank=status
				console.log(this.changerank)
			}
		}
	}
</script>

<style scoped lang="scss">
	.rank{
		width: 750rpx;
		position: fixed;
		top: 120rpx;
		bottom: 80rpx;
		.ran_img{
			width: 386rpx;
			height: 386rpx;
		}
		.rank_list{
			width:690rpx;
			background:rgba(255,255,255,1);
			border-radius:8rpx;
			z-index: 2;
			margin-top: -110rpx;	
			.rank_tab{
				width:640rpx;
				background:rgba(255,255,255,1);
				box-shadow:0px 16rpx 22rpx 0px rgba(170,170,170,0.26);
				border-radius:12rpx;
				margin-top: -60rpx;	
				.tab{
					font-size:28rpx;
					font-weight:400;
					color:rgba(155,155,155,1);
					line-height:40px;
				}
				.active{
					color:rgba(44,28,67,1);
				}
				.line{
					width:2rpx;
					height:68rpx;
					background:rgba(216,216,216,1);
					margin: 0 74rpx;
				}
			}
			.rank_itemlist{
				// height: 750rpx;
				overflow-y: scroll;
				.rank_item{
					width: 640rpx;
					// padding-left: 36rpx;
					border-bottom:2rpx solid rgba(245,245,245,1);
					.left{
						.num{
							width: 60rpx;
							text-align: center;
							font-weight: 500;
							font-size:32rpx;
							color:rgba(155,155,155,1);
						}
						.rank_headimg{
							width: 80rpx;
							height: 80rpx;
							border-radius: 50%;
						}
						.info{
							width: 200rpx;
							.name{
								font-size:24rpx;
								font-weight:500;
								color:rgba(95,2,152,1);
							}
							.my_class{
								margin-top: 8rpx;
								width:46rpx;
								height:28rpx;
								background:rgba(255,206,36,1);
								border-radius:6rpx;
								font-size: 20rpx;
								color: #fff;
								line-height: 28rpx;
							}
						}
					}
					.right{
						image{
							width: 30rpx;
							height: 36rpx;
							margin-right: 10rpx;
						}
					}
				}
						
			}
			
		
		
		}
		
	}
	.own{
		font-size:28rpx;
		color:#fff;
		line-height:80rpx;
		position: fixed;
		bottom: 0rpx;
		width: 750rpx;
		text-align: center;
	}
</style>
