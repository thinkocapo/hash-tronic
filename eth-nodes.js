module.exports = {
    gethLocal: 'http://localhost:8545',
    myEtherWallet: 'https://api.myetherapi.com/eth',
    // 8545 is standard port that geth runs on, see gethLocal ^^
    // chicagoGeth: 'http:65.79.136.27:8545' // Unhandled rejection Error: Invalid JSON RPC response: ""
     lincolnPark: 'http:65.79.136.27:30303' // Unhandled rejection Error: Invalid JSON RPC response: ""
    // chicagoGeth: 'http://65.79.136.27:8545', // no error and no response either // correct URL format https://stackoverflow.com/questions/6940120/how-to-pass-ip-address-and-portnumber-as-url
    //chicagoGeth: 'http://65.79.136.27:30303' // Unhandled rejection Error: Invalid JSON RPC response: ""
    // chicagoGeth: '65.79.136.27:1988' // ssh port
    

    // 30303
}

// correct format 

// https://github.com/ethereum/go-ethereum/issues/2982
// https://github.com/ethereum/wiki/wiki/JSON-RPC#go

// https://ethereum.stackexchange.com/questions/3163/how-can-i-expose-geths-rpc-server-to-external-connections


// **
// geth --rpc --rpccorsdomain "http://localhost:3000"
// geth --rpc --rpccorsdomain "http://190.157.85.51:?" // My IP Address