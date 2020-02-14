<template>
	<view class="bg-linear">
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">竞猜答题</block>
		</cu-custom>
		<user-pannel :pk="true" :self="userSelf" :opponent="userOpponent" />
		<subject :list="subjectList" :auto-next="true"></subject>
	</view>
</template>

<script>
import UserPannel from '../../components/user-pannel.vue';
import Subject from '../../components/subject.vue'
export default {
	components: { UserPannel, Subject},
	data() {
		return {
			userSelf: {
				avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
				name: '陈波波',
				content: '0'
			},
			userOpponent: {
				avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
				name: '陈波波',
				content: '0'
			},
			subjectList: this.subjectList
		};
	}
};
</script>

<style lang="scss"></style>
