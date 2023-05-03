/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const marketContract = "0x0477eb1Cd95A95e08B2dA55Fb0537f8e3A027c62";

const marketABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "NAME",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "SYMBOL",
        "type": "string"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_totalNft",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "msg",
        "type": "string"
      }
    ],
    "name": "BatchMint",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_NftId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "msg",
        "type": "string"
      }
    ],
    "name": "Minted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "_tokenURIs",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "maximumRoyalty",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "mintedByUser",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "minter",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "royalty",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_TokenURI",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_royaltyPercentage",
        "type": "uint256"
      }
    ],
    "name": "_mintNft",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "_uri",
        "type": "string[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_royalty",
        "type": "uint256[]"
      }
    ],
    "name": "batchMint",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "royaltyForToken",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "percentage",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "minterOfToken",
    "outputs": [
      {
        "internalType": "address",
        "name": "_minter",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getTokenCounter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "tracker",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_royalty",
        "type": "uint256"
      }
    ],
    "name": "setMaxRoyalty",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getNFTMintedByUser",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "ids",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
]
var Web3 = require('web3');
var web3 = new Web3('http://localhost:7545');
var contract = new web3.eth.Contract(marketABI, marketContract);

module.exports = {
  nft: async (req, res) => {
    const userData = await User.findOne({ id: req.payload?.id });
    const userWallet = await Wallet.findOne({ id: userData.wallet });
    let result=[];
    const keysNFT = await contract.methods.getNFTMintedByUser(userWallet.address).call();
     await keysNFT.forEach(async(item) => {

        await contract.methods.tokenURI(item).call().then(key => {
          if (keysNFT.length >=result.length) {
            console.log(key);
            result.push({uri:key,tokenId:item});

          }
          if(keysNFT.length ==result.length) {
            res.status(200).json(result);
            console.log("result =====> ",result);
          }
        });
      });



    // await Nft.find({ user: req.payload.id }).populateAll().then(result => {
    //   res.status(200).json(result);
    // });
  },
  profile: async (req, res) => {
    await User.findOne({ id: req.payload.id })
      .populateAll()
      .then(async (result) => {
        const kyc = await Kyc.findOne({user: req.payload.id});
        const createdCount = await Nft.count({user:req.payload.id, minter: req.payload.id, minted: false});
        const collectedCount = await Nft.count({user: req.payload.id, minted: true});
        const ticketCount = await Dispute.count({user: req.payload.id});
        const userWishlist = await User.findOne({ id: req.payload.id }).populate('wishlist');
        const wishlistCount = userWishlist.wishlist && userWishlist.wishlist.length > 0 ? userWishlist.wishlist.length : 0; 
        result.kyc = kyc;
        result.createdCount = createdCount;
        result.collectedCount = collectedCount;
        result.ticketCount = ticketCount;
        result.favCount = wishlistCount;
        res.status(200).json(result);
      });
  },
  updateProfile: async (req, res) => {
    const { firstName, lastName, contact } = req.body;
    let { socialLinks } = req.body;
    try{
      socialLinks = JSON.parse(socialLinks);
    } catch (err){
      socialLinks = null;
    }
    req.file('avatar').upload({
      dirname: require('path').resolve(sails.config.appPath, 'uploads')
    },async (error, uploadedFile) => {
      if(error) {
        return res.badRequest(error);
      }
      let filename = '';
      let media = {};
      if(uploadedFile.length > 0){
        media = await Media.create({
          fd: uploadedFile[0].fd,
          size: uploadedFile[0].size,
          type: uploadedFile[0].type,
          filename: uploadedFile[0].filename,
          status: uploadedFile[0].status,
          field: uploadedFile[0].field,
          extra: uploadedFile[0].extra,
        }).fetch();
        const file = uploadedFile[0].fd;
        filename = file.replace(/^.*[\\\/]/, '');
      }
      const user = await User.findOne({id:req.payload.id});
      const userDetails = {
        avatar: media.id || user.avatar,
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        contact: contact || user.contact,
        socialLinks: socialLinks || user.socialLinks
      };
      const updatedUser = await User.update({id:req.payload.id},userDetails).fetch();
      res.status(200).json(updatedUser);
    });
  },
  getUserProfile: async (req, res) => {
    const {id} = req.query;
    User.findOne({id})
      .populate('wallet')
      .then(async result => {
        result.address = result.wallet.address
        const createdCount = await Nft.count({user:id, minter: id, minted: false});
        const collectedCount = await Nft.count({user: id, minted: true});
        result.createdCount = createdCount;
        result.collectedCount = collectedCount;
        delete result.wallet
        res.ok(result)
      }).catch(e => {
        res.badRequest(e)
      })
  },
  changePassword : async (req, res) => {
    try{
      const { oldPassword, newPassword } = req.body;
      const user = await User.findOne({id:req.payload.id});
      if(user){
        if(user.password === oldPassword){
          await User.update({id:req.payload.id},{password:newPassword}).fetch();
          res.ok();
        } else {
          res.badRequest("Old Password is not correct");
        }
      } else{
        res.badRequest("Something went wrong");
      }
    } catch(err) {
      return res.badRequest("Something went wrong");
    }
  },
  getUserAddress: (req, res) => {
    const {user} = req.query;
    Wallet.findOne({
      where: {user},
      select: ['address']
    }).then(wallet => {
      res.ok(wallet)
    }).catch(e => res.badRequest(e));
  }
};

