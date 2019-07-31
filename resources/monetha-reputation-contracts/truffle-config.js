module.exports = {
  networks: {
    development: {
      // This is the IP address and port of Quorum node that we are going to use for contract deployment.
      // When running Quorum's "7 nodes" example locally, the first node's address is 127.0.0.1:22000
      host: '127.0.0.1',
      port: 22000,
      timeoutBlocks: 100,
      network_id: "*",
      // Set the gas price to 0 because all Quorum transactions must have 0 gas price.
      // You may get an error if this number is not 0.
      gasPrice: 0,
      // Set type to 'quorum'
      type: 'quorum',
    },
  },
};