import { task, types } from "hardhat/config";

const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "admin_",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "fundraiser",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fundraisingAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "documentName",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "documentUri",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "documentHash",
        type: "bytes32",
      },
    ],
    name: "FundraiserCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "OPERATOR_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "fundraisingAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "name",
            type: "bytes32",
          },
          {
            internalType: "string",
            name: "uri",
            type: "string",
          },
          {
            internalType: "bytes32",
            name: "hash",
            type: "bytes32",
          },
        ],
        internalType: "struct IFundraiserStruct.DocumentParams",
        name: "document",
        type: "tuple",
      },
    ],
    name: "createFundraiser",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "fundraiserId",
        type: "uint256",
      },
    ],
    name: "fundraiserById",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "offset",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "limit",
        type: "uint256",
      },
    ],
    name: "fundraisers",
    outputs: [
      {
        internalType: "address[]",
        name: "fundraisersAddresses",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fundraisersCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getRoleMember",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleMemberCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "fundraiserAddress",
        type: "address",
      },
    ],
    name: "isFundraiserExist",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

task("create-fundraiser", "Create new fundraiser smart-contract")
  .addParam("contract", "Factory smart-contract address", undefined, types.string)
  .addParam("fundraisingAmount", "Amount of fundraising", "1000000000000000000", types.string)
  .addParam(
    "beneficiary",
    "An address that will be able to withdraw the funds collected",
    "0x2aE4874B596F9CbE37d8709B84063781D7Ce9C3d",
    types.string
  )
  .addParam(
    "documents",
    "Parameters related to documents supporting the purpose of fundraising",
    {
      name: "0x48656c6c6f000000000000000000000000000000000000000000000000000000",
      uri: `Hello ${new Date()}`,
      hash: "0x48656c6c6f000000000000000000000000000000000000000000000000000000",
    },
    types.json
  )
  .setAction(
    async (
      {
        contract,
        fundraisingAmount,
        beneficiary,
        documents,
      }: {
        contract: string;
        fundraisingAmount: string;
        beneficiary: string;
        documents: { name: string; uri: string; hash: string };
      },
      { ethers }
    ) => {
      try {
        const [deployer] = await ethers.getSigners();
        const factoryContract = new ethers.Contract(contract, abi);
        const factoryContractWithSigner = factoryContract.connect(deployer);

        console.log(`\n\u250F 🚀 Call createFundraiser method on GooddoerFactory: ${contract} with params \n\u2517`);
        console.log(`  \u2523 📦 Amount of fundraising: ${fundraisingAmount}`);
        console.log(`  \u2523 📦 Beneficiary: ${beneficiary}`);
        console.log(`  \u2517 📦 Document: ${documents.name} ${documents.uri} ${documents.hash} \n`);

        const tx = await factoryContractWithSigner.createFundraiser(fundraisingAmount, beneficiary, documents);
        await tx.wait();

        console.log(`🚀 Success: https://goerli.etherscan.io/tx/${tx.hash}`);
      } catch (e) {
        console.error(e);
      }
    }
  );
