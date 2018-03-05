require('dotenv').config()
const ethNodes = require('./eth-nodes')
const scripts = require('./scripts')
const Web3 = require('web3')

// WEB3 CONFIG - Web3 1.0 Docs http://web3js.readthedocs.io/en/1.0/index.html // don't confuse with v0.2's which is what most search results give yo
// Ether node for our web3 to connect to
const node = ethNodes[process.argv[4]] || ethNodes.myEtherWallet
let web3 = new Web3(new Web3.providers.HttpProvider(node))

// Run script that was passed as commandLine parameter
if (!process.argv[2]) throw 'Must pass name of script as argument'
const scriptName = process.argv[2]
scripts[scriptName](web3, 10000000) // process.argv[3])


// NOTES and alternative code
// web3 = new Web3(new Web3.providers.HttpProvider(gethLocal));
// web3.setProvider(new web3.providers.HttpProvider(myEtherWallet)); // https://www.myetherapi.com/