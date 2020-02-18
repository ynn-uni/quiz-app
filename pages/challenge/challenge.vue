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
import Arrange from './arrange';
import Ready from './ready';
import Quiz from './quiz.vue';
import WebsocketUtils from '@/utils/websocket';
export default {
	components: { Arrange, Ready, Quiz },
	data() {
		return {
			ws: null,
			isArrange: true,
			isReady: false,
			isQuiz: false,
			opponent: null
		};
	},
	watch: {
		isReady(val) {
			if (val === false) {
				this.isQuiz = true;
			}
		}
	},
	onShow: function(options) {
		this.initWebsocket();
		this.ws.onMessage = evt => {
			console.log(evt.data);
		};
	},
	onHide: function() {
		this.ws.close()
	},
	mounted() {
		this.getOpponent().then(() => {
			this.displayReady();
		});
	},
	methods: {
		initWebsocket() {
			this.ws = new WebsocketUtils({
				url: 'ws://mahy-mac.local:8888/'
			});
			this.ws.onopen = () => {
				this.ws.send({ data: `send a message` });
			};
		},
		getOpponent() {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					this.opponent = {
						name: 'test',
						avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
						level: 4
					};
					resolve();
				}, 2000);
			});
		},
		displayReady() {
			this.isArrange = false;
			this.isReady = true;
			setTimeout(() => {
				this.isReady = false;
			}, 2000);
		}
	}
};
</script>

<style lang="scss"></style>
