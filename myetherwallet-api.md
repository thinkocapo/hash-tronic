curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8", "latest"],"id":1}' https://api.myetherapi.com/eth

// bad
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"eth_getAccounts","params": [], "latest"]}' https://api.myetherapi.com/eth

// bad
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}' https://api.myetherapi.com/eth