<template>
	<view class="bg-linear">
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">个人资料</block>
		</cu-custom>
		<view class="my">
			<userinfo></userinfo>
			<myaddress></myaddress>
		</view>
	</view>
</template>

<script>
	import userinfo from './components/userinfo.vue'
	import myaddress from './components/address.vue'
	export default {
		data() {
			return {
				
			}
		},
		components:{
			userinfo,
			myaddress
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
