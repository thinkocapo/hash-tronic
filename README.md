## Overview
Hashtronic is a trading arbitrage bot that makes use of Smart Contracts from the E0S Crowdsale and crypt0currency exchanges for trading. It requires you run an Ethereum Node using *geth*. Geth provides a JRC-20 API interface to the ethereum node so you can connect to it via a Node.js script that uses web3.js to connect to it. By connecting to the ethereum node, we can interact with the E0S Smart Contract. Many notes are provided regarding the tools involved and how to properly setup and use them.
The program does the following things, which are outlined with comments in `./index.js`:
1. Send ether from default *geth* wallet to E0S Crowdsale Contract
2. Claim your E0S tokens to your *geth* account wallet the following morning.
3. Send your E0S tokens to a cry!pto trading exchange
4. Performs a trade of E0S/ETH using the exchange's dev API.
5. Sends ETH back to default *geth* wallet. The quantity of this ETH is greater than what you started with in Step 1.
6. Repeat from Step 1.

### Tools
**ethereum**  
https://github.com/ethereum
https://ethereum.org/cli for geth CLI basics
https://github.com/ethereum/wiki/wiki  
Ethereum is in ~/Library/Ethereum (Mac OS) and the blockchain is in ~/Library/Ethereum/geth/chaindata    
Private Keys are in ~/Library/Ethereum/keystore (Linux/Windows)[https://github.com/ethereum/go-ethereum/wiki/Backup-&-restore]  
**geth** - Go Implementation of an API to the thereum node. Runs the Ethereum node for you.  
`geth attach` to start a console connected to your geth that's in the other bash window
list accounts... https://github.com/ethereum/go-ethereum/wiki/Managing-your-accounts  
`geth account list` or `> eth.accounts`
**Version 1.7.3-stable** (02/14/18), previous versions may use the --fast command which has since been deprecated  
https://github.com/ethereum/go-ethereum/wiki
https://github.com/ethereum/go-ethereum/wiki/geth  
**web3** - Javascript client lib for connecting to your ethereum node. Makes use of solc 
**Version ^1.0.0-beta.30** (02/14/18) https://github.com/ethereum/web3.js/  
[documentation .2x.x](https://github.com/ethereum/wiki/wiki/JavaScript-API)
[documentation 1.0](http://web3js.readthedocs.io/en/1.0/index.html)
**Node and NPM** - for running a node script that uses *web3* to connect to *geth*, and for talking to the crypto exchanges too.   
**solc** - module that compiles contracts for you. Solidity compiler for compiling smart contracts. We won't be using it in this project but its good to know this. The EOS Smartcontract was already compiled by the EOS developers and deployed.

## GETTING STARTED
1. Start an ethereum node connected to the mainnet. run it in fast mode.
#### If accessing the RPC from a browser
CORS will need to be enabled with the appropriate domain set. Otherwise, JavaScript calls are limit by the same-origin policy and requests will fail:
`geth --rpc --rpccorsdomain "http://localhost:3000"` that's **--rpccorsdomain**

#### Avoid The Deprecated Code that's all over Stackoverflow
the `--fast` flag in `geth --fast --cache=1024` is **DEPRECATED**. I last used it in geth v1.4
*Note* official documentation says to use `--cache 2048` and not `--cache=2048` like many users says. Unsure if it makes a difference.

#### Avoid unecessary commands that aren't necessary at this time
**Popular commands that won't help us and why**
`geth --syncmode "fast" --cache 2048` is missing the flag for RPC connections (so can't connect from web3 or a web app)
`geth --syncmode "fast" --cache 2048 --rpcapi --rpc` not needed
`--rpcport` default port is 8545 which we're fine with, so omitt this flag
`--rpcaddr` default is localhost which we're fine with, so omitt this
`--rpcapi` API's offered over the HTTP-RPC interface (default: "eth,net,web3")

**Correct Command for Starting Geth and your Ethereum Node**
`geth --syncmode "fast" --cache 2048 --rpc`

If syncronisation is working properly it should settle on log activity like:
`INFO [02-14|17:17:31] Imported new block receipts count=124  elapsed=203.265ms bytes=9311747 number=5086552 hash=a4e3fe…2c9c60 ignored=0` 
where `number` is the Block Height (i.e. latest block mined), so 5,086,552 blocks in the Ethereum blockchain as of 02/14/17, which are 52GB on my machine. `du -h ~/Library/Ethereum/geth/chaindata` to find out how many GB

Geth is now running on port `localhost:8545` and our node script will communicate to it in step 3.

2. Import a Private Key (Ethereum Account) to Geth, one that already has Eth 
In a new shell window (consider doing this before running Geth node. shouldn't hurt to do it afterwards though) 
`geth account import ~/path/to/<keyfile>` do not put in ./hash-tronic or ~/Library/Ethereum, for security  

- Save the passphrase somewhere secure
- Confirm the public address it gives you is same as the one your privateKey already corresponded to.
- Open a geth console by typing `geth attach` and then `> eth.accounts` to make sure your account is there.
- Check the balance using (geth command?, or insert a script *TODO*) 
- See that a keystore file was created like `~/Library/Ethereum/geth/keystore/UTC--2018-02-15T01-52-15.596264000Z--7d0a72767347332be638a0b9f3d751601ac03c8f  
You can also create a new address/privateKey, [instructions](https://github.com/ethereum/go-ethereum/wiki/Managing-your-accounts)


3. Run the node script using npm start
Web3 config makes JRC-20 protocool requests to the node your started on `localhost:8545`. This address:port is specified in the index.js file during web3 instance configuration.

