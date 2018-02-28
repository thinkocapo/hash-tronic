require('dotenv').config()
const ethNodes = require('./eth-nodes')
const web3Scripts = require('./web3-scripts')

// WEB3 CONFIG
const Web3 = require('web3')
let web3
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider(ethNodes.myEtherWallet))
}

// Run script that was passed as commandLine parameter
if (!process.argv[2]) throw 'Must pass name of script as argument'
const scriptName = process.argv[2]
web3Scripts[scriptName](web3)


// NOTES and alternative code
// web3 = new Web3(new Web3.providers.HttpProvider(gethLocal));
// web3.setProvider(new web3.providers.HttpProvider(myEtherWallet)); // https://www.myetherapi.com/