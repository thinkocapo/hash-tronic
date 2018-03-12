## Overview
Hashtronic was conceived as a trading arbitrage bot that sends ether to the [EOS Crowdsale Smart Contract](https://github.com/EOSIO/eos-token-distribution) in exchange for EOS tokens (ERC-20). Currently this repo has code for sending ether from one address to another (eos Contract address or a personal Account address).

Skip to section **Sending Ether**

There are notes in /docs about running your own ethereum node called [geth](https://github.com/ethereum/go-ethereum/wiki/geth) but for simplicity I've chosen to connect to [MyEtherWallet's geth node](https://www.myetherapi.com/)'s 
"geth is the the command line interface for running a full ethereum node implemented in Go"

Trading arbitrage will eventually do the following. Currently step 1 is working and is documented in great detail. See the 'sendEther' method here...
1. Send ether from your account address to the to E0S contract address.
2. Claim your E0S tokens the next day by calling the eos contract's claimAll() method, using your account address.
3. Send your E0S tokens to a crypto trading exchange by hitting their API.
4. Perform a trade of E0S-to-ETH using the exchange's API.
5. Send this ether back to your account address.
6. The quantity of this ETH is greater than what you started with in Step 1.
7. Repeat from Step 1.

### Tools
**ethereum**  
https://github.com/ethereum (node hosted by MyEthereumAPI, but see eth-nodes.js to get an idea of all the places you can find a node to connect to. see index.js to find where this is configured.
https://ethereum.org/cli for geth CLI basics
**geth** - The [Go](https://golang.org/) implementation of an ethereum node. Provides a command-line interface to hit the RPC api of the ethereum node. It runs the Ethereum node for you.  
  
**web3** - Javascript client lib for connecting to your ethereum node. Makes use of solc. v1.0.0
Hash-tronic uses [v1.0.0-beta.30](http://web3js.readthedocs.io/en/1.0/index.html) which is fairly new as of 03/12/18, as much of the literature (stackoverflow, github) you'll find is referencing web3 code from [v0.2x.x] (https://github.com/ethereum/wiki/wiki/JavaScript-API)

**Version ^1.0.0-beta.30** (02/14/18) https://github.com/ethereum/web3.js/  
[documentation .2x.x](https://github.com/ethereum/wiki/wiki/JavaScript-API)
[documentation 1.0](http://web3js.readthedocs.io/en/1.0/index.html)
**Node and NPM** - for running a node script that uses *web3* to connect to *geth*, and for talking to the crypto exchanges too.   
**solc** - [Module](GitHub - ethereum/solc-js: Javascript bindings for the solidity compiler) that compiles smart contracts written in `.sol` into EVM bytecode for you to deploy. We won't be using solc in this project as we are *calling* smart contract methods and *sending* ether using web3, but not *deploying* smart contract bytecode. The eos_sale.sol ([eos-distribution](https://github.com/EOSIO/eos-token-distribution/tree/master/src)) smartcontract was already compiled and deployed by its creators.

## GETTING STARTED
1. Select which ethereum node (geth) you'll be connecting to in index.js/L.... I recommend the MyEtherWallet node but you have other options in eth-nodes.js. See docs/geth-node.md for notes on how to run your own.
2. Put your private key in a .env file as privateKey=[paste_private_key]. The .gitignore file makes sure this file will never get pushed to Github. This will be used by /scripts.js sendEther method and web3 to verify your ownership of the account address being used to send ether.
3. `npm start sendEther 0.003` Specify the recipient account address as a 3rd argument to this command, or put it in .env as reciepientAddress=[paste_address]
4. Make sure all the logged output looks good....
5. remove the early `return` statement in scripts.js sendEther... and re-run
6. You'll see a resulting TransactionHash id in the logged output. Go to etherscan and make sure the data is good... web3js method to get the transaction details...

...

#### IMPORTANT to Understand - Sending Transaction vs Raw Transaction
**Raw Transaction** - you sign the tx object using a privateKey, before sending to the geth node. tx.sign web3.eth.sendRawTransaction
A raw transaction is a transaction in raw bytes.
If one has the raw bytes of a valid transaction, they can use sendRawTransaction.
Raw bytes are required if you are using a platform like infura.io which does not handle private keys but deal only with signed transactions.
https://ethereum.stackexchange.com/questions/6905/difference-between-transactions-and-raw-transactions-in-web3-js
Basically a raw transaction is a machine representation of a transaction, with the signature attached to it.
https://ethereum.stackexchange.com/questions/18928/what-is-a-raw-transaction-and-what-is-it-used-for
**Transaction ** - web3.accounts[0] - you already unlocked the account at that node, the node can handle privateKeys.
Otherwise, web3.js creates the signed transaction's bytes for you automatically as part of sendTransaction().
another way - https://github.com/ethereum/go-ethereum/wiki/Sending-ether




 
