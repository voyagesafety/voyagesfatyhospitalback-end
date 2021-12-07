const Web3 = require('web3');
const HDWalletProvider = require("@truffle/hdwallet-provider");
const constants = require('./constant');
const infuraNode = constants.infuraNode;
const centralMnemonic = constants.mnemonic;
const ABI = require("./blockchain_contract/build/contracts/Vacination.json")

const HRWeb3Provider = () => {
    
    const mnemonic = centralMnemonic;
    const provider = new HDWalletProvider(mnemonic, infuraNode);
    const web3 = new Web3(provider);
    var vaccinationAddress = "0x1B20e47E405634b9f04E2FE9E5621fFEA177f2dc";
    var vaccination = new web3.eth.Contract(ABI.abi, vaccinationAddress);
    return {web3:web3,vaccination:vaccination};
}

const RegistrarWeb3Provider = (mnemonic) => {
    
    const provider = new HDWalletProvider(mnemonic, infuraNode);
    const web3 = new Web3(provider);
    var vaccinationAddress = "0x1B20e47E405634b9f04E2FE9E5621fFEA177f2dc";
    var vaccination = new web3.eth.Contract(ABI.abi, vaccinationAddress);
    return {web3:web3,vaccination:vaccination};
}


module.exports = { HRWeb3Provider, RegistrarWeb3Provider};
