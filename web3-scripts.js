const TX = require('ethereumjs-tx')
// https://github.com/ethereumjs/ethereumjs-tx/blob/master/examples/transactions.js
// https://github.com/SilentCicero/ethereumjs-accounts
// sendTransaction vs sendRawTransaction
// estimateGas()

// *
// https://tokenmarket.net/blog/creating-offline-ethereum-transactions-in-javascript/

/**
 * A raw transaction is a transaction in raw bytes.
 * If one has the raw bytes of a valid transaction, they can use sendRawTransaction.
 * Otherwise, web3.js creates the signed transaction's bytes for you automatically as part of sendTransaction().
 * Raw bytes are required if you are using a platform like infura.io which does not handle private keys but deal only with signed transactions.
 * https://ethereum.stackexchange.com/questions/6905/difference-between-transactions-and-raw-transactions-in-web3-js
 * Basically a raw transaction is a machine representation of a transaction, with the signature attached to it.
 * https://ethereum.stackexchange.com/questions/18928/what-is-a-raw-transaction-and-what-is-it-used-for
 */

const eosContractAddress = '0xd0a6E6C54DbC68Db5db3A091B171A77407Ff7ccf'
const eosContractABI = [{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"address"}],"name":"claimed","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"time","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint128"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"foundersAllocation","outputs":[{"name":"","type":"uint128"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"day","type":"uint256"}],"name":"claim","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"foundersKey","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"address"}],"name":"userBuys","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"day","type":"uint256"}],"name":"createOnDay","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"freeze","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"keys","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"startTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"dailyTotals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"buy","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"openTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"EOS","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"today","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"eos","type":"address"}],"name":"initialize","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"createFirstDay","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"claimAll","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"timestamp","type":"uint256"}],"name":"dayFor","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"day","type":"uint256"},{"name":"limit","type":"uint256"}],"name":"buyWithLimit","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[],"name":"collect","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numberOfDays","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"key","type":"string"}],"name":"register","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"createPerDay","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"_numberOfDays","type":"uint256"},{"name":"_totalSupply","type":"uint128"},{"name":"_openTime","type":"uint256"},{"name":"_startTime","type":"uint256"},{"name":"_foundersAllocation","type":"uint128"},{"name":"_foundersKey","type":"string"}],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"window","type":"uint256"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"LogBuy","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"window","type":"uint256"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"LogClaim","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"key","type":"string"}],"name":"LogRegister","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"LogCollect","type":"event"},{"anonymous":false,"inputs":[],"name":"LogFreeze","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"}] // should NOT be a string or will throw error in web3js/contracts.js
const gasLimit = 90000

var createTransactionObject = function (eosContractAddress) {
  const bytcode = null // bytcode of compiled contract https://ethereum.stackexchange.com/questions/25839/how-to-make-transactions-using-private-key-in-web3
  const rawTx = {
    nonce: '0x00', // https://github.com/trufflesuite/ganache-cli/issues/344
    chainId: 1, // EIP 155 chainId - mainnet: 1, ropsten: 3
    data: bytcode, // '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // get the bytcode https://gist.github.com/tomconte/4edb83cf505f1e7faf172b9252fff9bf
    // gas: feeCost,
    gasLimit: '0x2710', // 1000 https://ethereum.stackexchange.com/questions/25839/how-to-make-transactions-using-private-key-in-web3
    gasPrice: '0x09184e72a000', // 100 
    to: eosContractAddress,
    value: '0x00', // wei?
    // https://www.reddit.com/r/ethdev/comments/71rhzs/05_eth_bounty_help_needed_for_sending_raw/
  }
  return new TX(rawTx) // Transaction: { raw: [  <Buffer >], _fields: ['nonce',]}  
}

var signTransactionWithPrivateKey = function (tx, pKey) {
  //var feeCost = tx.getUpfrontCost()
  //console.log('feeCost', feeCost.toString())   // ?
  const privateKey = Buffer.from(pKey, 'hex') // toString()
  tx.sign(privateKey) // or web3.eth.sign(address, dataToSign, [, callback]) but account would need to be unlocked https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethsendrawtransaction
  const serializedTx = tx.serialize()
  return serializedTx // <Buffer f8 89 80 86 09 18 4e 7 ... >
  // console.log('serializedTx.toString(hex)\n', serializedTx.toString('hex')) // f889808609184e72a00082271094d0a6e6c54dbc68d
}

module.exports = {
  
  // STEP 1 CREATE TRANSACTION FOR SENDING ETHER FROM ACCOUNT ADDRESS TO EOS CONTRACT ADDRESS
  sendEth2EosContract: async function (web3) {
    const tx = createTransactionObject(eosContractAddress)
    const serializedTx = signTransactionWithPrivateKey(tx, process.env.PK) // makes it so funds are coming from the account address for that private key?
    
    return web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) { if (!err) {
        console.log('hash', hash); // "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385"
      } else { console.log(' err sendRawTransaction \n', err)}
    });
  },
  
  // 24Hr window closes...
  // TODO - make a single method that will first check if their are new EOS tokens to claim, and then run claimAll and exchange workflow
  // and if no new EOS token available, then send eth to EOS Crowdsale
  
  // STEP 2 CLAIM EOS TOKENS
  claimEos: function (web3) {
    const eosContractInstance = new web3.eth.Contract(eosContractABI, eosContractAddress);
    console.log('\n === eosContractInstance.methods.claimAll === \n', eosContractInstance.methods); // 'function () { [native code] }'
  },

  sendEosToExchange: function () {
    // exchange api - send eos to exchange
    // exchange api - exchange eos for eth
    // exchange api - send eth back to default account address
    // log details on what fees/money was made
  },

  getBalance: async function (web3) {
    // erroing i think...try promise-chain.
    // const bal = 
    // web3.eth.getBalance("0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8")
    web3.eth.getBalance("0x7602aCd0a747332Ce638a0b9f6d7532767303C8F")
      .then((res, err) => {
        console.log('\n ======= err =====\n', err);
        console.log('\n ======= res =====\n', res) // .toString(10));
        const wei = res
        // but if you paste the Wei into ether using https://etherconverter.online/
        // 02/27/18 below line fails...
        // then you can see its the right amount of ether 
        // const ether = web3.eth.fromWei(wei, 'ether')
        // console.log('\n ====== ether =====', ether)
      })
  },
  getBlock: async function (web3) {
    console.log('GET BLOCK\n')
    return web3.eth.getBlock(5100000)
      .then((res, err) => { // err
        console.log('\n ======= err =====\n', err);
        console.log('\n ======= res =====\n', res);
        return
      })

    // ERROR also won't run... Error: Invalid JSON RPC response: "<!DOCTYPE HTML PUBLIC \"-//W3C//D
    // web3.eth.getBlock(48, function(error, result){
    //   if(!error)
    //       console.log(JSON.stringify(result));
    //   else
    //       console.error(error);
    // })
  },
  sendRawTxTest: async function (web3) {
    /**
     * let transaction = { 'to': '0xF0109fC8DF283027b6285cc889F5aA624EaC1F55',
        'value': 1000000000,
        'gas': 2000000,
        'gasPrice': 234567897654321,
        'nonce': 0,
        'chainId': 1 }

        let signed = w3.eth.account.signTransaction(transaction, key)
        w3.eth.sendRawTransaction(signed.rawTransaction)
     */
  },
  filterWatches: async function (web3) {
    // ERROR web3.eth.filter is not a function... isn't there an newer syntax if you check the wiki doc?
    // var filter = web3.eth.filter('pending'); // .Filter
    // var filter = web3.eth.subscribe('pendingTransactions', function (err, res) {
    //   console.log('\n -- SUBSCRIBE err --\n', err) // current provider doesnt support subscriptions: HTTPProvider
    //   console.log('\n -- SUBSCRIBE res --\n', res)
    // });

    // filter.watch(function(error, result) {
    //   if (!error) {
    //     web3.eth.getTransaction(result, function(error, data) {
    //       if (!error) $("#newTxs tr:first").after(''+data.from+''+data.to+' '+web3.fromWei(data.value,'ether').toString()+' ETH ');
    //     });
    //   }
    // });
  
    //Result...
    //checkout latest transactions below, it might take a second to load as it is waiting for incoming txs
  }
}

