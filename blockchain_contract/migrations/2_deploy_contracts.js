const Vacination = artifacts.require('Vacination');

module.exports = function (deployer) {
  deployer.deploy(Vacination);
};
