#!/usr/bin/env python3

import asyncio
import websockets
import json

async def hello():
    async with websockets.connect(
            'wss://ws.astroprint.com/websocket') as websocket:
        name = 'hello spencer'
        message = json.dumps({
          "type": "response",
          "reqId": "1234",
          "payload": {
            "accessToken": "xxx"
          }
        })

        greeting = await websocket.recv()
        print(f"< {greeting}")

        # print(f" {message}")
        await websocket.send(message)
        print(f"> {message}")

        # greeting2 = await websocket.recv()
        # print(f"< {greeting2}")

asyncio.get_event_loop().run_until_complete(hello())