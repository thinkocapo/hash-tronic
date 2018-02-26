module.exports = {
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
    
    // erroing i think...try promise-chain.
    //web3.eth.getBalance("0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8").toString();


    // https://github.com/trufflesuite/truffle/issues/492 // Unhandled rejection Error: Invalid JSON RPC response: ""

    // 1 confirm its on 8545
    // 2 confirm this url:port is good 'http://65.79.136.27:8545'
    // 3 pass --rpc flag
    // 4 see if was any activity from 2:45a - 3:15a EST 02/26/18

    web3.eth.getBlock(5000000)
      .then((err, res) => { // err
        console.log('\n ======= err =====\n', err);
        console.log('\n ======= res =====\n', res);
      })

    // ERROR also won't run... Error: Invalid JSON RPC response: "<!DOCTYPE HTML PUBLIC \"-//W3C//D
    // web3.eth.getBlock(48, function(error, result){
    //   if(!error)
    //       console.log(JSON.stringify(result));
    //   else
    //       console.error(error);
    // })

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
  
      //Result
      //checkout latest transactions below, it might take a second to load as it is waiting for incoming txs
  },
  myFunc () {}
}

