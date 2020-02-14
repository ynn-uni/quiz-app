<template>
	<view class="bg-linear">
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">竞猜答题</block>
		</cu-custom>
		<user-pannel :self="userSelf" />
		<subject :list="subjectList" />
	</view>
</template>

<script>
import UserPannel from '../../components/user-pannel.vue';
import Subject from '../../components/subject.vue';
export default {
	components: { UserPannel, Subject },
	data() {
		return {
			userSelf: {
				content: '第一题'
			},
			subjectList: this.subjectList
		};
	}
};
</script>

<style lang="scss"></style>
