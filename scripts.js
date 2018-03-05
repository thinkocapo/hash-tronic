const TX = require('ethereumjs-tx')
const Web3 = require('web3')

// Web3 1.0 Docs http://web3js.readthedocs.io/en/1.0/index.html // don't confuse with v0.2's which is what most search results give yo
// https://github.com/ethereumjs/ethereumjs-tx/blob/master/examples/transactions.js
// https://github.com/SilentCicero/ethereumjs-accounts
// sendTransaction vs sendRawTransaction , estimateGas()
// https://tokenmarket.net/blog/creating-offline-ethereum-transactions-in-javascript/
/**
 * Raw Tx from MEW at 1:19a on 03/05/18
 * Most values are hex's of the actual value
 * 
 * {"nonce":"0x10", // # historical transactions by sender address
 * "gasPrice":"0x04e3b29200", // determined by the x latest blocks median gas price.
 * "gasLimit":"0x5208", // # like 20000000 21000
 * "to":"0x1eec5a83f78d3952fe86747034a7514f2dc9925c", // address of recipient
 * "value":"0x2386f26fc10000", // wei
 * "data":"",
 * "chainId":1}
 */

const { address, privateKey } = process.env
const eosContractAddress = '0xd0a6E6C54DbC68Db5db3A091B171A77407Ff7ccf'
const eosContractABI = [{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"address"}],"name":"claimed","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"time","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint128"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"foundersAllocation","outputs":[{"name":"","type":"uint128"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"day","type":"uint256"}],"name":"claim","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"foundersKey","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"address"}],"name":"userBuys","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"day","type":"uint256"}],"name":"createOnDay","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"freeze","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"keys","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"startTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"dailyTotals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"buy","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"openTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"EOS","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"today","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"eos","type":"address"}],"name":"initialize","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"createFirstDay","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"claimAll","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"timestamp","type":"uint256"}],"name":"dayFor","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"day","type":"uint256"},{"name":"limit","type":"uint256"}],"name":"buyWithLimit","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[],"name":"collect","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numberOfDays","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"key","type":"string"}],"name":"register","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"createPerDay","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"_numberOfDays","type":"uint256"},{"name":"_totalSupply","type":"uint128"},{"name":"_openTime","type":"uint256"},{"name":"_startTime","type":"uint256"},{"name":"_foundersAllocation","type":"uint128"},{"name":"_foundersKey","type":"string"}],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"window","type":"uint256"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"LogBuy","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"window","type":"uint256"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"LogClaim","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"key","type":"string"}],"name":"LogRegister","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"LogCollect","type":"event"},{"anonymous":false,"inputs":[],"name":"LogFreeze","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"}] // should NOT be a string or will throw error in web3js/contracts.js
const gasLimit = 90000
let webThree = new Web3
console.log('address', address)

module.exports = {  

  sendEth2EosContract: async function (web3, value) {
    return createRawTx(eosContractAddress, value, web3)
      .then(txInstance => {
        const tx = txInstance
        const txSerialized = createSerializedSignedTx(tx, privateKey) // <Buffer f8 62 10 85...
        return
        return web3.eth.sendRawTransaction('0x' + txSerialized.toString('hex'), function(err, hash) { if (!err) {
            console.log('hash', hash); // "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385"
          } else { console.log(' err sendRawTransaction \n', err)}
        });
      })
  },
  
  claimEos: function (web3) {
    const eosContractInstance = new web3.eth.Contract(eosContractABI, eosContractAddress);
    // console.log('\n === eosContractInstance.methods.claimAll === \n', eosContractInstance.methods); // 'function () { [native code] }'
  },
  sendEosToExchange: function () {
    // exchange api - send eos to exchange
    // exchange api - exchange eos for eth
    // exchange api - send eth back to default account address
    // log details on what fees/money was made
  }
}

var createRawTx = function (eosContractAddress, value, web3) {
  
  // Prepare a Raw Transaction object
  let gasLimit = 300000; // 0x493e0 // what # to use as input?
  let gasPrice
  return web3.eth.getGasPrice()
    .then(result => { 
      gasPrice = result
      return web3.eth.getTransactionCount(process.env.address) // getTransactionCountAsync
    })
    .then(transactionCount => {
      console.log('transactionCount', transactionCount)
      const rawTx = {
        nonce: hex(transactionCount),
        gasPrice : hex(gasPrice), 
        gasLimit: hex(300000),
        to: eosContractAddress,
        value: hex(value), 
        "data":"",
        "chainId":1
      }
      // console.log('\nrawTx\n', rawTx)
      const tx = new TX(rawTx)
      console.log('\ntx\n', tx)      
      return tx // // Transaction: { raw: [  <Buffer >], _fields: ['nonce',]}  
    })
}

var createSerializedSignedTx = function (tx, pKey) {
  const privateKey = Buffer.from(pKey, 'hex') // toString()
  tx.sign(privateKey) // or web3.eth.sign(address, dataToSign, [, callback]) but account would need to be unlocked https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethsendrawtransaction
  const txSerialized = tx.serialize()
  // console.log('txSerialized.toString(hex)\n', txSerialized.toString('hex')) // f889808609184e72a00082271094d0a6e6c54dbc68d
  console.log('txSerialized\n', txSerialized)  
  return txSerialized // <Buffer f8 89 80 86 09 18 4e 7 ... >
}

  // TODO - make a single method that will first check if their are new EOS tokens to claim, and then run claimAll and exchange workflow
  // and if no new EOS token available, then send eth to EOS Crowdsale

var hex = function (gasPrice) {
  return webThree.utils.toHex(gasPrice)
}