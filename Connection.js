const Web3 = require('web3');
const HDWalletProvider = require("@truffle/hdwallet-provider");
const infuraNode = "https://rinkeby.infura.io/v3/ae0c4db814424f40a171abaad255481c";
const centralMnemonic = "verb dentist ranch lounge virtual code scrap fruit risk exchange fame divide";
const ABI = require("./blockchain_contract/build/contracts/Vacination.json")

const HRWeb3Provider = () => {
    
    const mnemonic = centralMnemonic;
    const provider = new HDWalletProvider(mnemonic, infuraNode);
    const web3 = new Web3(provider);
    var transcriptAddr = "0x587242F624EDC8e39Ac4D0ED2e2D4bD1Dd926E72";
    var transcript = new web3.eth.Contract(ABI.abi, transcriptAddr);
    return {web3:web3,transcript:transcript};
}

const RegistrarWeb3Provider = (mnemonic) => {
    
    const provider = new HDWalletProvider(mnemonic, infuraNode);
    const web3 = new Web3(provider);
    var transcriptAddr = "0x587242F624EDC8e39Ac4D0ED2e2D4bD1Dd926E72";
    var transcript = new web3.eth.Contract(ABI.abi, transcriptAddr);
    return {web3:web3,transcript:transcript};
}


module.exports = { HRWeb3Provider, RegistrarWeb3Provider};
