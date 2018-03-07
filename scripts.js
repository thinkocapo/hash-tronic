const EthTx = require('ethereumjs-tx')
const Web3 = require('web3')

// Web3 1.0 Docs http://web3js.readthedocs.io/en/1.0/index.html // don't confuse with v0.2's which is what most search results give yo
// https://github.com/ethereumjs/ethereumjs-tx/blob/master/examples/transactions.js
// https://github.com/SilentCicero/ethereumjs-accounts
// sendTransaction vs sendRawTransaction , estimateGas()

// ethstats.net for gasprice ratio eth/gas
// eth3r.co for turning pKey into address
// etherutils
// ethereumjs/keythereum
/**
 * Raw Tx from MEW at 1:19a on 03/05/18
 * Most values are hex's of the actual value
 * 
 * {"nonce":"0x10", // # historical transactions by sender address
 * "gasPrice":"0x04e3b29200", // 21000 ? etermined by the x latest blocks median gas price. 20gwei or 20000000000 // recently 9 000 000 000
 * "gasLimit":"0x5208", // # formerly 21000 to send on MEW or 300000 here // "amount of gas you pay is fixed, but the quantity of ethere it costs for that is not fixed (it varies)" // wont necessarily use all of this limit? e.g. if set a super high limit...
 * "to":"0x1eec5a83f78d3952fe86747034a7514f2dc9925c", // address of recipient
 * "value":"0x2386f26fc10000", // eventually // eventually hex(web3.utils.toWei(value.toString(),'ether'))
 * "data":"", // only for deploying smart contract
 * "chainId":1}
 */

const { address, privateKey, chain } = process.env
const eosContractAddress = '0xd0a6E6C54DbC68Db5db3A091B171A77407Ff7ccf'
const eosContractABI = [{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"address"}],"name":"claimed","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"time","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint128"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"foundersAllocation","outputs":[{"name":"","type":"uint128"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"day","type":"uint256"}],"name":"claim","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"foundersKey","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"address"}],"name":"userBuys","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"day","type":"uint256"}],"name":"createOnDay","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"freeze","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"keys","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"startTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"dailyTotals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"buy","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"openTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"EOS","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"today","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"eos","type":"address"}],"name":"initialize","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"createFirstDay","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"claimAll","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"timestamp","type":"uint256"}],"name":"dayFor","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"day","type":"uint256"},{"name":"limit","type":"uint256"}],"name":"buyWithLimit","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[],"name":"collect","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numberOfDays","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"key","type":"string"}],"name":"register","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"createPerDay","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"_numberOfDays","type":"uint256"},{"name":"_totalSupply","type":"uint128"},{"name":"_openTime","type":"uint256"},{"name":"_startTime","type":"uint256"},{"name":"_foundersAllocation","type":"uint128"},{"name":"_foundersKey","type":"string"}],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"window","type":"uint256"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"LogBuy","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"window","type":"uint256"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"LogClaim","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"key","type":"string"}],"name":"LogRegister","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"LogCollect","type":"event"},{"anonymous":false,"inputs":[],"name":"LogFreeze","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"}] // should NOT be a string or will throw error in web3js/contracts.js
let webThree = new Web3

module.exports = {

  sendEth2EosContract: async function (web3, value) {
    return createRawTx(eosContractAddress, value, web3)
      .then(txInstance => {
        const tx = txInstance
        console.log('======= tx =======', tx)
        // console.log('======= tx.from =======', tx.from()) // doesnt help
        const txSignedSerialized = createSignedSerializedTx(tx, privateKey)
        // console.log('======= txSignedSerialized =======', txSignedSerialized)
        const txSignedSerializedHex = txSignedSerialized.toString('hex')
        // console.log('======= txSignedSerializedHx =======', txSignedSerializedHex)

        //web3.eth.getBalance(process.env.address)
        //  .then(console.log); // shows plenty of wei

        web3.eth.sendSignedTransaction('0x' + txSignedSerializedHex)
          .then((err, result) => {
            console.log('======= err    =======\n', JSON.stringify(err,null,4))
            console.log('======= result =======\n', JSON.stringify(result,null,4))
            console.log('\n========= COMPLETE ==========\n')
          })

          // says (receipt) https://github.com/ethereum/web3.js/issues/1134
          // says (err,result) https://ethereum.stackexchange.com/questions/33473/web3-sendsignedtransaction-transaction-cost
          // says .on('receipt', console.log); not useful? https://web3js.readthedocs.io/en/1.0/web3-eth.html#sendsignedtransaction 

          // > // see eth.getTransactionReceipt() for details
        
        // return web3.eth.sendRawTransaction(`0x${txSignedSerializedHex}`, function(err, txHash) { 
        //   if (!err) {
        //     console.log('==== transaction hash ==== \n', JSON.stringify(txHash,null,4)); // "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385"
        //     // web3.eth.getTransaction(hash) to verify
        //   } else { console.log('err sendRawTransaction \n', JSON.stringify(err,null,4))}
        // });
      })
  },
  
  claimEos: function (web3) {
    const eosContractInstance = new web3.eth.Contract(eosContractABI, eosContractAddress);
  },
  sendEosToExchange: function () {
    // exchange api - send eos to exchange
    // exchange api - exchange eos for eth
    // exchange api - send eth back to default account address
    // log details on what fees/money was made
  }
}

var createRawTx = function (eosContractAddress, value, web3) {
  // Make web3 calls to get data for Raw Transaction object tx
  let gasPrice, txCount, gasLimit;
  
  // *TODO* Implement Promise.All

  return web3.eth.getGasPrice()
    .then(result => { 
      gasPrice = result // 20000000000      
      logGasPriceInEther(gasPrice, web3)

      return web3.eth.getTransactionCount(process.env.address) // getTransactionCountAsync
    })
    .then(result => {
      txCount = result
      return web3.eth.getBlock("latest")
    })
    .then(block => {
      gasLimit = block.gasLimit

      const recipient = process.env.testWallet
      
      // Calculate the ether we want to send, into wei
      const wei = logWeiAmountBeingSent(value, web3)
      const rawTx = {
        nonce: hex(txCount),
        gasPrice : hex(gasPrice), 
        gasLimit: hex(gasLimit),
        to: recipient, // for testing send to Account Address, for prod send to Contract Address:eosContractAddress,
        value: hex(wei),
        chainId: chain
        // data:""
      }
      
      logRawTxInputsAndHexes({nonce: txCount,gasPrice,gasLimit, to: recipient,value,chain, data: ""}, rawTx)

      return new EthTx(rawTx) // Transaction: { raw: [  <Buffer >], _fields: ['nonce',]}  
    })
}

var createSignedSerializedTx = function (tx, pKey) {
  const privateKeyX = Buffer.from(pKey, 'hex') // toString() // new Buffer(pKey, 'hex')
  
  // *TODO*
  //console.log('from: AccountAddress (produce from web3. privateKey):', process.env.address)
  
  tx.sign(privateKeyX)
  const txSerialized = tx.serialize()
  //console.log('txSerialized\n', txSerialized) // <Buffer f8 89 80 86 09 18 4e 7 ... >
  return txSerialized
}

var hex = function (gasPrice) {
  return webThree.utils.toHex(gasPrice)
}
// TODO - make a single method that will first check if their are new EOS tokens to claim, and then run claimAll and exchange workflow
// and if no new EOS token available, then send eth to EOS Crowdsale

var logWeiAmountBeingSent = function (value, web3) {
  const weiCalculated = web3.utils.toWei(value.toString(),'ether') // value 0.003 ether is 3000000000000000 wei
  console.log('weiCalculated being sent    ', weiCalculated)
  const weiEtherConverter = 3000000000000000 // https://etherconverter.online/ .003 ether is 3000000000000000 wei
  console.log('weiEtherConverter being sent', weiEtherConverter)
  return weiCalculated
}
var logGasPriceInEther = function (gasPrice, web3) {
  const s1 = gasPrice * 21000
  const totalEther = web3.utils.fromWei(s1.toString(), "ether")
  console.log('totalEther for gasPrice         ', totalEther)
  s2 = 20
  s3 = web3.utils.toWei(s2.toString(), "gwei") * 21000
  const totalEtherFromVideo = web3.utils.fromWei(s3.toString(), "ether")
  console.log('totalEtherFromVideo for gasPrice', totalEtherFromVideo)
}

var logRawTxInputsAndHexes = function (inputs, rawTx) {
  console.log('===== Raw Transaction Inputs =====\n', inputs)
  console.log('===== Raw Transaction        =======\n', rawTx)
}