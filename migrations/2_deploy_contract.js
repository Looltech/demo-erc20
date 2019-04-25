//import
var ERC20 = artifacts.require('ERC20')

module.exports = function(deployer) {
  //deploy
  deployer.deploy(ERC20, 1000)
}
