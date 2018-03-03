const TX = require('ethereumjs-tx')
// https://github.com/ethereumjs/ethereumjs-tx/blob/master/examples/transactions.js
// https://github.com/SilentCicero/ethereumjs-accounts
// sendTransaction vs sendRawTransaction
// estimateGas()

// *
// https://tokenmarket.net/blog/creating-offline-ethereum-transactions-in-javascript/


const eosContractAddress = '0xd0a6E6C54DbC68Db5db3A091B171A77407Ff7ccf'
const eosContractABI = [{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"address"}],"name":"claimed","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"time","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint128"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"foundersAllocation","outputs":[{"name":"","type":"uint128"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"day","type":"uint256"}],"name":"claim","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"foundersKey","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"address"}],"name":"userBuys","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"day","type":"uint256"}],"name":"createOnDay","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"freeze","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"keys","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"startTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"dailyTotals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"buy","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"openTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"EOS","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"today","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"eos","type":"address"}],"name":"initialize","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"createFirstDay","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"claimAll","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"timestamp","type":"uint256"}],"name":"dayFor","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"day","type":"uint256"},{"name":"limit","type":"uint256"}],"name":"buyWithLimit","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[],"name":"collect","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numberOfDays","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"key","type":"string"}],"name":"register","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"createPerDay","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"_numberOfDays","type":"uint256"},{"name":"_totalSupply","type":"uint128"},{"name":"_openTime","type":"uint256"},{"name":"_startTime","type":"uint256"},{"name":"_foundersAllocation","type":"uint128"},{"name":"_foundersKey","type":"string"}],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"window","type":"uint256"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"LogBuy","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"window","type":"uint256"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"LogClaim","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"key","type":"string"}],"name":"LogRegister","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"LogCollect","type":"event"},{"anonymous":false,"inputs":[],"name":"LogFreeze","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"}] // should NOT be a string or will throw error in web3js/contracts.js
const gasLimit = 90000

const input = fs.readFileSync('Token.sol');
const output = solc.compile(input.toString(), 1);
const bytecode = output.contracts['Token'].bytecode;

var createByteCodeForContract = function (contract) {
  const input = fs.readFileSync(`${contract}.sol`); // .sol files - put all 3 at same level, of directory
  const output = solc.compile(input.toString(), 1);
  const bytecode = output.contracts['Token'].bytecode;
  return bytcode
}

var createTxObject = function (eosContractAddress, value) {
  const bytcode = null // bytcode of compiled contract https://ethereum.stackexchange.com/questions/25839/how-to-make-transactions-using-private-key-in-web3
  const rawTx = {
    nonce: "", // GOOD try eth.getTransactionCount(<account>) // https://github.com/trufflesuite/ganache-cli/issues/344 
    // maybe this is only for smart contract deployment??
    data: createByteCodeForContract('eos_sale.sol'), //TRY? - need generate bytcode of the contract (or method?) i think EOS Contract '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // get the bytcode https://gist.github.com/tomconte/4edb83cf505f1e7faf172b9252fff9bf is the contract bytcode?? A. var bytecode = Bytecode of compiled contract https://ethereum.stackexchange.com/questions/25839/how-to-make-transactions-using-private-key-in-web3
    // ^^ says try Remix browser, but still, how many contracts? // https://ethereum.stackexchange.com/questions/27096/how-do-i-get-bytecode-of-the-contract-to-deploy
    // also, tries contract data like this:
    // Get contract data
    // const contractData = contract.new.getData({
    //   data: '0x' + bytecode
    // });

    // how to find current gas price
    // const gasPrice = web3.eth.gasPrice; // price is in GWEI ?
    // const gasPriceHex = web3.toHex(gasPrice);
    // const gasLimitHex = web3.toHex(300000);
    gasPrice: '0x09184e72a000', // TRY gasPriceHex 100  price is in GWEI ?
    gasLimit: '0x2710', // TRY gasLimitHex         1000 https://ethereum.stackexchange.com/questions/25839/how-to-make-transactions-using-private-key-in-web3
    
    to: eosContractAddress,
    value: '0x00', // GOOD try web3.toHex(web3.toWei(value, "ether")); - value comes from process.argv[] vs geth console might allow amount = web3.toWei(0.01, "ether")
    gas: null // - based on the data/bytcode size https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethsendrawtransaction
    // https://www.reddit.com/r/ethdev/comments/71rhzs/05_eth_bounty_help_needed_for_sending_raw/
  }
  return new TX(rawTx) // Transaction: { raw: [  <Buffer >], _fields: ['nonce',]}  
}
// chainId: 1, - might be a default, EIP 155 chainId - mainnet: 1, ropsten: 3
// gas: feeCost, - seems like mostly gasLimit and gasPrice

var signTxByPrivateKey = function (tx, pKey) {
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
    const tx = createTxObject(eosContractAddress, 10000000)
    const txSerialized = signTransactionByPrivateKey(tx, process.env.PK) // makes it so funds are coming from the account address for that private key?
    
    return web3.eth.sendRawTransaction('0x' + txSerialized.toString('hex'), function(err, hash) { if (!err) {
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
    // console.log('\n === eosContractInstance.methods.claimAll === \n', eosContractInstance.methods); // 'function () { [native code] }'
  },

  // STEP 3
  sendEosToExchange: function () {
    // exchange api - send eos to exchange
    // exchange api - exchange eos for eth
    // exchange api - send eth back to default account address
    // log details on what fees/money was made
  }
}

