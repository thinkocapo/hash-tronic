const webThree = require('web3')

module.exports = {
    gasPriceInEther: function (gasPrice) {
        const s1 = gasPrice * 21000
        const totalEther = webThree.utils.fromWei(s1.toString(), "ether")
        console.log('totalEther for gasPrice         ', totalEther)
        s2 = 20
        s3 = webThree.utils.toWei(s2.toString(), "gwei") * 21000
        const totalEtherFromVideo = webThree.utils.fromWei(s3.toString(), "ether")
        console.log('totalEtherFromVideo for gasPrice', totalEtherFromVideo)
    },
    rawTxData: function (inputs, rawTx) {
        console.log('===== Raw Transaction Inputs =====\n', inputs)
        console.log('===== Raw Transaction        =======\n', rawTx)
    },
    weiAmountBeingSent: function (ether) {
        const value = ether
        const weiCalculated = webThree.utils.toWei(value.toString(),'ether') // value 0.003 ether is 3000000000000000 wei
        console.log('weiCalculated being sent    ', weiCalculated)
        const weiEtherConverter = 3000000000000000 // https://etherconverter.online/ .003 ether is 3000000000000000 wei
        console.log('weiEtherConverter being sent', weiEtherConverter)
        return weiCalculated
    }
}

// var LOG_weiAmountBeingSent = function (ether, web3) {
//     const value = ether
//     const weiCalculated = web3.utils.toWei(value.toString(),'ether') // value 0.003 ether is 3000000000000000 wei
//     console.log('weiCalculated being sent    ', weiCalculated)
//     const weiEtherConverter = 3000000000000000 // https://etherconverter.online/ .003 ether is 3000000000000000 wei
//     console.log('weiEtherConverter being sent', weiEtherConverter)
//     return weiCalculated
// }
// var LOG_gasPriceInEther = function (gasPrice, web3) {
//     const s1 = gasPrice * 21000
//     const totalEther = web3.utils.fromWei(s1.toString(), "ether")
//     console.log('totalEther for gasPrice         ', totalEther)
//     s2 = 20
//     s3 = web3.utils.toWei(s2.toString(), "gwei") * 21000
//     const totalEtherFromVideo = web3.utils.fromWei(s3.toString(), "ether")
//     console.log('totalEtherFromVideo for gasPrice', totalEtherFromVideo)
// }
// var LOG_rawTxData = function (inputs, rawTx) {
//     console.log('===== Raw Transaction Inputs =====\n', inputs)
//     console.log('===== Raw Transaction        =======\n', rawTx)
// }