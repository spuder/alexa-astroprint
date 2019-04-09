const WebSocket = require('ws');
var ws = new WebSocket('wss://ws.astroprint.com/websocket');
// var ws = new WebSocket('wss://echo.websocket.org');

ws.onopen = function(evt) { onOpen(evt) };
ws.onclose = function(evt) { onClose(evt) };
ws.onmessage = function(evt) { onMessage(evt) };
ws.onerror = function(evt) { onError(evt) };

function onOpen(evt)
{
  console.log("CONNECTED");
  // doSend("YAY");
}

function onClose(evt)
 {
   console.log("DISCONNECTED");
 }

function onMessage(evt)
{
  console.log(evt);
  if (JSON.parse(evt.data).type == 'auth') {
    console.log('got auth request');
    var foo = JSON.stringify({"type": "response","reqId": 0,"payload": {"accessToken": "xxxxx"}});
    doSend(foo);
  }
}

function onError(evt)
{
  console.log(evt.data);
}

function doSend(message)
{
  console.log("SENT: " + message)
  ws.send(message);
}