## OVERVIEW
Hashtronic was conceived as a trading arbitrage bot that sends ether to the [EOS Crowdsale Smart Contract](https://github.com/EOSIO/eos-token-distribution) in exchange for EOS tokens ([ERC-20](https://blockonomi.com/erc-20-token-guide/)), which then get re-sold on an exchange for even more ether than you started with.

Currently this repo has code for **sending ether from one address to another**. You can send to either an account address or to a contract address (a.k.a. externally owned account)like EOS. [Account Address vs Contract Address](https://github.com/ethereum/wiki/wiki/White-Paper#ethereum-accounts). We will use [web3.js](https://github.com/ethereum/web3.js/) to do that.

There are instructions in [/docs/geth.md](https://github.com/thinkocapo/hash-tronic/tree/master/docs/geth.md) on how to run an ethereum node using [geth](https://github.com/ethereum/go-ethereum/wiki/geth), the command line interface for running a full ethereum node implemented in Go. Additional notes and links in [/docs/tools.md](https://github.com/thinkocapo/hash-tronic/blob/master/docs/tools.md) on all tools involved.

But for simplicity I've chosen to connect to [MyEtherWallet's geth node](https://www.myetherapi.com/).

**IMPORTANT DEV TIP:**  
- **web3** is the javascript client lib for connecting to your ethereum node.
- **Hash-tronic uses**: web3 [v1.0.0-beta.30](http://web3js.readthedocs.io/en/1.0/index.html)
- **not to be confused with**: web3 [v0.2x.x](https://github.com/ethereum/wiki/wiki/JavaScript-API)
- The v0.2x.x methodology (syntax, methods) is what a lot of literature (e.g. stackoverflow, github) references
- Some developers use v1.0.0 in production, many are still using v0.2x.x

## GETTING STARTED - How to Send Ether
1. `git clone https://github.com/thinkocapo/hash-tronic.git`
2. Select which ethereum node (geth) you'll connect to in [index.js#L15](https://github.com/thinkocapo/hash-tronic/blob/master/index.js#L15). I recommend MyEtherWallet's node but you have other options in [/eth-nodes.js](https://github.com/thinkocapo/hash-tronic/blob/master/ethereum-nodes.js). See [/docs/geth.md](https://github.com/thinkocapo/hash-tronic/blob/master/docs/geth.md) for instructions on how to run your own.
```
// tells web3 which ethereum node it will make calls to
let web3 = new Web3(new Web3.providers.HttpProvider(node))
```
3. Paste your private key in a new `/.env` file as `privateKey=[private_key]`. The .gitignore file ensures this never get pushed to Github. This privateKey will be used [here](https://github.com/thinkocapo/hash-tronic/blob/master/utils.js#L43) to verify your ownership of the account address being used to send ether. See 'Raw Transaction' section for more technical details.
4. `npm start sendEther 0.003` The recipient will default to whatever you put as `reciepientAddress=[paste_address]` in your `.env`. Or specify it as a [3rd argument](https://github.com/thinkocapo/hash-tronic/blob/master/index.js#L22) to `npm start`. 0.003 ether is ~$2.00 worth of ether as of 03/12/18.
5. Make sure all [loggers](https://github.com/thinkocapo/hash-tronic/blob/master/transaction-loggers.js) executed, the output looks good, and there are no errors.
6. Remove the early `return` statement in the sendEther method. Re-run `npm start sendEther 0.003` so the transaction will go through
7. You'll see a resulting Transaction Hash logged as output. Visit the following links at [Etherscan](https://etherscan.io/) Block Explorer to see your transaction's data and status, and view updated balances:  
`https://etherscan.io/tx/[transactionHash]`  
`https://etherscan.io/address/[fromAddress]`  
`https://etherscan.io/address/[recipientAddress]`  
8. If your $ didn't go through or its stuck for days on pending, there is no un-do button.

### Raw Transaction vs Transaction
**Raw Transaction**
- You sign the transaction object using your privateKey, before sending it to the ethereum node. This generates the raw bytes. Basically a raw transaction is a machine representation of a transaction, with the signature attached to it.
- You could take this signed transaction object, and email it to a friend and have them send it to the ethereum node via web3.js, if you wanted to.
```
transaction.sign(privateKey)
web3.eth.sendSignedTransaction('0x' + transaction.toString('hex'))
```
- **Raw bytes are required if you're connecting to a node hosted by MyEtherWallet/Infura/Etherscan, which do not not handle private keys but deal only with signed transactions.**  
- **If you're connecting to a local instance of geth/ethereum (localhost:8545), then you can manage your own privateKeys (i.e. import them into geth) so you don't have to 'sign' the transaction everytime.**  
- [Difference Between Transactions and Raw Transactions - ethereum.stackexchange](https://ethereum.stackexchange.com/questions/6905/difference-between-transactions-and-raw-transactions-in-web3-js)  
- [What Is A Raw Transaction Used For - ethereum.stackexchange](https://ethereum.stackexchange.com/questions/18928/what-is-a-raw-transaction-and-what-is-it-used-for)

*VS.*

**Transaction**
- You already unlocked the account at that node, the node can handle privateKeys.
```
web3.eth.sendTransaction({
    from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
    to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
    value: '1000000000000000'
})
// Notice -  no privateKey needed, because it was already imported and geth can access it at web3.accounts[0]
```

### Trading Arbitrage - Roadmap
Step 1 is the [sendEther](https://github.com/thinkocapo/hash-tronic/blob/master/scripts.js#L9) method documented above.
1. Send ether from your account address to the to E0S contract address.
2. Claim your E0S tokens the next day by calling the eos contract's claimAll() method, using your account address.
3. Send your E0S tokens to a crypto trading exchange by hitting their API.
4. Perform a trade of E0S-to-ETH using the exchange's API.
5. Send this ether back to your account address.
6. The quantity of this ETH is greater than what you started with in Step 1.
7. Repeat from Step 1.
