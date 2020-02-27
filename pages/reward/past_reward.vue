<template>
	<view class="past" :style="{'height':height+'px'}">
		<view class="title flex justify-between align-center">
			<view class="back" @click="beforeIssue" >
				<text class="cuIcon-back"></text>
				上一期
			</view>
		
			<view class="text">
				{{date}}
			</view>
			<view class="next" @click="nextIssue" v-if="issue<0">
				下一期
				<text class="cuIcon-right"></text>
			</view>
			<view class="next text-gray" v-if="issue==0">
				下一期
				<text class="cuIcon-right"></text>
			</view>
		</view>
		<view v-if="!lotteryList" class="text-center flex align-center justify-center" :style="{'height':(height-23)+'px'}">
				未获取到该期开奖数据
		</view>
		<view class="list" :style="{'height':(height-23)+'px'}">
			<view class="item flex align-center justify-center padding-tb-xs" v-for="(item,index) in lotteryList" :key="index">
				<image class="margin-right-xs" :src="item.user.portrait" mode=""></image>
				<view class="name">
					{{item.user.nickname}}
				</view>
				
			</view>
			
		</view>
		
	</view>
</template>

<script>
import { getLotteryList} from "../../apis";
	export default {
		data() {
			return {
				issue:0,
				lotteryList:[],
				date:''
			}
		},
		props:{
			height:String
		},
		mounted(){
		this.getDataList()
		},
		methods: {
			getDate(issue){
					var day1 = new Date();
					var year=day1.getFullYear()
					var month=day1.getMonth()+1
					month=month<10?'0'+month:month
					var day=day1.getDate()-1+issue
					this.date=year+'-'+month+'-'+day
					return year+'-'+month+'-'+day
			},
			getDataList(){
					var date=this.getDate(this.issue)
					getLotteryList({date:date}).then((res)=>{
							console.log(res)
							if(res.data.length>0){
								this.lotteryList=res.data
							}else{
								this.lotteryList=null
							}
							
						})
			},
			beforeIssue(){
				this.issue--
				this.getDataList();
			},
			nextIssue(){
				this.issue++
				this.getDataList();
			}
		}
	}
</script>

<style scoped lang="scss">
	.past{
		height: 100%;
		// overflow-y:scroll;
		.title{
			width:636rpx;
			height:46rpx;
			background:rgba(205,175,255,1);
			.back,.next{
				font-size:24rpx;
				font-weight:400;
				color:rgba(246,241,239,1);
				line-height:34rpx;
				text{
					margin: 0 20rpx;
				}
			}
			.text-gray{
				color: gray;
				text{
					color: gray;
				}
			}
			.text{
				font-size:24rpx;
				font-weight:400;
				color:rgba(160,66,187,1);
			}
		}
		.list{
			height: 350rpx;
			overflow-y:scroll;
			.item{
				float: left;
				font-size:28rpx;
				font-weight:500;
				color:rgba(160,66,187,1);
				width: 50%;
				image{
					border-radius: 50%;
					width: 72rpx;
					height: 72rpx;
				}
				.name{
					width: 150rpx;
					height: 34rpx;
					overflow:hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
	}
</style>
