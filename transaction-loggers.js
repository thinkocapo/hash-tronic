import webThree from 'web3'

module.exports = {
    gasPriceInEther: function (gasPrice) {
        const s1 = gasPrice * 21000
        const totalEther = webThree.utils.fromWei(s1.toString(), "ether")
        console.log('totalEther for gasPrice         ', totalEther)
        const s2 = 20
        const s3 = webThree.utils.toWei(s2.toString(), "gwei") * 21000
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