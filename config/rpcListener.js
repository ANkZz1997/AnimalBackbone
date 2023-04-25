module.exports.rpcListener = async () => {
  sails.log.info("Initiating RPC Event Listner");
  sails.log.info("Fetching Networks");
  Network.find().then(result => {
    result.forEach(network => {
      sails.helpers.rpcListener(network).then(response => {
        sails.log.info("listener started for chain: " + network.chainId)
      });
    })
  })
}
