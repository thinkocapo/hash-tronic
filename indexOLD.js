const ethNodeProviders = require('./eth-node-providers')
const gethLocal = ethNodeProviders.gethLocal
const myEtherWallet = ethNodeProviders.myEtherWallet

// RUN A GETH NODE USING
// geth --syncmode "fast" --cache 2048 --rpc
const Web3 = require('web3')
let web3
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // web3 = new Web3(new Web3.providers.HttpProvider(gethLocal));
    web3 = new Web3(new Web3.providers.HttpProvider(myEtherWallet))
    // web3.setProvider(new web3.providers.HttpProvider(myEtherWallet)); // https://www.myetherapi.com/
}

// console.log('\n======== web3.eth =======\n', web3.eth.Contract) // web3.accounts [...]

//*TODO* - need add an account to GETH. see if can access it as web3.eth.accounts[0] 11:59a

// UNLOCK ETHER ACCOUNT ADDRESS
// Next, we have to specify a default ethereum account to use through the web3.eth.defaultAccount method:
// Remember when we ran the testrpc console command? It provided us with 10 accounts. We're simply choosing the first account here to use.
// Can use js/web3 to unlock a wallet?
// Or must do that from geth commandline first?
// Try sending to my own address, from commandLine, first. or doesnt matter, because should ahve txId, will see it or WONT see it under EOS Contract Address Activity
// unlock account, may need to use Truffle   

web3.eth.getAccounts(function (error, res) {
    console.log('web3.eth.getAccounts response \n', res)
    const accounts = res
    // const myAccount = res[0].toString()
    // console.log('===== Account is ======', myAccount) // undefined *TODO*
    


    // *TODO* use somewhere...claimAll...
    //web3.eth.defaultAccount = web3.eth.accounts[0]; // test accounts, ganache. or real.

    // *TODO* need Unlock?
    // tried > personal.unlockAccount("0x7602acd0a747332ce638a0b9f6d7532767303c8f") 

    // var balance = web3.eth.getBalance(myAccount); // returns Promise...
    // console.log('\n====== balance ====\n', balance)

    // > eth.syncing to know if geth is done syncing https://ethereum.stackexchange.com/questions/16333/how-can-i-tell-if-geth-is-done-running
    // should say 'imported chain segment' when complete https://www.reddit.com/r/EtherMining/comments/6dxaci/how_do_you_tell_when_geth_has_finished/
    // sync as a service... bash. https://medium.com/@jacksonngtech/syncing-geth-to-the-ethereum-blockchain-9571666f3cfc
    // not possible? https://github.com/ethereum/go-ethereum/issues/14338
    // asks "WHen is it ever done syncing?" https://bitcointalk.org/index.php?topic=1861097.0 and https://github.com/ethereum/go-ethereum/issues/2936
    // > eth.getBlock("latest")

    web3.eth.getBalance(myAccount, function (err, res) { // highestBlock vs currentBlock https://stackoverflow.com/questions/47161038/web3-js-getbalance-always-showing-0
        if (err) console.log('err', err)
        console.log('====== getBalance result ====', res) // 0
    })

    // says im not synced up yet https://ethereum.stackexchange.com/questions/511/why-is-geth-always-returning-a-0-balance

    // function checkAllBalances() {
        // const eth = web3.eth
        // var totalBal = 0;
        // for (var acctNum in accounts) {
        //     var acct = accounts[acctNum];
        //     var acctBal = web3.fromWei(eth.getBalance(acct), "ether"); // cant read fromWei, error
        //     totalBal += parseFloat(acctBal);
        //     console.log("  accounts[" + acctNum + "]: \t" + acct + " \tbalance: " + acctBal + " ether");
        // }
        // console.log("  Total balance: " + totalBal + " ether");
    // };
    // checkAllBalances()
    
    // return web3.eth.getBalance(res[0], 5092367)
})
    // .then((result) => {
    //     console.log('====== balance =======', result); // logs the account address again...
    // })


// SEND ETHER TO EOS CROWDSALE CONTRACT ADDRESS
// w/ gas limit <= 90000. from web3.eth.account wallet?
const eosContractAddress = '0xd0a6E6C54DbC68Db5db3A091B171A77407Ff7ccf' 
const gasLimit = 90000
// Create an account....web3
// https://github.com/ethereum/wiki/wiki/JavaScript-API ?
// or
// Create an account...Geth
// https://github.com/ethereum/go-ethereum/wiki/Managing-your-accounts


// GET THE EOS CONTRACT INSTANCE SO WE CAN INVOKE THE .CLAIMALL SMARTCONTRACT METHOD TO GET OUR TOKENS
// It accepts one parameter, which is referred to as the ABI (Application Binary Interface). 
// This ABI allows you to call functions and receive data from your smart contract.
// Use the web3.eth.contract() method to initiatlize (or create) the contract on an address.
// Rather than paste ABI here, could have compiled the entire .sol file? using npm solc command... ? // https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2
const eosContractABI = [{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"address"}],"name":"claimed","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"time","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint128"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"foundersAllocation","outputs":[{"name":"","type":"uint128"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"day","type":"uint256"}],"name":"claim","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"foundersKey","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"address"}],"name":"userBuys","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"day","type":"uint256"}],"name":"createOnDay","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"freeze","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"keys","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"startTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"dailyTotals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"buy","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"openTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"EOS","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"today","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"eos","type":"address"}],"name":"initialize","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"createFirstDay","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"claimAll","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"timestamp","type":"uint256"}],"name":"dayFor","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"day","type":"uint256"},{"name":"limit","type":"uint256"}],"name":"buyWithLimit","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[],"name":"collect","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numberOfDays","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"key","type":"string"}],"name":"register","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"createPerDay","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"_numberOfDays","type":"uint256"},{"name":"_totalSupply","type":"uint128"},{"name":"_openTime","type":"uint256"},{"name":"_startTime","type":"uint256"},{"name":"_foundersAllocation","type":"uint128"},{"name":"_foundersKey","type":"string"}],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"window","type":"uint256"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"LogBuy","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"window","type":"uint256"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"LogClaim","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"key","type":"string"}],"name":"LogRegister","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"LogCollect","type":"event"},{"anonymous":false,"inputs":[],"name":"LogFreeze","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"}] // should NOT be a string or will throw error in web3js/contracts.js
const eosContractInstance = new web3.eth.Contract(eosContractABI, eosContractAddress);
// var contract = new web3.eth.Contract(abi, contractAddress)
// const eosContractInstance = eosContract.at(eosContractAddress);
console.log('\n === eosContractInstance.methods.claimAll === \n', eosContractInstance.methods.claimAll); // 'function () { [native code] }'
return

// Send Ether to eosContractAddress

// wait for 24hr period to end...

// GET TOKENS
// Amount to Send: 0, GasLimit: 90000
// Invoke 'claimAll' off of web3.getContract(eos).claimAll [pseudocode] or see EOS obj I made 5:16p:
// Does this put tokens at the address? Can see them there afterwards?
eosContractInstance.methods.claimAll(data, {from: web3.eth.accounts[0]}, function (result) { // function(err, result) {}
    console.log('This is a callback?', result)
    console.log('Log the amount of EOS obtaine, or email the # to somewhere')
})

// SEND EOS FROM DEFAULT ACCOUNT WALLET TO EXCHANGE WALLET

// ...

// TRADE EOS FOR ETHER USING EXCHANGE API

// ...

// SEND ETHER BACK TO ORIGINAL web3.eth.defaultAccount address

// REPEAT

