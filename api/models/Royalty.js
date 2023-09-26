module.exports = {

  attributes: {
    minter:{
      model: 'User',
    },
    toUser:{
      model: 'User',
    },
    fromUser:{
      model: 'User',
    },
    fromAddress: {
      type: 'string',
    },
    toAddress: {
      type: 'string',
    },
    nft:{
      model: 'Nft',
    },
    royalty:{
      type : 'string',
    },
    marketplace:{
      model: 'Marketplace'
    },
    status:{
      type: 'string',
      isIn: ['PENDING', 'FAIL', 'SUCCESS'],
      defaultsTo: 'PENDING'
    },
    chainId:{
      type: 'number'
    },
    auction:{
      type:'string',
    },
    hash:{
      type:'string'
    }


    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};