const ethNodeProviders = require('./eth-node-providers')
const gethLocal = ethNodeProviders.gethLocal
const myEtherWallet = ethNodeProviders.myEtherWallet
const chicagoGeth = ethNodeProviders.chicagoGeth

const Web3 = require('web3')
let web3
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // web3 = new Web3(new Web3.providers.HttpProvider(gethLocal));
    console.log('chi town', chicagoGeth)
    web3 = new Web3(new Web3.providers.HttpProvider(chicagoGeth))
    // web3.setProvider(new web3.providers.HttpProvider(myEtherWallet)); // https://www.myetherapi.com/
}

const web3Scripts = require('./web3-scripts')
// console.log('\filterWatches', web3Scripts.filterWatches)
// console.log('process.argv[1]', process.argv[1])
// await web3Scripts[process.argv[1]](web3)
const sendRawTxTest = web3Scripts.sendRawTxTest
const filterWatches = web3Scripts.filterWatches // getBlock(5000000)...
filterWatches(web3)