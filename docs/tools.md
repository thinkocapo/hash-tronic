### Tools
**ethereum**  
https://github.com/ethereum (node hosted by MyEthereumAPI, but see eth-nodes.js to get an idea of all the places you can find a node to connect to. see index.js to find where this is configured.
https://ethereum.org/cli for geth CLI basics

**geth** - The [Go](https://golang.org/) implementation of an ethereum node. Provides a command-line interface to hit the RPC api of the ethereum node. It runs the Ethereum node for you. My instructions on how I run `geth` are in [/docs/geth.md](https://github.com/thinkocapo/hash-tronic/blob/master/docs/tools.md)
  
**web3** - Javascript client lib for connecting to your ethereum node. Uses solc. v1.0.0
Hash-tronic uses [v1.0.0-beta.30](http://web3js.readthedocs.io/en/1.0/index.html) which is fairly new as of 03/12/18, as much of the literature (stackoverflow, github) you'll find is referencing web3 code from [v0.2x.x] (https://github.com/ethereum/wiki/wiki/JavaScript-API)
NOTE - this should save you some headache when you're starting out with web3:
Hash-tronic uses: web3 v1.0.0-beta.30 http://web3js.readthedocs.io/en/1.0/index.html
not to be confused with: web3 v0.2x.x https://github.com/ethereum/wiki/wiki/JavaScript-API
v0.2x.x methodology (syntax, methods) is what a lot of literature (stackoverflow, github) references
some use v1.0.0 in production, many are still using v0.2x.x

**Version ^1.0.0-beta.30** (02/14/18) https://github.com/ethereum/web3.js/  
[documentation .2x.x](https://github.com/ethereum/wiki/wiki/JavaScript-API)
[documentation 1.0](http://web3js.readthedocs.io/en/1.0/index.html)

**solc** - [Module](GitHub - ethereum/solc-js: Javascript bindings for the solidity compiler) that compiles smart contracts written in `.sol` into EVM bytecode for you to deploy. We won't be using solc in this project as we are *calling* smart contract methods and *sending* ether using web3, but not *deploying* smart contract bytecode. The eos_sale.sol ([eos-distribution](https://github.com/EOSIO/eos-token-distribution/tree/master/src)) smartcontract was already compiled and deployed by its creators.


[ethstats.net](https://ethstats.net/) for current gasPrice ratio eth/gas and other ethereum live statistics
Some Official Ethereum Javascript Tools that are beyond the scope of Sending Ether:
https://github.com/ethereumjs
https://github.com/ethereumjs/ethereumjs-tx is how we created our Transaction Objec
