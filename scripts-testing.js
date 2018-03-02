module.exports = {
    getBalance: async function (web3) {
        // erroing i think...try promise-chain.
        // const bal = 
        // web3.eth.getBalance("0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8")
        web3.eth.getBalance("0x7602aCd0a747332Ce638a0b9f6d7532767303C8F")
          .then((res, err) => {
            console.log('\n ======= err =====\n', err);
            console.log('\n ======= res =====\n', res) // .toString(10));
            const wei = res
            // but if you paste the Wei into ether using https://etherconverter.online/
            // 02/27/18 below line fails...
            // then you can see its the right amount of ether 
            // const ether = web3.eth.fromWei(wei, 'ether')
            // console.log('\n ====== ether =====', ether)
          })
      },
      getBlock: async function (web3) {
        console.log('GET BLOCK\n')
        return web3.eth.getBlock(5100000)
          .then((res, err) => { // err
            console.log('\n ======= err =====\n', err);
            console.log('\n ======= res =====\n', res);
            return
          })
    
        // ERROR also won't run... Error: Invalid JSON RPC response: "<!DOCTYPE HTML PUBLIC \"-//W3C//D
        // web3.eth.getBlock(48, function(error, result){
        //   if(!error)
        //       console.log(JSON.stringify(result));
        //   else
        //       console.error(error);
        // })
      },
      sendRawTxTest: async function (web3) {
        /**
         * let transaction = { 'to': '0xF0109fC8DF283027b6285cc889F5aA624EaC1F55',
            'value': 1000000000,
            'gas': 2000000,
            'gasPrice': 234567897654321,
            'nonce': 0,
            'chainId': 1 }
    
            let signed = w3.eth.account.signTransaction(transaction, key)
            w3.eth.sendRawTransaction(signed.rawTransaction)
         */
      },
      filterWatches: async function (web3) {
        // ERROR web3.eth.filter is not a function... isn't there an newer syntax if you check the wiki doc?
        // var filter = web3.eth.filter('pending'); // .Filter
        // var filter = web3.eth.subscribe('pendingTransactions', function (err, res) {
        //   console.log('\n -- SUBSCRIBE err --\n', err) // current provider doesnt support subscriptions: HTTPProvider
        //   console.log('\n -- SUBSCRIBE res --\n', res)
        // });
    
        // filter.watch(function(error, result) {
        //   if (!error) {
        //     web3.eth.getTransaction(result, function(error, data) {
        //       if (!error) $("#newTxs tr:first").after(''+data.from+''+data.to+' '+web3.fromWei(data.value,'ether').toString()+' ETH ');
        //     });
        //   }
        // });
      
        //Result...
        //checkout latest transactions below, it might take a second to load as it is waiting for incoming txs
      }
}