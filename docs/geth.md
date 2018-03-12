### GETTING STARTED W/ GETH
**Popular commands that won't help us and why**  
`geth --syncmode "fast" --cache 2048` is missing the flag for RPC connections (so can't connect from web3 or a web app)  
`geth --syncmode "fast" --cache 2048 --rpcapi --rpc` not needed  
`--rpcport` default port is 8545 which we're fine with, so omitt this flag  
`--rpcaddr` default is localhost which we're fine with, so omitt this  
`--rpcapi` API's offered over the HTTP-RPC interface (default: "eth,net,web3")  

**CORRECT Command for starting geth**  
`geth --syncmode "fast" --cache 2048 --rpc`

**Check that syncronisation is working properly**
It should settle on log activity like:  
```
INFO [02-14|17:17:31] Imported new block receipts count=124  elapsed=203.265ms bytes=9311747 number=5086552 hash=a4e3fe…2c9c60 ignored=0
``` 
- where `number` is the Block Height (i.e. latest block mined)
- so 5,086,552 blocks in the Ethereum blockchain as of 02/14/17, which are 52GB on my machine.
- `du -h ~/Library/Ethereum/geth/chaindata` to find out how many GB in size it is

**Geth is now running on port `localhost:8545`** and our node script will communicate to it in step 3.

**Import a Private Key**
- This associates one of your account addresses to **web3.accounts[...]**
- In a new shell window (consider doing this before running Geth node. shouldn't hurt to do it afterwards though) 
`geth account import ~/path/to/<keyfile>` do not put in ./hash-tronic or ~/Library/Ethereum, for security  
- Save the passphrase somewhere secure
- Confirm the public address it gives you is same as the one your privateKey already corresponded to.
- Open a geth console by typing `geth attach` and then `> eth.accounts` to make sure your account is there.
- Check the balance using a RPC command
- See that a keystore file was created like `~/Library/Ethereum/geth/keystore/UTC--2018-02-15T01-52-15.596264000Z--7d0a72767347332be638a0b9f3d751601ac03c8f  
You can also create a new address/privateKey, [instructions](https://github.com/ethereum/go-ethereum/wiki/Managing-your-accounts)

**Communicate to geth using one of the following:**
- Run the hash-tronic node script `npm start sendEther 0.003` 
- `geth attach` in a new terminal, so you can run RPC commands to interact with it
- start a `node` console and run web3.method's to interact with it from there

**Note -** Web3 config makes JRC-20 protocool requests to the node your started on `localhost:8545`. This address:port is specified in the index.js file during web3 instance configuration.
