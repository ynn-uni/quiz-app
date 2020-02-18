// https://github.com/joewalnes/websocketd
// 使用websocketd模拟ws服务器
// 启动 websocketd --port=8888 --devconsole node script.js

// // Start listening
// process.stdin.resume()
// process.stdin.setEncoding('utf8')

// // Receive data from WebSocket - STDIN
// process.stdin.on('data', function(data) {

// 	// Send data to WebSocket client - STDOUT
// 	// process.stdout.write( JSON.stringify({ text: data.trim() }) +'\n' )
// 	if (data == 'ping') {

// 		process.stdout.write('pong')
// 	} else {
// 		process.stdout.write(JSON.stringify({
// 			text: data.trim()
// 		}) + '\n')
// 	}
// })

process.stdin.setEncoding('utf8');

process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write('data: ' + JSON.stringify(chunk));
  }
});
