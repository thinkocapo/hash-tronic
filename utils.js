import webThree from 'web3'
import ethJsTx from 'ethereumjs-tx'
const LOG = require('./transaction-loggers')

/**
 * Note - Most values are hex's of the actual value
 * {"nonce":"0x10", // # historical transactions by sender address
 * "gasPrice":"0x04e3b29200", // 21000 ? etermined by the x latest blocks median gas price. 20gwei or 20000000000 // recently 9 000 000 000
 * "gasLimit":"0x5208", // # formerly 21000 to send on MEW or 300000 here // "amount of gas you pay is fixed, but the quantity of ethere it costs for that is not fixed (it varies)" // wont necessarily use all of this limit? e.g. if set a super high limit...
 * "to":"0x1eec5a83f78d3952fe86747034a7514f2dc9925c", // address of recipient
 * "value":"0x2386f26fc10000", // eventually // eventually hex(web3.utils.toWei(value.toString(),'ether'))
 * "data":"", // only for deploying smart contract
 * "chainId":1}
 */
// Make web3 calls to get data for Raw Transaction object tx
export function createRawTransaction (web3, ether, recipient) {
    let gasPrice, txCount, gasLimit;
    // SYNCHRONOUS v0.2 format
    


    // ASYNCHRONOUS v1 format
    return Promise.all([web3.eth.getGasPrice(), web3.eth.getTransactionCount(process.env.fromAddress), web3.eth.getBlock('latest')])
        .then(results => {
            gasPrice = results[0]
            txCount = results[1]
            gasLimit = results[2].gasLimit
            const wei = LOG.weiAmountBeingSent(ether)

            const rawTx = {
                nonce: hex(txCount),
                gas: web3.utils.toHex("21000"),
                gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
                to: recipient,
                value: hex(wei)
            }
            
            LOG.gasPriceInEther(gasPrice)      
            LOG.rawTxData({nonce: txCount, gasPrice, gasLimit, to: recipient, value: ether, chainId: process.env.chainId, data: ""}, rawTx)
    
            return new ethJsTx(rawTx) // Transaction: { raw: [<Buffer >], _fields: ['nonce',]}  
        })
}

export function createSignedSerializedTransaction (transaction, pKey) {
    // TODO - generate address from privateKey and make sure it matches what's in process.env.address or else wrong nonce might get used
    const privateKey = Buffer.from(pKey, 'hex')
    transaction.sign(privateKey)
    const txSerialized = transaction.serialize() // <Buffer f8 ...>
    return txSerialized
}

function hex (gasPrice) {
    return webThree.utils.toHex(gasPrice)
}