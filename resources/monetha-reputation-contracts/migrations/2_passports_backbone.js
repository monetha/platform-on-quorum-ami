// When the script is run by Truffle, it injects a global `artifacts` variable, which allows us to fetch
// contract objects used for deployment.
const PassportLogic = artifacts.require('PassportLogic');
const PassportLogicRegistry = artifacts.require('PassportLogicRegistry');
const PassportFactory = artifacts.require('PassportFactory');
// Because we want to use our passports with Quorum's private transactions, we need to
// deploy contracts using private transactions as well. For this, we need to have a list of Quorum
// nodes' public keys, which are allowed to use these contracts. Here are the public keys of the first three nodes from
// Quorum's "7 nodes" example (taken from examples/7nodes/keys/tm1.pub, tm2.pub, tm3.pub)
const participantNodes = [
  'BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo=',
  'QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc=',
  '1iTZde/ndBHvzhcl7V68x44Vx7pl8nwx9LqnM/AfJUg=',
];
module.exports = (deployer, _, accounts) => {
  // The `accounts` variable holds Ethereum addresses provided by the Truffle framework.
  // In a live application you should provide your own addresses by modifying `truffle-config.js` and adding a
  // provider, which would be able to import your accounts using private keys or mnemonics.
  // See this example at https://github.com/trufflesuite/truffle/tree/develop/packages/truffle-hdwallet-provider
  const ownerAddress = accounts[0];
  // `deployer` allows us to easily deploy contracts using the Quorum node specified in `truffle-config.js`.
  // Note the property `privateFor` - there we pass the public keys of Quorum nodes that will be able to access
  // these contracts, making the contracts private.
  deployer.deploy(PassportLogic, {
      from: ownerAddress,
      privateFor: participantNodes,
    })
    // PassportLogicRegistry takes the initial passport logic version (0.1) with the logic contract's address in the constructor.
    .then(() => deployer.deploy(PassportLogicRegistry, '0.1', PassportLogic.address, {
      from: ownerAddress,
      privateFor: participantNodes,
    }))
    // PassportFactory just takes the PassportLogicRegistry address so that it would know what
    // registry to assign to new passports.
    .then(() => deployer.deploy(PassportFactory, PassportLogicRegistry.address, {
      from: ownerAddress,
      privateFor: participantNodes,
    }));
}