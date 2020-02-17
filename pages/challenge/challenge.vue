<template>
	<view class="bg-linear">
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">擂台挑战</block>
		</cu-custom>
		<arrange v-if="isArrange"></arrange>
		<ready v-if="isReady"></ready>
		<quiz v-if="isQuiz"></quiz>
	</view>
</template>

<script>
import Arrange from './arrange'
import Ready from './ready'
import Quiz from './quiz.vue'
export default {
	components: { Arrange, Ready, Quiz },
	data() {
		return {
			isArrange: true,
			isReady: false,
			isQuiz: false,
			opponent: null
		};
	},
	mounted() {
		setTimeout(() => {
			this.getOpponent()
		}, 2000)
	},
	watch: {
		isArrange(val) {
			if (val === true) {
				this.displayReady()
			}
		},
		
	},
	methods: {
		getOpponent() {
			this.opponent = {
				name: 'test',
				avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
				level: 4
			}
			this.isArrange = false
		},
		displayReady() {
			this.isReady = true
			set
		}
	}
};
</script>

<style lang="scss"></style>
