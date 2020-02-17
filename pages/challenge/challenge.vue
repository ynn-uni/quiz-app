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
			isArrange: false,
			isReady: true,
			isQuiz: false,
			opponent: null
		};
	},
	mounted() {
		this.getOpponent().then(() => {
			this.displayReady()
		})
	},
	watch: {
		isReady(val) {
			if (val === false) {
				this.isQuiz = true
			}
		},
	},
	methods: {
		getOpponent() {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					this.opponent = {
						name: 'test',
						avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
						level: 4
					}
					this.isArrange = false
					resolve()
				}, 2000)
			})
		},
		displayReady() {
			this.isReady = true
			setTimeout(() => {
				this.isReady = false
			}, 3000)
		},
	}
};
</script>

<style lang="scss"></style>
