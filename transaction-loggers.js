import webThree from 'web3'
const unit = require('ethjs-unit');

export function gasPriceInEther (gasPrice) {
    const s1 = gasPrice * 21000
    const totalEther = webThree.utils.fromWei(s1.toString(), "ether")
    console.log('# of ethere the gasPrice costs - web3   ', totalEther)
    const s2 = 20
    const s3 = webThree.utils.toWei(s2.toString(), "gwei") * 21000
    const totalEtherFromVideo = webThree.utils.fromWei(s3.toString(), "ether")
    console.log('# of ether the gasPrice costs - tutorial', totalEtherFromVideo)
}

export function rawTxData (inputs, rawTx) {
    console.log('Inputs to Raw Transaction\n', inputs)
    console.log('RAW TRANSACTION          \n', rawTx)
}

export function weiAmountBeingSent (ether) {
    const value = ether
    // console.log('wei - web3 PRE caluclation                  ')
    const weiCalculated = unit.toWei(value.toString(),'ether') // value 0.003 ether is 3000000000000000 wei // WORKS
    console.log('wei - web3 caluclation                  ', weiCalculated)
    const weiEtherConverter = 3000000000000000 // https://etherconverter.online/ .003 ether is 3000000000000000 wei
    console.log('wei - etherconverter.online calculation ', weiEtherConverter)
    return weiCalculated
}
