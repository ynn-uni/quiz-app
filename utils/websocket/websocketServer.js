const WebSocket = require('ws');

const wss = new WebSocket.Server({
	port: 8888
});
wss.on('connection', function connection(ws) {
	ws.on('message', function incoming(message) {
		console.log('received: %s', message);
		listenMessage(ws, message)
	});

	ws.send('connection websocket server');
});

function listenMessage(ws, message) {
	if (message === 'ping') {
		ws.send('pong')
	}
	if (message === 'matching') {
		const opponentInfo = getOpponentInfo()
		sleep(2000).then(() => {
			ws.send(`opponent#${opponentInfo}`)
		})
	}
	if (/score/.test(message)) {
		receiveScore(ws, message)
	}
}

function getOpponentInfo() {
	const avatar = "https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg"
	const name = "陈波波"
	const victory = 1
	const score = 1100
	const level = 5
	return JSON.stringify({
		name,
		victory,
		score,
		level
	})
}

function receiveScore(ws, message) {
	const socre = Math.floor((Math.random() + 1) * 100)
	ws.send(`score#${socre}`)
}

function sleep(time, val) {
	return new Promise(function(r) {
		return setTimeout((function() {
			return r(val);
		}), time);
	});
}
