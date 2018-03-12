## Overview
Hashtronic was conceived as a trading arbitrage bot that sends ether to the [EOS Crowdsale Smart Contract](https://github.com/EOSIO/eos-token-distribution) in exchange for EOS tokens (ERC-20), which then get re-sold on an exchange for even more ether than you started with.

Currently this repo has code for **sending ether from one address to another**. You can send to either a contract address like EOS or to a account address. We will use [web3.js](https://github.com/ethereum/web3.js/) to do that.

There are instructions in [/docs](https://github.com/thinkocapo/hash-tronic/tree/master/docs) on how to run an ethereum node using [geth](https://github.com/ethereum/go-ethereum/wiki/geth), the command line interface for running a full ethereum node implemented in Go.

But for simplicity I've chosen to connect to [MyEtherWallet's geth node](https://www.myetherapi.com/).

## GETTING STARTED - How to Send Ether
1. Select which ethereum node (geth) you'll be connecting to in [index.js#L15](https://github.com/thinkocapo/hash-tronic/blob/master/index.js#L15). I recommend MyEtherWallet's node but you have other options in [/eth-nodes.js](https://github.com/thinkocapo/hash-tronic/blob/dev/ethereum-nodes.js). See [/docs/geth.md](https://github.com/thinkocapo/hash-tronic/blob/master/docs/geth.md) for instructions on how to run your own.
```
// tells web3 which ethereum node to connect to
let web3 = new Web3(new Web3.providers.HttpProvider(node))
```
2. Put your private key in a .env file as privateKey=[paste_private_key]. The .gitignore file makes sure this file will never get pushed to Github. This will be used by /scripts.js sendEther method and web3 to verify your ownership of the account address being used to send ether.
3. `npm start sendEther 0.003` Specify the recipient account address as a 3rd argument to this command, or put it in .env as reciepientAddress=[paste_address] which is the default
4. Make sure all the logged output looks good.
5. Remove the early `return` statement in the sendEther method. Re-run `npm start sendEther 0.003` so the transaction will go through
6. You'll see a resulting Transaction Hash logged as output. Visit the following links the [Etherscan](https://etherscan.io/) Block Explorer to see your transaction's data and status, and view updated balances:  
`https://etherscan.io/tx/[transactionHash]`  
`https://etherscan.io/address/[fromAddress]`  
`https://etherscan.io/address/[recipientAddress]`

If your $ didn't go through or its stuck for hours on pending, there might not be anything you can do. Tis the nature of this Wild West we call cryptocurrencies. 

### IMPORTANT to Understand - Transaction vs Raw Transaction
**Raw Transaction** - You sign the transaction object using your privateKey, before sending it to the ethereum node. This generates the raw bytes. Basically a raw transaction is a machine representation of a transaction, with the signature attached to it.
```
transaction.sign(privateKey)
web3.eth.sendSignedTransaction('0x' + transaction.toString('hex'))
```
**Raw bytes are required if you are using a platform like MyEtherWallet/Infura/Etherscan, which do not not handle private keys but deal only with signed transactions.**
**If you are running geth (ethereum node) yourself locally, then you can manage your own privateKeys (i.e. import them into geth) so you don't have to 'sign' the transaction everytime.**
[Difference Between Transactions and Raw Transactions - ethereum.stackexchange](https://ethereum.stackexchange.com/questions/6905/difference-between-transactions-and-raw-transactions-in-web3-js)
[What Is A Raw Transaction Used For - ethereum.stackexchange](https://ethereum.stackexchange.com/questions/18928/what-is-a-raw-transaction-and-what-is-it-used-for)
**Transaction ** - You already unlocked the account at that node, the node can handle privateKeys.
```
web3.accounts[0]
web3.eth.sendTransaction({
    from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
    to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
    value: '1000000000000000'
})
// Notice -  no privateKey needed, because it was already imported and geth can access it at web3.accounts[0]
// this technique creates the  bytes for us
```

### Trading Arbitrage - Roadmap
Currently step 1 is working and is documented in great detail. See the 'sendEther' method here...
1. Send ether from your account address to the to E0S contract address.
2. Claim your E0S tokens the next day by calling the eos contract's claimAll() method, using your account address.
3. Send your E0S tokens to a crypto trading exchange by hitting their API.
4. Perform a trade of E0S-to-ETH using the exchange's API.
5. Send this ether back to your account address.
6. The quantity of this ETH is greater than what you started with in Step 1.
7. Repeat from Step 1.
