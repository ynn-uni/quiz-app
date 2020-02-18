// 参考：https://github.com/zimv/websocket-heartbeat-js/blob/master/lib/index.js
class WebSocketUtils {
	constructor({
		url,
		pingTimeout = 15000,
		pongTimeout = 10000,
		reconnectTimeout = 500,
		pingMsg = 'ping',
		repeatLimit = 10
	}) {
		this._options = {
			url,
			pingTimeout,
			pongTimeout,
			reconnectTimeout,
			pingMsg,
			repeatLimit
		}
		this.socketTask = null
		this.pingTimeoutId = null
		this.pongTimeoutId = null
		this.repeatTimes = 0
		this.forbidReconnect = false
		this.connect(url)

		this.onopen = evt => {
			console.warn('websocket open')
		}
		this.onmessage = evt => {
			console.warn(`websocket received message: ${evt.data}`)
		}
		this.onerror = evt => {
			console.warn('websocket error')
		}
		this.onclose = evt => {
			console.warn('websocket close')
		}
		this.onreconnect = evt => {
			console.warn('websocket reconnect')
		}
	}

	static getSocketTask() {
		if (!this.socketTask) {
			this.socketTask = new WebSocketUtils()
		}

		return this.socketTask
	}

	connect() {
		const {
			url
		} = this._options
		try {
			this.socketTask = uni.connectSocket({
				url,
				complete: () => {
					// console.warn('websocket open')
				}
			})
			this.initEventHandle()
		} catch (e) {
			this.reconnect()
			throw e
		}
	}

	initEventHandle() {
		this.socketTask.onOpen(evt => {
			this.repeatTimes = 0
			this.onopen(evt)
			this.heartCheck()
		})

		this.socketTask.onMessage(evt => {
			this.onmessage(evt)
			this.heartCheck()
		})

		this.socketTask.onError(evt => {
			this.onerror(evt)
			this.reconnect()
		})

		this.socketTask.onClose(evt => {
			this.onclose(evt)
			this.reconnect()
		})
	}

	send(object) {
		this.socketTask.send(object)
	}

	heartCheck() {
		this.heartReset()
		this.heartStart()
	}

	heartStart() {
		const {
			pingTimeout,
			pongTimeout,
			pingMsg
		} = this._options
		if (this.forbidReconnect) return
		this.pingTimeoutId = setTimeout(() => {
			this.socketTask.send({
				data: pingMsg
			})
			console.log('send -> ', pingMsg)

			// 如果超过一定时间还没重置，说明后端主动断开了
			this.pongTimeoutId = setTimeout(() => {
				this.socketTask.close()
			}, pongTimeout)
		}, pingTimeout)
	}

	heartReset() {
		clearTimeout(this.pingTimeoutId)
		clearTimeout(this.pongTimeoutId)
	}

	reconnect() {
		const {
			repeatLimit,
			reconnectTimeout
		} = this._options
		if (repeatLimit > 0 && repeatLimit < this.repeatTimes) return
		if (this.lockReconnect || this.forbidReconnect) return

		this.lockReconnect = true
		this.repeatTimes++
		this.onreconnect()
		setTimeout(() => {
			this.connect()
			this.lockReconnect = false
		}, reconnectTimeout)
	}

	close(object) {
		this.forbidReconnect = true
		this.heartReset()
		this.socketTask.close(object)
	}
}

export default WebSocketUtils
