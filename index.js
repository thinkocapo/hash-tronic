require("babel-register");
require("babel-polyfill");
require('dotenv').config()
const ethNodes = require('./ethereum-nodes')
const scripts = require('./scripts')
const Web3 = require('web3')

// NOTE - this should save you some headache when you're starting out with web3:
// Hash-tronic uses: web3 v1.0.0-beta.30 http://web3js.readthedocs.io/en/1.0/index.html
// not to be confused with: web3 v0.2x.x https://github.com/ethereum/wiki/wiki/JavaScript-API
// v0.2x.x methodology (syntax, methods) is what a lot of literature (stackoverflow, github) references
// some use v1.0.0 in production, many are still using v0.2x.x

// Configure the ether node we're connecting to. Set it on the web3 instance
const node = ethNodes[process.argv[4]] || ethNodes.myEtherWallet
let web3 = new Web3(new Web3.providers.HttpProvider(node))

if (!process.argv[2]) throw 'Must pass name of script as argument'

const scriptName = process.argv[2] || 'sendEther'
const ether = process.argv[3] || 0.003 // ~$2 USD
const recipient = process.argv[4] || process.env.recipientAddress

// Call the sendEther script
// npm start sendEther 0.003
scripts[scriptName](web3, ether, recipient)