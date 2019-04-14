require 'faye/websocket'
require 'eventmachine'
require 'json'
EM.run {
  # ws = Faye::WebSocket::Client.new('wss://echo.websocket.org')
  ws = Faye::WebSocket::Client.new('wss://ws.astroprint.com/websocket')

foo = '{
  "type": "response",
  "reqId": "0",
  "payload": {
    "accessToken": "REDACTED"
  }
}'

bar = '{
  "type": "boxes",
  "payload": null,
  "reqId": "1"
}'

# buzz = JSON.generate(JSON.parse("#{foo}"))
# puts buzz.class

puts foo

  ws.ping "hey there" do
    puts 'pong'
  end

  ws.on :open do |event|
    p [:open]
    # ws.send('Hello, world!')
    # ws.send('yo')
    ws.send("#{foo}")
  end

  ws.on :message do |event|
    p [:message, event.data]
  end

  ws.on :close do |event|
    p [:close, event.code, event.reason]
    ws = nil
  end
}