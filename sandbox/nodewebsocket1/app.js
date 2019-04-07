const url = 'wss://echo.websocket.org'
const WebSocket = require('ws');
const connection = new WebSocket(url);

connection.onopen = () => {
  connection.send('hey')
}

connection.onerror = error => {
  console.log(`WebSocket error: ${error}`)
}

connection.onmessage = e => {
  console.log(e.data)
}