module.exports = {
  abi:[
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "symbol",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "InvalidShortString",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "str",
          "type": "string"
        }
      ],
      "name": "StringTooLong",
      "type": "error"
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
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_fromTokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_toTokenId",
          "type": "uint256"
        }
      ],
      "name": "BatchMetadataUpdate",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "redeemer",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "bytes",
              "name": "signature",
              "type": "bytes"
            }
          ],
          "internalType": "struct Animal.NFTTransferVoucher",
          "name": "vouchera",
          "type": "tuple"
        }
      ],
      "name": "buy",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "EIP712DomainChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "MetadataUpdate",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "nftId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "nftCreator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "time",
          "type": "uint256"
        }
      ],
      "name": "Minted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "NFTPurchased",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "_minter",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "redeemer",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "minPrice",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "uri",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "royaltyPercentage",
              "type": "uint256"
            },
            {
              "internalType": "bytes",
              "name": "signature",
              "type": "bytes"
            }
          ],
          "internalType": "struct Animal.NFTVoucher",
          "name": "voucher",
          "type": "tuple"
        }
      ],
      "name": "redeem",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
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
          "internalType": "uint256",
          "name": "newPercent",
          "type": "uint256"
        }
      ],
      "name": "updateDefaultPlatformFeePercent",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdrawAllFunds",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdrawPlatformFees",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "minPrice",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "uri",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "royaltyPercentage",
              "type": "uint256"
            },
            {
              "internalType": "bytes",
              "name": "signature",
              "type": "bytes"
            }
          ],
          "internalType": "struct Animal.NFTVoucher",
          "name": "voucher",
          "type": "tuple"
        }
      ],
      "name": "_verify",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "bytes",
              "name": "signature",
              "type": "bytes"
            }
          ],
          "internalType": "struct Animal.NFTTransferVoucher",
          "name": "vouchera",
          "type": "tuple"
        }
      ],
      "name": "_verifyTransferVoucher",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
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
      "type": "function"
    },
    {
      "inputs": [],
      "name": "defaultPlatformFeePercent",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "eip712Domain",
      "outputs": [
        {
          "internalType": "bytes1",
          "name": "fields",
          "type": "bytes1"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "version",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "chainId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "verifyingContract",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "salt",
          "type": "bytes32"
        },
        {
          "internalType": "uint256[]",
          "name": "extensions",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
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
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "getNFTDetails",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "mintedTokenIds",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "ownedTokenIds",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getPlatformFeesAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
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
      "type": "function"
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
      "name": "minter",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
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
      "type": "function"
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
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
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
      "type": "function"
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
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "totalMinterAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "totalPlatformFeesAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "totalPurchaseAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "totalRoyaltyAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

  // abi: [
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "string",
  //         "name": "name",
  //         "type": "string"
  //       },
  //       {
  //         "internalType": "string",
  //         "name": "symbol",
  //         "type": "string"
  //       }
  //     ],
  //     "stateMutability": "nonpayable",
  //     "type": "constructor"
  //   },
  //   {
  //     "anonymous": false,
  //     "inputs": [
  //       {
  //         "indexed": true,
  //         "internalType": "address",
  //         "name": "owner",
  //         "type": "address"
  //       },
  //       {
  //         "indexed": true,
  //         "internalType": "address",
  //         "name": "approved",
  //         "type": "address"
  //       },
  //       {
  //         "indexed": true,
  //         "internalType": "uint256",
  //         "name": "tokenId",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "Approval",
  //     "type": "event"
  //   },
  //   {
  //     "anonymous": false,
  //     "inputs": [
  //       {
  //         "indexed": true,
  //         "internalType": "address",
  //         "name": "owner",
  //         "type": "address"
  //       },
  //       {
  //         "indexed": true,
  //         "internalType": "address",
  //         "name": "operator",
  //         "type": "address"
  //       },
  //       {
  //         "indexed": false,
  //         "internalType": "bool",
  //         "name": "approved",
  //         "type": "bool"
  //       }
  //     ],
  //     "name": "ApprovalForAll",
  //     "type": "event"
  //   },
  //   {
  //     "anonymous": false,
  //     "inputs": [
  //       {
  //         "indexed": false,
  //         "internalType": "uint256",
  //         "name": "nftId",
  //         "type": "uint256"
  //       },
  //       {
  //         "indexed": false,
  //         "internalType": "address",
  //         "name": "nftCreator",
  //         "type": "address"
  //       },
  //       {
  //         "indexed": false,
  //         "internalType": "uint256",
  //         "name": "time",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "Minted",
  //     "type": "event"
  //   },
  //   {
  //     "anonymous": false,
  //     "inputs": [
  //       {
  //         "indexed": true,
  //         "internalType": "address",
  //         "name": "previousOwner",
  //         "type": "address"
  //       },
  //       {
  //         "indexed": true,
  //         "internalType": "address",
  //         "name": "newOwner",
  //         "type": "address"
  //       }
  //     ],
  //     "name": "OwnershipTransferred",
  //     "type": "event"
  //   },
  //   {
  //     "anonymous": false,
  //     "inputs": [
  //       {
  //         "indexed": true,
  //         "internalType": "address",
  //         "name": "from",
  //         "type": "address"
  //       },
  //       {
  //         "indexed": true,
  //         "internalType": "address",
  //         "name": "to",
  //         "type": "address"
  //       },
  //       {
  //         "indexed": true,
  //         "internalType": "uint256",
  //         "name": "tokenId",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "Transfer",
  //     "type": "event"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "address",
  //         "name": "to",
  //         "type": "address"
  //       },
  //       {
  //         "internalType": "uint256",
  //         "name": "tokenId",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "approve",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "address",
  //         "name": "owner",
  //         "type": "address"
  //       }
  //     ],
  //     "name": "balanceOf",
  //     "outputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "",
  //         "type": "uint256"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "tokenId",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "getApproved",
  //     "outputs": [
  //       {
  //         "internalType": "address",
  //         "name": "",
  //         "type": "address"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "address",
  //         "name": "owner",
  //         "type": "address"
  //       },
  //       {
  //         "internalType": "address",
  //         "name": "operator",
  //         "type": "address"
  //       }
  //     ],
  //     "name": "isApprovedForAll",
  //     "outputs": [
  //       {
  //         "internalType": "bool",
  //         "name": "",
  //         "type": "bool"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "address",
  //         "name": "",
  //         "type": "address"
  //       },
  //       {
  //         "internalType": "uint256",
  //         "name": "",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "mintedByUser",
  //     "outputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "",
  //         "type": "uint256"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "minter",
  //     "outputs": [
  //       {
  //         "internalType": "address",
  //         "name": "",
  //         "type": "address"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [],
  //     "name": "name",
  //     "outputs": [
  //       {
  //         "internalType": "string",
  //         "name": "",
  //         "type": "string"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [],
  //     "name": "owner",
  //     "outputs": [
  //       {
  //         "internalType": "address",
  //         "name": "",
  //         "type": "address"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "tokenId",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "ownerOf",
  //     "outputs": [
  //       {
  //         "internalType": "address",
  //         "name": "",
  //         "type": "address"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [],
  //     "name": "renounceOwnership",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "royalty",
  //     "outputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "",
  //         "type": "uint256"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "address",
  //         "name": "from",
  //         "type": "address"
  //       },
  //       {
  //         "internalType": "address",
  //         "name": "to",
  //         "type": "address"
  //       },
  //       {
  //         "internalType": "uint256",
  //         "name": "tokenId",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "safeTransferFrom",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "address",
  //         "name": "from",
  //         "type": "address"
  //       },
  //       {
  //         "internalType": "address",
  //         "name": "to",
  //         "type": "address"
  //       },
  //       {
  //         "internalType": "uint256",
  //         "name": "tokenId",
  //         "type": "uint256"
  //       },
  //       {
  //         "internalType": "bytes",
  //         "name": "data",
  //         "type": "bytes"
  //       }
  //     ],
  //     "name": "safeTransferFrom",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "address",
  //         "name": "operator",
  //         "type": "address"
  //       },
  //       {
  //         "internalType": "bool",
  //         "name": "approved",
  //         "type": "bool"
  //       }
  //     ],
  //     "name": "setApprovalForAll",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [],
  //     "name": "symbol",
  //     "outputs": [
  //       {
  //         "internalType": "string",
  //         "name": "",
  //         "type": "string"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "tokenId",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "tokenURI",
  //     "outputs": [
  //       {
  //         "internalType": "string",
  //         "name": "",
  //         "type": "string"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "address",
  //         "name": "from",
  //         "type": "address"
  //       },
  //       {
  //         "internalType": "address",
  //         "name": "to",
  //         "type": "address"
  //       },
  //       {
  //         "internalType": "uint256",
  //         "name": "tokenId",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "transferFrom",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "address",
  //         "name": "newOwner",
  //         "type": "address"
  //       }
  //     ],
  //     "name": "transferOwnership",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "address",
  //         "name": "_minter",
  //         "type": "address"
  //       },
  //       {
  //         "internalType": "address",
  //         "name": "redeemer",
  //         "type": "address"
  //       },
  //       {
  //         "components": [
  //           {
  //             "internalType": "uint256",
  //             "name": "minPrice",
  //             "type": "uint256"
  //           },
  //           {
  //             "internalType": "string",
  //             "name": "uri",
  //             "type": "string"
  //           },
  //           {
  //             "internalType": "uint256",
  //             "name": "royaltyPercentage",
  //             "type": "uint256"
  //           },
  //           {
  //             "internalType": "bytes",
  //             "name": "signature",
  //             "type": "bytes"
  //           }
  //         ],
  //         "internalType": "struct Animal.NFTVoucher",
  //         "name": "voucher",
  //         "type": "tuple"
  //       }
  //     ],
  //     "name": "redeem",
  //     "outputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "",
  //         "type": "uint256"
  //       }
  //     ],
  //     "stateMutability": "payable",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [],
  //     "name": "withdraw",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [],
  //     "name": "availableToWithdraw",
  //     "outputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "",
  //         "type": "uint256"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [],
  //     "name": "getChainID",
  //     "outputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "",
  //         "type": "uint256"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "components": [
  //           {
  //             "internalType": "uint256",
  //             "name": "minPrice",
  //             "type": "uint256"
  //           },
  //           {
  //             "internalType": "string",
  //             "name": "uri",
  //             "type": "string"
  //           },
  //           {
  //             "internalType": "uint256",
  //             "name": "royaltyPercentage",
  //             "type": "uint256"
  //           },
  //           {
  //             "internalType": "bytes",
  //             "name": "signature",
  //             "type": "bytes"
  //           }
  //         ],
  //         "internalType": "struct Animal.NFTVoucher",
  //         "name": "voucher",
  //         "type": "tuple"
  //       }
  //     ],
  //     "name": "_verify",
  //     "outputs": [
  //       {
  //         "internalType": "address",
  //         "name": "",
  //         "type": "address"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "components": [
  //           {
  //             "internalType": "uint256",
  //             "name": "tokenId",
  //             "type": "uint256"
  //           },
  //           {
  //             "internalType": "uint256",
  //             "name": "price",
  //             "type": "uint256"
  //           },
  //           {
  //             "internalType": "bytes",
  //             "name": "signature",
  //             "type": "bytes"
  //           }
  //         ],
  //         "internalType": "struct Animal.NFTTransferVoucher",
  //         "name": "voucher",
  //         "type": "tuple"
  //       }
  //     ],
  //     "name": "_verifyTransferVoucher",
  //     "outputs": [
  //       {
  //         "internalType": "address",
  //         "name": "",
  //         "type": "address"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "bytes4",
  //         "name": "interfaceId",
  //         "type": "bytes4"
  //       }
  //     ],
  //     "name": "supportsInterface",
  //     "outputs": [
  //       {
  //         "internalType": "bool",
  //         "name": "",
  //         "type": "bool"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "tokenId",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "royaltyForToken",
  //     "outputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "percentage",
  //         "type": "uint256"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "tokenId",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "minterOfToken",
  //     "outputs": [
  //       {
  //         "internalType": "address",
  //         "name": "_minter",
  //         "type": "address"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "_royalty",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "setMaxRoyalty",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "address",
  //         "name": "user",
  //         "type": "address"
  //       }
  //     ],
  //     "name": "getNFTMintedByUser",
  //     "outputs": [
  //       {
  //         "internalType": "uint256[]",
  //         "name": "ids",
  //         "type": "uint256[]"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "address",
  //         "name": "_sender",
  //         "type": "address"
  //       },
  //       {
  //         "internalType": "address",
  //         "name": "redeemer",
  //         "type": "address"
  //       },
  //       {
  //         "components": [
  //           {
  //             "internalType": "uint256",
  //             "name": "tokenId",
  //             "type": "uint256"
  //           },
  //           {
  //             "internalType": "uint256",
  //             "name": "price",
  //             "type": "uint256"
  //           },
  //           {
  //             "internalType": "bytes",
  //             "name": "signature",
  //             "type": "bytes"
  //           }
  //         ],
  //         "internalType": "struct Animal.NFTTransferVoucher",
  //         "name": "voucher",
  //         "type": "tuple"
  //       }
  //     ],
  //     "name": "buy",
  //     "outputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "",
  //         "type": "uint256"
  //       }
  //     ],
  //     "stateMutability": "payable",
  //     "type": "function"
  //   }
  // ]
}
