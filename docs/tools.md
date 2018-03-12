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
