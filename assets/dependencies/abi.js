var defaultAbis = {
  ropsten: [
    {
      address: "0xF8D18b3C5De9892681998076Bebcba32e62e0835",
      name: "DNSRegistrar",
      abi: [
        {
          constant: true,
          inputs: [],
          name: "ens",
          outputs: [{ name: "", type: "address" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "rootDomain",
          outputs: [{ name: "", type: "bytes" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "oracle",
          outputs: [{ name: "", type: "address" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "name", type: "bytes" }],
          name: "claim",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "rootNode",
          outputs: [{ name: "", type: "bytes32" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { name: "_dnssec", type: "address" },
            { name: "_ens", type: "address" },
            { name: "_rootDomain", type: "bytes" },
            { name: "_rootNode", type: "bytes32" },
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "constructor",
        },
      ],
    },
    {
      address: "0x112234455C3a32FD11230C42E7Bccd4A84e02010",
      name: "ENS",
      abi: [
        {
          constant: true,
          inputs: [{ name: "node", type: "bytes32" }],
          name: "resolver",
          outputs: [{ name: "", type: "address" }],
          payable: false,
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "node", type: "bytes32" }],
          name: "owner",
          outputs: [{ name: "", type: "address" }],
          payable: false,
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "node", type: "bytes32" },
            { name: "label", type: "bytes32" },
            { name: "owner", type: "address" },
          ],
          name: "setSubnodeOwner",
          outputs: [],
          payable: false,
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "node", type: "bytes32" },
            { name: "ttl", type: "uint64" },
          ],
          name: "setTTL",
          outputs: [],
          payable: false,
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "node", type: "bytes32" }],
          name: "ttl",
          outputs: [{ name: "", type: "uint64" }],
          payable: false,
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "node", type: "bytes32" },
            { name: "resolver", type: "address" },
          ],
          name: "setResolver",
          outputs: [],
          payable: false,
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "node", type: "bytes32" },
            { name: "owner", type: "address" },
          ],
          name: "setOwner",
          outputs: [],
          payable: false,
          type: "function",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "node", type: "bytes32" },
            { indexed: false, name: "owner", type: "address" },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "node", type: "bytes32" },
            { indexed: true, name: "label", type: "bytes32" },
            { indexed: false, name: "owner", type: "address" },
          ],
          name: "NewOwner",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "node", type: "bytes32" },
            { indexed: false, name: "resolver", type: "address" },
          ],
          name: "NewResolver",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "node", type: "bytes32" },
            { indexed: false, name: "ttl", type: "uint64" },
          ],
          name: "NewTTL",
          type: "event",
        },
      ],
    },
    {
      address: "0x5FfC014343cd971B7eb70732021E26C35B744cc4",
      name: "PublicResolver",
      abi: [
        {
          constant: true,
          inputs: [{ name: "interfaceID", type: "bytes4" }],
          name: "supportsInterface",
          outputs: [{ name: "", type: "bool" }],
          payable: false,
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "node", type: "bytes32" },
            { name: "key", type: "string" },
            { name: "value", type: "string" },
          ],
          name: "setText",
          outputs: [],
          payable: false,
          type: "function",
        },
        {
          constant: true,
          inputs: [
            { name: "node", type: "bytes32" },
            { name: "contentTypes", type: "uint256" },
          ],
          name: "ABI",
          outputs: [
            { name: "contentType", type: "uint256" },
            { name: "data", type: "bytes" },
          ],
          payable: false,
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "node", type: "bytes32" },
            { name: "x", type: "bytes32" },
            { name: "y", type: "bytes32" },
          ],
          name: "setPubkey",
          outputs: [],
          payable: false,
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "node", type: "bytes32" }],
          name: "content",
          outputs: [{ name: "ret", type: "bytes32" }],
          payable: false,
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "node", type: "bytes32" }],
          name: "addr",
          outputs: [{ name: "ret", type: "address" }],
          payable: false,
          type: "function",
        },
        {
          constant: true,
          inputs: [
            { name: "node", type: "bytes32" },
            { name: "key", type: "string" },
          ],
          name: "text",
          outputs: [{ name: "ret", type: "string" }],
          payable: false,
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "node", type: "bytes32" },
            { name: "contentType", type: "uint256" },
            { name: "data", type: "bytes" },
          ],
          name: "setABI",
          outputs: [],
          payable: false,
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "node", type: "bytes32" }],
          name: "name",
          outputs: [{ name: "ret", type: "string" }],
          payable: false,
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "node", type: "bytes32" },
            { name: "name", type: "string" },
          ],
          name: "setName",
          outputs: [],
          payable: false,
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "node", type: "bytes32" },
            { name: "hash", type: "bytes32" },
          ],
          name: "setContent",
          outputs: [],
          payable: false,
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "node", type: "bytes32" }],
          name: "pubkey",
          outputs: [
            { name: "x", type: "bytes32" },
            { name: "y", type: "bytes32" },
          ],
          payable: false,
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "node", type: "bytes32" },
            { name: "addr", type: "address" },
          ],
          name: "setAddr",
          outputs: [],
          payable: false,
          type: "function",
        },
        {
          inputs: [{ name: "ensAddr", type: "address" }],
          payable: false,
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "node", type: "bytes32" },
            { indexed: false, name: "a", type: "address" },
          ],
          name: "AddrChanged",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "node", type: "bytes32" },
            { indexed: false, name: "hash", type: "bytes32" },
          ],
          name: "ContentChanged",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "node", type: "bytes32" },
            { indexed: false, name: "name", type: "string" },
          ],
          name: "NameChanged",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "node", type: "bytes32" },
            { indexed: true, name: "contentType", type: "uint256" },
          ],
          name: "ABIChanged",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "node", type: "bytes32" },
            { indexed: false, name: "x", type: "bytes32" },
            { indexed: false, name: "y", type: "bytes32" },
          ],
          name: "PubkeyChanged",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "node", type: "bytes32" },
            { indexed: true, name: "indexedKey", type: "string" },
            { indexed: false, name: "key", type: "string" },
          ],
          name: "TextChanged",
          type: "event",
        },
      ],
    },
    {
      address: "0xd7296B6044ffD0565062345c2EaA4017024B2D22",
      name: "DNSSEC",
      abi: [
        {
          constant: false,
          inputs: [
            { name: "id", type: "uint8" },
            { name: "algo", type: "address" },
          ],
          name: "setAlgorithm",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "class", type: "uint16" },
            { name: "name", type: "bytes" },
            { name: "input", type: "bytes" },
            { name: "sig", type: "bytes" },
          ],
          name: "submitRRSet",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "newOwner", type: "address" }],
          name: "setOwner",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "id", type: "uint8" },
            { name: "digest", type: "address" },
          ],
          name: "setDigest",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [
            { name: "class", type: "uint16" },
            { name: "dnstype", type: "uint16" },
            { name: "name", type: "bytes" },
          ],
          name: "rrset",
          outputs: [
            { name: "inception", type: "uint32" },
            { name: "expiration", type: "uint32" },
            { name: "inserted", type: "uint64" },
            { name: "rrs", type: "bytes" },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "", type: "uint8" }],
          name: "digests",
          outputs: [{ name: "", type: "address" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "owner",
          outputs: [{ name: "", type: "address" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "", type: "uint8" }],
          name: "algorithms",
          outputs: [{ name: "", type: "address" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ name: "anchors", type: "bytes" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: false, name: "id", type: "uint8" },
            { indexed: false, name: "addr", type: "address" },
          ],
          name: "AlgorithmUpdated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: false, name: "id", type: "uint8" },
            { indexed: false, name: "addr", type: "address" },
          ],
          name: "DigestUpdated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [{ indexed: false, name: "name", type: "bytes" }],
          name: "RRSetUpdated",
          type: "event",
        },
      ],
    },
    {
      address: "0x6fC21092DA55B392b045eD78F4732bff3C580e2c",
      name: "FireflyRegistrar",
      abi: [
        {
          constant: false,
          inputs: [{ name: "fee", type: "uint256" }],
          name: "setFee",
          outputs: [],
          payable: false,
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "admin", type: "address" }],
          name: "setAdmin",
          outputs: [],
          payable: false,
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "config",
          outputs: [
            { name: "ens", type: "address" },
            { name: "nodeHash", type: "bytes32" },
            { name: "admin", type: "address" },
            { name: "fee", type: "uint256" },
            { name: "defaultResolver", type: "address" },
          ],
          payable: false,
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "nodeHash", type: "bytes32" }],
          name: "donations",
          outputs: [{ name: "donation", type: "uint256" }],
          payable: false,
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "nodeHash", type: "bytes32" }],
          name: "donate",
          outputs: [],
          payable: true,
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "defaultResolver", type: "address" }],
          name: "setDefaultResolver",
          outputs: [],
          payable: false,
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "stats",
          outputs: [
            { name: "nameCount", type: "uint256" },
            { name: "totalPaid", type: "uint256" },
            { name: "balance", type: "uint256" },
          ],
          payable: false,
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "fee",
          outputs: [{ name: "fee", type: "uint256" }],
          payable: false,
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "label", type: "string" }],
          name: "register",
          outputs: [],
          payable: true,
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "target", type: "address" },
            { name: "amount", type: "uint256" },
          ],
          name: "withdraw",
          outputs: [],
          payable: false,
          type: "function",
        },
        {
          inputs: [
            { name: "ens", type: "address" },
            { name: "nodeHash", type: "bytes32" },
            { name: "defaultResolver", type: "address" },
          ],
          payable: false,
          type: "constructor",
        },
        { payable: true, type: "fallback" },
        {
          anonymous: false,
          inputs: [
            { indexed: false, name: "oldAdmin", type: "address" },
            { indexed: false, name: "newAdmin", type: "address" },
          ],
          name: "adminChanged",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: false, name: "oldFee", type: "uint256" },
            { indexed: false, name: "newFee", type: "uint256" },
          ],
          name: "feeChanged",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: false, name: "oldResolver", type: "address" },
            { indexed: false, name: "newResolver", type: "address" },
          ],
          name: "defaultResolverChanged",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: false, name: "target", type: "address" },
            { indexed: false, name: "amount", type: "uint256" },
          ],
          name: "didWithdraw",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "nodeHash", type: "bytes32" },
            { indexed: false, name: "owner", type: "address" },
            { indexed: false, name: "fee", type: "uint256" },
          ],
          name: "nameRegistered",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "nodeHash", type: "bytes32" },
            { indexed: false, name: "amount", type: "uint256" },
          ],
          name: "donation",
          type: "event",
        },
      ],
    },
  ],
  homestead: [
    {
      address: "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d",
      name: "CryptoKitties",
      abi: [
        {
          constant: true,
          inputs: [{ name: "_interfaceID", type: "bytes4" }],
          name: "supportsInterface",
          outputs: [{ name: "", type: "bool" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "cfoAddress",
          outputs: [{ name: "", type: "address" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [
            { name: "_tokenId", type: "uint256" },
            { name: "_preferredTransport", type: "string" },
          ],
          name: "tokenMetadata",
          outputs: [{ name: "infoUrl", type: "string" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "promoCreatedCount",
          outputs: [{ name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "name",
          outputs: [{ name: "", type: "string" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "_to", type: "address" },
            { name: "_tokenId", type: "uint256" },
          ],
          name: "approve",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "ceoAddress",
          outputs: [{ name: "", type: "address" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "GEN0_STARTING_PRICE",
          outputs: [{ name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "_address", type: "address" }],
          name: "setSiringAuctionAddress",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "totalSupply",
          outputs: [{ name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "pregnantKitties",
          outputs: [{ name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "_kittyId", type: "uint256" }],
          name: "isPregnant",
          outputs: [{ name: "", type: "bool" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "GEN0_AUCTION_DURATION",
          outputs: [{ name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "siringAuction",
          outputs: [{ name: "", type: "address" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "_from", type: "address" },
            { name: "_to", type: "address" },
            { name: "_tokenId", type: "uint256" },
          ],
          name: "transferFrom",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "_address", type: "address" }],
          name: "setGeneScienceAddress",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "_newCEO", type: "address" }],
          name: "setCEO",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "_newCOO", type: "address" }],
          name: "setCOO",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "_kittyId", type: "uint256" },
            { name: "_startingPrice", type: "uint256" },
            { name: "_endingPrice", type: "uint256" },
            { name: "_duration", type: "uint256" },
          ],
          name: "createSaleAuction",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: false,
          inputs: [],
          name: "unpause",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "", type: "uint256" }],
          name: "sireAllowedToAddress",
          outputs: [{ name: "", type: "address" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [
            { name: "_matronId", type: "uint256" },
            { name: "_sireId", type: "uint256" },
          ],
          name: "canBreedWith",
          outputs: [{ name: "", type: "bool" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "", type: "uint256" }],
          name: "kittyIndexToApproved",
          outputs: [{ name: "", type: "address" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "_kittyId", type: "uint256" },
            { name: "_startingPrice", type: "uint256" },
            { name: "_endingPrice", type: "uint256" },
            { name: "_duration", type: "uint256" },
          ],
          name: "createSiringAuction",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "val", type: "uint256" }],
          name: "setAutoBirthFee",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "_addr", type: "address" },
            { name: "_sireId", type: "uint256" },
          ],
          name: "approveSiring",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "_newCFO", type: "address" }],
          name: "setCFO",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "_genes", type: "uint256" },
            { name: "_owner", type: "address" },
          ],
          name: "createPromoKitty",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "secs", type: "uint256" }],
          name: "setSecondsPerBlock",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "paused",
          outputs: [{ name: "", type: "bool" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [],
          name: "withdrawBalance",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "_tokenId", type: "uint256" }],
          name: "ownerOf",
          outputs: [{ name: "owner", type: "address" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "GEN0_CREATION_LIMIT",
          outputs: [{ name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "newContractAddress",
          outputs: [{ name: "", type: "address" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "_address", type: "address" }],
          name: "setSaleAuctionAddress",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "_owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "count", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "_v2Address", type: "address" }],
          name: "setNewAddress",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "secondsPerBlock",
          outputs: [{ name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [],
          name: "pause",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "_owner", type: "address" }],
          name: "tokensOfOwner",
          outputs: [{ name: "ownerTokens", type: "uint256[]" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "_matronId", type: "uint256" }],
          name: "giveBirth",
          outputs: [{ name: "", type: "uint256" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: false,
          inputs: [],
          name: "withdrawAuctionBalances",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "symbol",
          outputs: [{ name: "", type: "string" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "", type: "uint256" }],
          name: "cooldowns",
          outputs: [{ name: "", type: "uint32" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "", type: "uint256" }],
          name: "kittyIndexToOwner",
          outputs: [{ name: "", type: "address" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "_to", type: "address" },
            { name: "_tokenId", type: "uint256" },
          ],
          name: "transfer",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "cooAddress",
          outputs: [{ name: "", type: "address" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "autoBirthFee",
          outputs: [{ name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "erc721Metadata",
          outputs: [{ name: "", type: "address" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "_genes", type: "uint256" }],
          name: "createGen0Auction",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "_kittyId", type: "uint256" }],
          name: "isReadyToBreed",
          outputs: [{ name: "", type: "bool" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "PROMO_CREATION_LIMIT",
          outputs: [{ name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "_contractAddress", type: "address" }],
          name: "setMetadataAddress",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "saleAuction",
          outputs: [{ name: "", type: "address" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "_id", type: "uint256" }],
          name: "getKitty",
          outputs: [
            { name: "isGestating", type: "bool" },
            { name: "isReady", type: "bool" },
            { name: "cooldownIndex", type: "uint256" },
            { name: "nextActionAt", type: "uint256" },
            { name: "siringWithId", type: "uint256" },
            { name: "birthTime", type: "uint256" },
            { name: "matronId", type: "uint256" },
            { name: "sireId", type: "uint256" },
            { name: "generation", type: "uint256" },
            { name: "genes", type: "uint256" },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "_sireId", type: "uint256" },
            { name: "_matronId", type: "uint256" },
          ],
          name: "bidOnSiringAuction",
          outputs: [],
          payable: true,
          stateMutability: "payable",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "gen0CreatedCount",
          outputs: [{ name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "geneScience",
          outputs: [{ name: "", type: "address" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "_matronId", type: "uint256" },
            { name: "_sireId", type: "uint256" },
          ],
          name: "breedWithAuto",
          outputs: [],
          payable: true,
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "constructor",
        },
        { payable: true, stateMutability: "payable", type: "fallback" },
        {
          anonymous: false,
          inputs: [
            { indexed: false, name: "owner", type: "address" },
            { indexed: false, name: "matronId", type: "uint256" },
            { indexed: false, name: "sireId", type: "uint256" },
            { indexed: false, name: "cooldownEndBlock", type: "uint256" },
          ],
          name: "Pregnant",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: false, name: "from", type: "address" },
            { indexed: false, name: "to", type: "address" },
            { indexed: false, name: "tokenId", type: "uint256" },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: false, name: "owner", type: "address" },
            { indexed: false, name: "approved", type: "address" },
            { indexed: false, name: "tokenId", type: "uint256" },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: false, name: "owner", type: "address" },
            { indexed: false, name: "kittyId", type: "uint256" },
            { indexed: false, name: "matronId", type: "uint256" },
            { indexed: false, name: "sireId", type: "uint256" },
            { indexed: false, name: "genes", type: "uint256" },
          ],
          name: "Birth",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [{ indexed: false, name: "newContract", type: "address" }],
          name: "ContractUpgrade",
          type: "event",
        },
      ],
    },
    {
      address: "0xf97e0a5b616dffc913e72455fde9ea8bbe946a2b",
      name: "GeneScience",
      abi: [
        {
          constant: false,
          inputs: [
            { name: "_genes1", type: "uint256" },
            { name: "_genes2", type: "uint256" },
            { name: "_targetBlock", type: "uint256" },
          ],
          name: "mixGenes",
          outputs: [{ name: "", type: "uint256" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "_traits", type: "uint8[]" }],
          name: "encode",
          outputs: [{ name: "_genes", type: "uint256" }],
          payable: false,
          stateMutability: "pure",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "isGeneScience",
          outputs: [{ name: "", type: "bool" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "_genes", type: "uint256" }],
          name: "decode",
          outputs: [{ name: "", type: "uint8[]" }],
          payable: false,
          stateMutability: "pure",
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "_genes", type: "uint256" }],
          name: "expressingTraits",
          outputs: [{ name: "", type: "uint8[12]" }],
          payable: false,
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "constructor",
        },
      ],
    },
    {
      address: "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C",
      name: "SaleClockAuction",
      abi: [
        {
          constant: false,
          inputs: [
            { name: "_tokenId", type: "uint256" },
            { name: "_startingPrice", type: "uint256" },
            { name: "_endingPrice", type: "uint256" },
            { name: "_duration", type: "uint256" },
            { name: "_seller", type: "address" },
          ],
          name: "createAuction",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: false,
          inputs: [],
          name: "unpause",
          outputs: [{ name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "_tokenId", type: "uint256" }],
          name: "bid",
          outputs: [],
          payable: true,
          stateMutability: "payable",
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "", type: "uint256" }],
          name: "lastGen0SalePrices",
          outputs: [{ name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "paused",
          outputs: [{ name: "", type: "bool" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [],
          name: "withdrawBalance",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "_tokenId", type: "uint256" }],
          name: "getAuction",
          outputs: [
            { name: "seller", type: "address" },
            { name: "startingPrice", type: "uint256" },
            { name: "endingPrice", type: "uint256" },
            { name: "duration", type: "uint256" },
            { name: "startedAt", type: "uint256" },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "ownerCut",
          outputs: [{ name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [],
          name: "pause",
          outputs: [{ name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "isSaleClockAuction",
          outputs: [{ name: "", type: "bool" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "_tokenId", type: "uint256" }],
          name: "cancelAuctionWhenPaused",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "gen0SaleCount",
          outputs: [{ name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "owner",
          outputs: [{ name: "", type: "address" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "_tokenId", type: "uint256" }],
          name: "cancelAuction",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "_tokenId", type: "uint256" }],
          name: "getCurrentPrice",
          outputs: [{ name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "nonFungibleContract",
          outputs: [{ name: "", type: "address" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "averageGen0SalePrice",
          outputs: [{ name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "newOwner", type: "address" }],
          name: "transferOwnership",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { name: "_nftAddr", type: "address" },
            { name: "_cut", type: "uint256" },
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: false, name: "tokenId", type: "uint256" },
            { indexed: false, name: "startingPrice", type: "uint256" },
            { indexed: false, name: "endingPrice", type: "uint256" },
            { indexed: false, name: "duration", type: "uint256" },
          ],
          name: "AuctionCreated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: false, name: "tokenId", type: "uint256" },
            { indexed: false, name: "totalPrice", type: "uint256" },
            { indexed: false, name: "winner", type: "address" },
          ],
          name: "AuctionSuccessful",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [{ indexed: false, name: "tokenId", type: "uint256" }],
          name: "AuctionCancelled",
          type: "event",
        },
        { anonymous: false, inputs: [], name: "Pause", type: "event" },
        { anonymous: false, inputs: [], name: "Unpause", type: "event" },
      ],
    },
    {
      address: "0x314159265dD8dbb310642f98f50C066173C1259b",
      name: "ENS",
      abi: [
        {
          constant: true,
          inputs: [{ name: "node", type: "bytes32" }],
          name: "resolver",
          outputs: [{ name: "", type: "address" }],
          payable: false,
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "node", type: "bytes32" }],
          name: "owner",
          outputs: [{ name: "", type: "address" }],
          payable: false,
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "node", type: "bytes32" },
            { name: "label", type: "bytes32" },
            { name: "owner", type: "address" },
          ],
          name: "setSubnodeOwner",
          outputs: [],
          payable: false,
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "node", type: "bytes32" },
            { name: "ttl", type: "uint64" },
          ],
          name: "setTTL",
          outputs: [],
          payable: false,
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "node", type: "bytes32" }],
          name: "ttl",
          outputs: [{ name: "", type: "uint64" }],
          payable: false,
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "node", type: "bytes32" },
            { name: "resolver", type: "address" },
          ],
          name: "setResolver",
          outputs: [],
          payable: false,
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "node", type: "bytes32" },
            { name: "owner", type: "address" },
          ],
          name: "setOwner",
          outputs: [],
          payable: false,
          type: "function",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "node", type: "bytes32" },
            { indexed: false, name: "owner", type: "address" },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "node", type: "bytes32" },
            { indexed: true, name: "label", type: "bytes32" },
            { indexed: false, name: "owner", type: "address" },
          ],
          name: "NewOwner",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "node", type: "bytes32" },
            { indexed: false, name: "resolver", type: "address" },
          ],
          name: "NewResolver",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "node", type: "bytes32" },
            { indexed: false, name: "ttl", type: "uint64" },
          ],
          name: "NewTTL",
          type: "event",
        },
      ],
    },
    {
      address: "0x9F8Bf604AbeB04D32B0FFAE9c3A083be5858CF96",
      name: "GameOfThrones",
      abi: [
        {
          constant: true,
          inputs: [],
          name: "godBank",
          outputs: [{ name: "", type: "uint256" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "round",
          outputs: [{ name: "", type: "uint32" }],
          type: "function",
        },
        {
          constant: false,
          inputs: [],
          name: "protectKingdom",
          outputs: [{ name: "", type: "bool" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "lastFell",
          outputs: [{ name: "", type: "uint256" }],
          type: "function",
        },
        {
          constant: false,
          inputs: [],
          name: "abdicate",
          outputs: [],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "kingCost",
          outputs: [{ name: "", type: "uint256" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "madKing",
          outputs: [{ name: "", type: "address" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "jesterBank",
          outputs: [{ name: "", type: "uint256" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "", type: "uint256" }],
          name: "citizensAddresses",
          outputs: [{ name: "", type: "address" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "kingBank",
          outputs: [{ name: "", type: "uint256" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "piggyBank",
          outputs: [{ name: "", type: "uint256" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "lastCollection",
          outputs: [{ name: "", type: "uint256" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "totalCitizens",
          outputs: [{ name: "", type: "uint32" }],
          type: "function",
        },
        {
          constant: false,
          inputs: [],
          name: "usurpation",
          outputs: [],
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "", type: "uint256" }],
          name: "citizensAmounts",
          outputs: [{ name: "", type: "uint256" }],
          type: "function",
        },
        {
          constant: false,
          inputs: [],
          name: "collectFee",
          outputs: [],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "lastCitizenPaid",
          outputs: [{ name: "", type: "uint32" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "amountInvested",
          outputs: [{ name: "", type: "uint256" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "jester",
          outputs: [{ name: "", type: "address" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "amountAlreadyPaidBack",
          outputs: [{ name: "", type: "uint256" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "trueGods",
          outputs: [{ name: "", type: "address" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "onThrone",
          outputs: [{ name: "", type: "uint256" }],
          type: "function",
        },
        {
          constant: false,
          inputs: [],
          name: "murder",
          outputs: [],
          type: "function",
        },
        { inputs: [], type: "constructor" },
      ],
    },
    {
      address: "0xbb9bc244d798123fde783fcc1c72d3bb8c189413",
      name: "TheDao",
      abi: [
        {
          constant: true,
          inputs: [{ name: "", type: "uint256" }],
          name: "proposals",
          outputs: [
            { name: "recipient", type: "address" },
            { name: "amount", type: "uint256" },
            { name: "description", type: "string" },
            { name: "votingDeadline", type: "uint256" },
            { name: "open", type: "bool" },
            { name: "proposalPassed", type: "bool" },
            { name: "proposalHash", type: "bytes32" },
            { name: "proposalDeposit", type: "uint256" },
            { name: "newCurator", type: "bool" },
            { name: "yea", type: "uint256" },
            { name: "nay", type: "uint256" },
            { name: "creator", type: "address" },
          ],
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "_spender", type: "address" },
            { name: "_amount", type: "uint256" },
          ],
          name: "approve",
          outputs: [{ name: "success", type: "bool" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "minTokensToCreate",
          outputs: [{ name: "", type: "uint256" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "rewardAccount",
          outputs: [{ name: "", type: "address" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "daoCreator",
          outputs: [{ name: "", type: "address" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "totalSupply",
          outputs: [{ name: "", type: "uint256" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "divisor",
          outputs: [{ name: "divisor", type: "uint256" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "extraBalance",
          outputs: [{ name: "", type: "address" }],
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "_proposalID", type: "uint256" },
            { name: "_transactionData", type: "bytes" },
          ],
          name: "executeProposal",
          outputs: [{ name: "_success", type: "bool" }],
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "_from", type: "address" },
            { name: "_to", type: "address" },
            { name: "_value", type: "uint256" },
          ],
          name: "transferFrom",
          outputs: [{ name: "success", type: "bool" }],
          type: "function",
        },
        {
          constant: false,
          inputs: [],
          name: "unblockMe",
          outputs: [{ name: "", type: "bool" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "totalRewardToken",
          outputs: [{ name: "", type: "uint256" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "actualBalance",
          outputs: [{ name: "_actualBalance", type: "uint256" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "closingTime",
          outputs: [{ name: "", type: "uint256" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "", type: "address" }],
          name: "allowedRecipients",
          outputs: [{ name: "", type: "bool" }],
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "_to", type: "address" },
            { name: "_value", type: "uint256" },
          ],
          name: "transferWithoutReward",
          outputs: [{ name: "success", type: "bool" }],
          type: "function",
        },
        {
          constant: false,
          inputs: [],
          name: "refund",
          outputs: [],
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "_recipient", type: "address" },
            { name: "_amount", type: "uint256" },
            { name: "_description", type: "string" },
            { name: "_transactionData", type: "bytes" },
            { name: "_debatingPeriod", type: "uint256" },
            { name: "_newCurator", type: "bool" },
          ],
          name: "newProposal",
          outputs: [{ name: "_proposalID", type: "uint256" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "", type: "address" }],
          name: "DAOpaidOut",
          outputs: [{ name: "", type: "uint256" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "minQuorumDivisor",
          outputs: [{ name: "", type: "uint256" }],
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "_newContract", type: "address" }],
          name: "newContract",
          outputs: [],
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "_owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "balance", type: "uint256" }],
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "_recipient", type: "address" },
            { name: "_allowed", type: "bool" },
          ],
          name: "changeAllowedRecipients",
          outputs: [{ name: "_success", type: "bool" }],
          type: "function",
        },
        {
          constant: false,
          inputs: [],
          name: "halveMinQuorum",
          outputs: [{ name: "_success", type: "bool" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "", type: "address" }],
          name: "paidOut",
          outputs: [{ name: "", type: "uint256" }],
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "_proposalID", type: "uint256" },
            { name: "_newCurator", type: "address" },
          ],
          name: "splitDAO",
          outputs: [{ name: "_success", type: "bool" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "DAOrewardAccount",
          outputs: [{ name: "", type: "address" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "proposalDeposit",
          outputs: [{ name: "", type: "uint256" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "numberOfProposals",
          outputs: [{ name: "_numberOfProposals", type: "uint256" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "lastTimeMinQuorumMet",
          outputs: [{ name: "", type: "uint256" }],
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "_toMembers", type: "bool" }],
          name: "retrieveDAOReward",
          outputs: [{ name: "_success", type: "bool" }],
          type: "function",
        },
        {
          constant: false,
          inputs: [],
          name: "receiveEther",
          outputs: [{ name: "", type: "bool" }],
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "_to", type: "address" },
            { name: "_value", type: "uint256" },
          ],
          name: "transfer",
          outputs: [{ name: "success", type: "bool" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "isFueled",
          outputs: [{ name: "", type: "bool" }],
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "_tokenHolder", type: "address" }],
          name: "createTokenProxy",
          outputs: [{ name: "success", type: "bool" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "_proposalID", type: "uint256" }],
          name: "getNewDAOAddress",
          outputs: [{ name: "_newDAO", type: "address" }],
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "_proposalID", type: "uint256" },
            { name: "_supportsProposal", type: "bool" },
          ],
          name: "vote",
          outputs: [{ name: "_voteID", type: "uint256" }],
          type: "function",
        },
        {
          constant: false,
          inputs: [],
          name: "getMyReward",
          outputs: [{ name: "_success", type: "bool" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "", type: "address" }],
          name: "rewardToken",
          outputs: [{ name: "", type: "uint256" }],
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "_from", type: "address" },
            { name: "_to", type: "address" },
            { name: "_value", type: "uint256" },
          ],
          name: "transferFromWithoutReward",
          outputs: [{ name: "success", type: "bool" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [
            { name: "_owner", type: "address" },
            { name: "_spender", type: "address" },
          ],
          name: "allowance",
          outputs: [{ name: "remaining", type: "uint256" }],
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "_proposalDeposit", type: "uint256" }],
          name: "changeProposalDeposit",
          outputs: [],
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "", type: "address" }],
          name: "blocked",
          outputs: [{ name: "", type: "uint256" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "curator",
          outputs: [{ name: "", type: "address" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [
            { name: "_proposalID", type: "uint256" },
            { name: "_recipient", type: "address" },
            { name: "_amount", type: "uint256" },
            { name: "_transactionData", type: "bytes" },
          ],
          name: "checkProposalCode",
          outputs: [{ name: "_codeChecksOut", type: "bool" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "privateCreation",
          outputs: [{ name: "", type: "address" }],
          type: "function",
        },
        {
          inputs: [
            { name: "_curator", type: "address" },
            { name: "_daoCreator", type: "address" },
            { name: "_proposalDeposit", type: "uint256" },
            { name: "_minTokensToCreate", type: "uint256" },
            { name: "_closingTime", type: "uint256" },
            { name: "_privateCreation", type: "address" },
          ],
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "_from", type: "address" },
            { indexed: true, name: "_to", type: "address" },
            { indexed: false, name: "_amount", type: "uint256" },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "_owner", type: "address" },
            { indexed: true, name: "_spender", type: "address" },
            { indexed: false, name: "_amount", type: "uint256" },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [{ indexed: false, name: "value", type: "uint256" }],
          name: "FuelingToDate",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "to", type: "address" },
            { indexed: false, name: "amount", type: "uint256" },
          ],
          name: "CreatedToken",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "to", type: "address" },
            { indexed: false, name: "value", type: "uint256" },
          ],
          name: "Refund",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "proposalID", type: "uint256" },
            { indexed: false, name: "recipient", type: "address" },
            { indexed: false, name: "amount", type: "uint256" },
            { indexed: false, name: "newCurator", type: "bool" },
            { indexed: false, name: "description", type: "string" },
          ],
          name: "ProposalAdded",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "proposalID", type: "uint256" },
            { indexed: false, name: "position", type: "bool" },
            { indexed: true, name: "voter", type: "address" },
          ],
          name: "Voted",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "proposalID", type: "uint256" },
            { indexed: false, name: "result", type: "bool" },
            { indexed: false, name: "quorum", type: "uint256" },
          ],
          name: "ProposalTallied",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [{ indexed: true, name: "_newCurator", type: "address" }],
          name: "NewCurator",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "_recipient", type: "address" },
            { indexed: false, name: "_allowed", type: "bool" },
          ],
          name: "AllowedRecipientChanged",
          type: "event",
        },
      ],
    },
    {
      address: "0x6fC21092DA55B392b045eD78F4732bff3C580e2c",
      name: "FireflyRegistrar",
      abi: [
        {
          constant: false,
          inputs: [{ name: "fee", type: "uint256" }],
          name: "setFee",
          outputs: [],
          payable: false,
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "admin", type: "address" }],
          name: "setAdmin",
          outputs: [],
          payable: false,
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "config",
          outputs: [
            { name: "ens", type: "address" },
            { name: "nodeHash", type: "bytes32" },
            { name: "admin", type: "address" },
            { name: "fee", type: "uint256" },
            { name: "defaultResolver", type: "address" },
          ],
          payable: false,
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "nodeHash", type: "bytes32" }],
          name: "donations",
          outputs: [{ name: "donation", type: "uint256" }],
          payable: false,
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "nodeHash", type: "bytes32" }],
          name: "donate",
          outputs: [],
          payable: true,
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "defaultResolver", type: "address" }],
          name: "setDefaultResolver",
          outputs: [],
          payable: false,
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "stats",
          outputs: [
            { name: "nameCount", type: "uint256" },
            { name: "totalPaid", type: "uint256" },
            { name: "balance", type: "uint256" },
          ],
          payable: false,
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "fee",
          outputs: [{ name: "fee", type: "uint256" }],
          payable: false,
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "label", type: "string" }],
          name: "register",
          outputs: [],
          payable: true,
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "target", type: "address" },
            { name: "amount", type: "uint256" },
          ],
          name: "withdraw",
          outputs: [],
          payable: false,
          type: "function",
        },
        {
          inputs: [
            { name: "ens", type: "address" },
            { name: "nodeHash", type: "bytes32" },
            { name: "defaultResolver", type: "address" },
          ],
          payable: false,
          type: "constructor",
        },
        { payable: true, type: "fallback" },
        {
          anonymous: false,
          inputs: [
            { indexed: false, name: "oldAdmin", type: "address" },
            { indexed: false, name: "newAdmin", type: "address" },
          ],
          name: "adminChanged",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: false, name: "oldFee", type: "uint256" },
            { indexed: false, name: "newFee", type: "uint256" },
          ],
          name: "feeChanged",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: false, name: "oldResolver", type: "address" },
            { indexed: false, name: "newResolver", type: "address" },
          ],
          name: "defaultResolverChanged",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: false, name: "target", type: "address" },
            { indexed: false, name: "amount", type: "uint256" },
          ],
          name: "didWithdraw",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "nodeHash", type: "bytes32" },
            { indexed: false, name: "owner", type: "address" },
            { indexed: false, name: "fee", type: "uint256" },
          ],
          name: "nameRegistered",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "nodeHash", type: "bytes32" },
            { indexed: false, name: "amount", type: "uint256" },
          ],
          name: "donation",
          type: "event",
        },
      ],
    },
  ],
  goerli: [
    {
      address: '0x8fDdCBB7c0AfE04fD0282Fdb11aB5EFC6f027c13',
      name: 'Animal Goerli',
      abi: [
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
          "type": "function",
          "payable": true
        },
        {
          "inputs": [],
          "name": "withdraw",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "availableToWithdraw",
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
          "inputs": [],
          "name": "getChainID",
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
          "type": "function",
          "constant": true
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
        }
      ]
    },
  ],
  bsctest: [
    {
      address: '0xFB4D47FA93Bdc9f6367c6a5C0dD368b1b0C0093e',
      name: 'Animal BSC Test',
      abi: [
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
          "type": "function",
          "payable": true
        },
        {
          "inputs": [],
          "name": "withdraw",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "availableToWithdraw",
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
          "inputs": [],
          "name": "getChainID",
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
          "type": "function",
          "constant": true
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
        }
      ]
    },
  ],
  polygon: [
    {
      address: '0xFB4D47FA93Bdc9f6367c6a5C0dD368b1b0C0093e',
      name: 'Animal Matic Mumbai',
      abi: [
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
          "type": "function",
          "payable": true
        },
        {
          "inputs": [],
          "name": "withdraw",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "availableToWithdraw",
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
          "inputs": [],
          "name": "getChainID",
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
          "type": "function",
          "constant": true
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
        }
      ]
    },
  ]
};
