// Load api keys from .env file
const dotenv = require('dotenv');
dotenv.config();
// console.log(`${process.env.CLIENT_ID}`);

const url = 'wss://ws.astroprint.com/websocket'
const WebSocket = require('ws');
const connection = new WebSocket(url);

// Use requests library to get access_token
var request = require('request');
// var access_token = ''
function getAccessToken(fn) {
  request.post(
    'https://api.astroprint.com/v2/token',
    { json: {
      client_secret: `${process.env.CLIENT_SECRET}`,
      client_id: `${process.env.CLIENT_ID}`,
      grant_type: 'client_credentials'
    } },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
          console.log(body);
          fn(body.access_token);
      }
    }
  );
}

function sendToken(reqId, access_token) {
  var foo = {"type": "response","reqId": `${reqId}`,"payload": {"accessToken": `${access_token}`}};
  foo = JSON.stringify(foo);
  console.log(`Sending token ${foo}`);
  connection.send(`${foo}`);
}

// var foo = {"type": "response","reqId": "0","payload": {"accessToken": `${access_token}`}}

connection.onopen = function(){

}

connection.onerror = error => {
  console.log(`WebSocket error: ${error}`)
}

connection.onmessage = e => {
  console.log(e.data);
  console.log(JSON.parse(e.data).type);
  if (JSON.parse(e.data).type === "auth") {
    console.log("got auth request");
    getAccessToken(function(access_token){
      console.log(JSON.stringify(access_token));
      sendToken(JSON.parse(e.data).reqId, access_token);
    });
  }


}

// TODO: I made this up, is this correct?
connection.onclose = () => {
  console.log('disconnected');
}