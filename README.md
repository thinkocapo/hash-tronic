### TOOLS
**ethereum**
https://ethereum.org/cli CLI and geth tips, commands to try 
https://github.com/ethereum
https://github.com/ethereum/wiki/wiki
**geth** - Go Implementation of an API to the thereum node. Runs the Ethereum node for you.
https://github.com/ethereum/go-ethereum/wiki
https://github.com/ethereum/go-ethereum/wiki/geth
**web3** - Javascript client lib for connecting to your ethereum node. Makes use of solc  https://github.com/ethereum/web3.js/
**solc** - module that compiles contracts for you. (solidity compiler) for compiling smart contracts. We won't be using it in this project but its good to know this. The EOS Smartcontract was already compiled by the EOS developers and deployed.

### GETTING STARTED
1. Start an ethereum node connected to the mainnet. run it in fast mode.
#### If accessing the RPC from a browser
CORS will need to be enabled with the appropriate domain set. Otherwise, JavaScript calls are limit by the same-origin policy and requests will fail:
`geth --rpc --rpccorsdomain "http://localhost:3000"` that's **--rpccorsdomain**

#### But Avoid The Deprecated Code that's all over Stackoverflow
**DEPRECATED** `geth --fast --cache=1024 --rpcapi eth,web3 --rpc`
**DEPRECATED** geth --fast --cache=1024 --rpcaddr "http://localhost" --rpcport 8545 ?
the **--fast** flag is deprecated.
geth --fast --cache=1024
get --fast --cache=1024 --rpcapi eth,web3 --rpc

#### Avoid unecessary commands that aren't necessary at this time
`--rpcapi` API's offered over the HTTP-RPC interface (default: "eth,net,web3")
Can change the default port (8545) and listing address (localhost) with:
`geth --rpc --rpcaddr <ip> --rpcport <portnumber>`

*some command arguments*
`--rpcport` default port is 8545 which we're fine with, so omitt this flag
`--rpcaddr` default is localhost which we're fine with, so omitt this

**Popular commands that won't help us and why**
`geth --syncmode "fast" --cache 2048` is missing the flag for RPC connections (so can't connect from web3 or a web app)
`geth --syncmode "fast" --cache 2048 --rpcapi --rpc` not needed
`geth --syncmode "fast" --cache 2048 --rpc` works

If syncronisation is working properly it should settle on log activity like:
`INFO [02-13|23:32:14] Imported new state entries               count=0    elapsed=8.955ms   processed=323550 pending=15495 retry=0    duplicate=3244 unexpected=9294` where x is the Block Height (latest block)

starts running on port localhost:XXXX which you'll need for step 2

2. Run the node script using npm start
Web3 config makes JRC-20 protocool requests to the node your started on `localhost:8545`. This address:port is specified in the index.js file during web3 instance configuration.

