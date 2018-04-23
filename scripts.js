import Web3 from 'web3'
import { createRawTransaction, createSignedSerializedTransaction, hex } from './utils'
// web3.eth.getTransaction(transactionHash [, callback])
// web3.eth.getTransactionReceipt(hash [, callback])


export async function sendEther (web3, ether, recipient) {
  const rawTransaction = await createRawTransaction(web3, ether, recipient)
  const transactionSignedSerialized = createSignedSerializedTransaction(rawTransaction, process.env.privateKey)

  console.log('\n=== EARLY RETURN - DONE - DO NOT RUN web3.eth.sendRawTransaction ===')
  
  // Remove once you've confirmed everything in the loggers looks good
  return 
  
  // 4/22 sendRawTransaction hasn't been tested yet - in v1.0 it was sendSignedTransaction, which was successfully tested
  web3.eth.sendRawTransaction('0x' + transactionSignedSerialized.toString('hex'))
    .then((err, result) => {
      if (err) { console.log('======= err =======\n', JSON.stringify(err,null,4))
      } else { 
        console.log('======= result =======\n', JSON.stringify(result,null,4))
      }
    })
}