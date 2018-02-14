## Overview
Hashtronic is a trading arbitrage bot that makes use of Smart Contracts from the E0S Crowdsale and crypt0currency exchanges for trading. It requires you run an Ethereum Node using *geth*. Geth provides a JRC-20 API interface to the ethereum node so you can connect to it via a Node.js script that uses web3.js to connect to it. By connecting to the ethereum node, we can interact with the E0S Smart Contract. Many notes are provided regarding the tools involved and how to properly setup and use them.
The program does the following things, which are outlined with comments in `./index.js`:
1. Send ether from default *geth* wallet to E0S Crowdsale Contract
2. Claim your E0S tokens to your *geth* account wallet the following morning.
3. Send your E0S tokens to a cryptoi trading exchange
4. Performs a trade of E0S/ETH using the exchange's dev API.
5. Sends ETH back to default *geth* wallet. The quantity of this ETH is greater than what you started with in Step 1.
6. Repeat from Step 1.

### Tools
**ethereum**  
https://github.com/ethereum
https://ethereum.org/cli for geth CLI basics
https://github.com/ethereum/wiki/wiki  
**geth** - Go Implementation of an API to the thereum node. Runs the Ethereum node for you.  
Version as of 02/14/18 1.8
https://github.com/ethereum/go-ethereum/wiki
https://github.com/ethereum/go-ethereum/wiki/geth  
**web3** - Javascript client lib for connecting to your ethereum node. Makes use of solc    https://github.com/ethereum/web3.js/  
**node npm** - for running a node script that uses *web3* to connect to *geth*, and for talking to the crypto exchanges too.   
**solc** - module that compiles contracts for you. Solidity compiler for compiling smart contracts. We won't be using it in this project but its good to know this. The EOS Smartcontract was already compiled by the EOS developers and deployed.

## GETTING STARTED
1. Start an ethereum node connected to the mainnet. run it in fast mode.
#### If accessing the RPC from a browser
CORS will need to be enabled with the appropriate domain set. Otherwise, JavaScript calls are limit by the same-origin policy and requests will fail:
`geth --rpc --rpccorsdomain "http://localhost:3000"` that's **--rpccorsdomain**

#### But Avoid The Deprecated Code that's all over Stackoverflow
**DEPRECATED** `geth --fast --cache=1024 --rpcapi eth,web3 --rpc`
**DEPRECATED** `geth --fast --cache=1024 --rpcaddr "http://localhost" --rpcport 8545`  
because the **--fast** flag is deprecated since previous versions like geth 1.4.
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

