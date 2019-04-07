# export client_id='xxx' # the id in my prusa dev account
if [[ -z "${client_id}" ]]; then
  echo "no client_id, did you run source env.sh first?"
  exit 1
fi

if [[ -z "${client_secret}" ]]; then
  echo "no client_secret, did you run source env.sh first?"
  exit 1
fi

if ! type websocat; then
  echo "install wscat 'brew install websocat'"
  exit 1
fi

access_token=$(curl -s -X POST \
  https://api.astroprint.com/v2/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d "client_secret=${client_secret}&client_id=${client_id}&grant_type=client_credentials" | jq .access_token)

websocat wss://ws.astroprint.com/websocket

{"type": "response","reqId": "0","payload": {"accessToken": "${access_token}"}}
