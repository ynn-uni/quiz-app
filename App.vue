<script>
import Vue from 'vue';
export default {
	globalData: {
		name: '空城',
		avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
		level: 4,
		victory: 2,
		score: 0
	},
	onLaunch: function() {
		uni.getSystemInfo({
			success: function(e) {
				// #ifndef MP
				Vue.prototype.StatusBar = e.statusBarHeight;
				if (e.platform == 'android') {
					Vue.prototype.CustomBar = e.statusBarHeight + 50;
				} else {
					Vue.prototype.CustomBar = e.statusBarHeight + 45;
				}
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
		});
		Vue.prototype.subjectList = [
			{
				title: '水是液体？',
				options: [{ id: 'A', content: '对' }, { id: 'B', content: '错' }],
				answer: 'A',
				explain: '难到是固体不成？'
			},
			{
				title: '如何预防肺炎？',
				options: [{ id: 'A', content: '勤洗手' }, { id: 'B', content: '百毒不侵' }, { id: 'C', content: '夜观天象' }, { id: 'D', content: '绝不怕死' }],
				answer: 'A',
				explain: '勤洗手有助于清除病毒'
			},
			{
				title: '电流分有？',
				options: [{ id: 'A', content: '直流' }, { id: 'B', content: '交流' }, { id: 'C', content: '直流和交流' }],
				answer: 'C',
				explain: '科技学依据'
			},
			{
				title: '宫崎骏的作品《千与千寻》中，影片最后，在千寻的帮助下，白龙找回了',
				options: [{ id: 'A', content: '琥珀川' }, { id: 'B', content: '荻野千寻' }, { id: 'C', content: '小白' }, { id: 'D', content: '赈早贤' }],
				answer: 'A',
				explain: ''
			},
			{
				title: '电影《一个陌生女人的来信》的导演是下列哪位？',
				options: [{ id: 'A', content: '吴基恒' }, { id: 'B', content: '陈可辛' }, { id: 'C', content: '徐静蕾' }, { id: 'D', content: '韦家辉' }],
				answer: 'C',
				explain: ''
			},
			{
				title: '在香港僵尸系列电影中，借着一部讲述民国时期茅山道士捉僵尸题材的影',
				options: [{ id: 'A', content: '林正英' }, { id: 'B', content: '洪金宝' }, { id: 'C', content: '钱小豪' }, { id: 'D', content: '郑则仕' }],
				answer: 'A',
				explain: ''
			},
			{
				title: '《分手合约》的女主角是下列哪位明星饰演的？',
				options: [{ id: 'A', content: '吴佩慈' }, { id: 'B', content: '白百何' }, { id: 'C', content: '伊能静' }, { id: 'D', content: '安以轩' }],
				answer: 'B',
				explain: ''
			},
			{
				title: '1933年摄制完成的《姊妹花》的女主角在这一年获得了“电影皇后”',
				options: [{ id: 'A', content: '阮玲玉' }, { id: 'B', content: '王汉伦' }, { id: 'C', content: '胡蝶' }, { id: 'D', content: '杨紫琼' }],
				answer: 'C',
				explain: ''
			},
			{
				title: '系列电影《加勒比海盗》是哪间电影公司的作品？',
				options: [{ id: 'A', content: '梦工厂' }, { id: 'B', content: '华纳' }, { id: 'C', content: '迪士尼' }, { id: 'D', content: '好莱坞' }],
				answer: 'C',
				explain: ''
			},
			{
				title: '下列不属于影帝梁朝伟的电影作品是？',
				options: [{ id: 'A', content: '《花样年华》' }, { id: 'B', content: '《重庆森林》' }, { id: 'C', content: '《悲情城市》' }, { id: 'D', content: '《旺角卡门》' }],
				answer: 'B',
				explain: ''
			},
			{
				title: '电影《李米的猜想》的女主角李米的扮演者是谁？',
				options: [{ id: 'A', content: '范冰冰' }, { id: 'B', content: '李冰冰' }, { id: 'C', content: '赵薇' }, { id: 'D', content: '周迅' }],
				answer: 'D',
				explain: ''
			}
		];
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
@import 'colorui/main.css';
@import 'colorui/icon.css';
@import 'colorui/animation.css';
@import 'style/common.css';

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
