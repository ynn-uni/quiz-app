<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		

					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
			Vue.prototype.subjectList = [
				{
					title: '水是液体？',
					options: [
						{ id: 'A', content: '对' },
						{ id: 'B', content: '错' },
					],
					answer: 'A',
					explain: '难到是固体不成？'
				}, {
					title: '如何预防肺炎？',
					options: [
						{ id: 'A', content: '勤洗手' },
						{ id: 'B', content: '百毒不侵' },
						{ id: 'C', content: '夜观天象' },
						{ id: 'D', content: '绝不怕死'}
					],
					answer: 'A',
					explain: '勤洗手有助于清除病毒'
				}, {
					"title":"电流分有？",
					"options":[
						{"id":"A","content":"直流"},
						{"id":"B","content":"交流"},
						{"id":"C","content":"直流和交流"},
					],
					"answer":"C",
					"explain":"科技学依据"
				}
			]
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}

	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "colorui/animation.css";
	@import "style/common.css";

	@keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}

	@-webkit-keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}
</style>
