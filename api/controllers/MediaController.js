/**
 * MediaController
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
const fs = require('fs');
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK('3b96933e4292f6aedad8',
  'a8f68ea2894fd5046c4d3bcba027d1050faa1dea9edeaf23c197584823ec70b0');

module.exports = {
  download: (req, res) => {
    const {mediaId} = req.params;
    if(!mediaId ) {
      sails.log.info('media id not found, returning default image')
      return fs.createReadStream(`./assets/images/ph.png`).pipe(res);
    }
    Media.findOne({id: mediaId}).then(result => {
      if(result) {
        const imagePartials = result.fd.split('/uploads/');
        fs.open(`./uploads/${imagePartials[1]}`,'r',(err,fd)=>{
          if(err) {
            sails.log.error('There is an issue while reading the file');
            sails.log.error(err);
            return fs.createReadStream(`./assets/images/ph.png`).pipe(res);
          }
          return fs.createReadStream(`./uploads/${imagePartials[1]}`).pipe(res);
        });
      } else {
        sails.log.info('media not found, returning default image')
        return fs.createReadStream(`./assets/images/ph.png`).pipe(res);
      }
    })
  },
  upload: (req, res) => {
    req.file('nft').upload({
      dirname: require('path').resolve(sails.config.appPath, 'uploads')
    }, (error, uploadedFile) => {
      if (error) return res.badRequest(error);
      console.log(uploadedFile[0].filename)
      saveImageInDB(uploadedFile, (error, result) => {
        if (error) { return res.badRequest(e) }
        else return res.ok(result)
      });
    })
  },
  uploadToIPFS: async (req, res) => {
    const userData = await User.findOne({ id: req.payload?.id });
    const userWallet = await Wallet.findOne({ id: userData.wallet });
    await web3.eth.accounts.wallet.add(userWallet.privateKey);
    const data = req.body;
    data.attributes = JSON.parse(data.attributes);
    req.file('nft').upload({
      dirname: require('path').resolve(sails.config.appPath, 'uploads')
    }, (error, uploadedFile) => {
      saveImageInDB(uploadedFile, (error, result) => {
        if (error) return res.badRequest(error);
        const readableStreamForFile = fs.createReadStream(uploadedFile[0].fd);
        console.log(uploadedFile);
        let options = {
          pinataMetadata: { name: uploadedFile[0].filename },
          pinataOptions: { cidVersion: 0 }
        };
        pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
          console.log(result);
          data.image = "https://gateway.pinata.cloud/ipfs/" + result.IpfsHash;
          options = {
            pinataMetadata: { name: `${data.name}.json` },
            pinataOptions: { cidVersion: 0 },
          };
          pinata.pinJSONToIPFS(data, options).then(_result => {
            contract.methods._mintNft(userWallet.address, "https://gateway.pinata.cloud/ipfs/" + _result.IpfsHash, data.royalty).send({ from: userWallet.address, gas: 4712388, gasPrice: 100000000000 })
              .then(function (receipt) {
                console.log("********************************");
                console.log("this is the receipt ======>", receipt)
                console.log("********************************");
                // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
              }).catch(err => {
                console.log("this is the err ======>", err)

              });

            data.metaData = "https://gateway.pinata.cloud/ipfs/" + _result.IpfsHash;
            data.user = req.payload?.id;
            Nft.create(data).fetch().then(result => {
              console.log(data);
              return res.ok(result)
            }).catch(e => {
              res.badRequest(e)
            })
          }).catch(err => {
            console.log(err);
            res.badRequest(err)
          })
        }).catch((err) => {
          console.log(err);
          res.badRequest(err)
        });
      })
    });
  }
};
const saveImageInDB = (uploadedFile, cb) => {
  Media.create({
    fd: uploadedFile[0].fd,
    size: uploadedFile[0].size,
    type: uploadedFile[0].type,
    filename: uploadedFile[0].filename,
    status: uploadedFile[0].status,
    field: uploadedFile[0].field,
    extra: uploadedFile[0].extra,
  }).fetch().then(result => {
    cb(null, result)
  }).catch(e => {
    cb(e);
  })
}

