const Web3 = require('web3');
const HDWalletProvider = require("@truffle/hdwallet-provider");
const infuraNode = "wss://rinkeby.infura.io/ws/v3/ae0c4db814424f40a171abaad255481c";
const centralMnemonic = "verb dentist ranch lounge virtual code scrap fruit risk exchange fame divide";
const ABI = require("./blockchain_contract/build/contracts/Vacination.json")

const HRWeb3Provider = () => {
    
    const mnemonic = centralMnemonic;
    const provider = new HDWalletProvider(mnemonic, infuraNode);
    const web3 = new Web3(provider);
    var vaccinationAddress = "0x587242F624EDC8e39Ac4D0ED2e2D4bD1Dd926E72";
    var vaccination = new web3.eth.Contract(ABI.abi, vaccinationAddress);
    return {web3:web3,vaccination:vaccination};
}

const RegistrarWeb3Provider = (mnemonic) => {
    
    const provider = new HDWalletProvider(mnemonic, infuraNode);
    const web3 = new Web3(provider);
    var vaccinationAddress = "0x587242F624EDC8e39Ac4D0ED2e2D4bD1Dd926E72";
    var vaccination = new web3.eth.Contract(ABI.abi, vaccinationAddress);
    return {web3:web3,vaccination:vaccination};
}


module.exports = { HRWeb3Provider, RegistrarWeb3Provider};
