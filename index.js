require('dotenv').config()
const ethNodes = require('./eth-nodes')
const scripts = require('./scripts')
const Web3 = require('web3')
// node to connect to
const node = ethNodes.myEtherWallet || ethNodes[process.argv[3]]

// WEB3 CONFIG
// if you don't pass httpProvider then it will not be connected to a geth instance
let web3Class = new Web3()
let web3 = new Web3(web3Class.providers.HttpProviders(node))

// Original
// if (typeof web3 !== 'undefined') {
//     web3 = new Web3(web3.currentProvider);
// } else {
//     web3 = new Web3(new Web3.providers.HttpProvider(ethNodes.myEtherWallet))
// }

// Run script that was passed as commandLine parameter
if (!process.argv[2]) throw 'Must pass name of script as argument'
const scriptName = process.argv[2]
scripts[scriptName](web3)


// NOTES and alternative code
// web3 = new Web3(new Web3.providers.HttpProvider(gethLocal));
// web3.setProvider(new web3.providers.HttpProvider(myEtherWallet)); // https://www.myetherapi.com/