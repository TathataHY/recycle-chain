/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  RecycleChain,
  RecycleChainInterface,
} from "../../contracts/RecycleChain";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "manufacturer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "location",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "contact",
        type: "string",
      },
    ],
    name: "ManufacturerRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "productId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "manufacturer",
        type: "address",
      },
    ],
    name: "ProductCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string[]",
        name: "itemIds",
        type: "string[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "productId",
        type: "uint256",
      },
    ],
    name: "ProductItemsAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string[]",
        name: "itemIds",
        type: "string[]",
      },
      {
        indexed: false,
        internalType: "enum RecycleChain.ProductStatus",
        name: "status",
        type: "uint8",
      },
    ],
    name: "ProductItemsStatusChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "productId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "weight",
        type: "uint256",
      },
    ],
    name: "ToxicItemCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string[]",
        name: "toxicNames",
        type: "string[]",
      },
      {
        internalType: "uint256[]",
        name: "toxicWeights",
        type: "uint256[]",
      },
    ],
    name: "addProduct",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "productId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
    ],
    name: "addProductItems",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "inventory",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "manufacturers",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "location",
        type: "string",
      },
      {
        internalType: "string",
        name: "contact",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "productCounter",
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
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "productItems",
    outputs: [
      {
        internalType: "string",
        name: "id",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "productId",
        type: "uint256",
      },
      {
        internalType: "enum RecycleChain.ProductStatus",
        name: "status",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "products",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "manufacturer",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string[]",
        name: "itemIds",
        type: "string[]",
      },
    ],
    name: "recycleProductItems",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "location",
        type: "string",
      },
      {
        internalType: "string",
        name: "contact",
        type: "string",
      },
    ],
    name: "registerManufacturer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string[]",
        name: "itemIds",
        type: "string[]",
      },
    ],
    name: "returnProductItems",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string[]",
        name: "itemIds",
        type: "string[]",
      },
    ],
    name: "sellProductItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080604052348015600f57600080fd5b5033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060008081905550613115806100676000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c80636b5eb09c116100715780636b5eb09c146101775780637acc0b20146101a95780638da5cb5b146101dc578063edb4a1e4146101fa578063f15533ed14610216578063f923803714610232576100b4565b806304e13137146100b95780631d0fc9db146100d55780631f16653b146100f15780633ca278a81461010f57806348788df91461012b57806368f222fd14610147575b600080fd5b6100d360048036038101906100ce919061198e565b610264565b005b6100ef60048036038101906100ea9190611b14565b610614565b005b6100f96107d0565b6040516101069190611bca565b60405180910390f35b61012960048036038101906101249190611ccb565b6107d6565b005b61014560048036038101906101409190611ccb565b610a5b565b005b610161600480360381019061015c9190611d72565b610cdf565b60405161016e9190611e31565b60405180910390f35b610191600480360381019061018c9190611e53565b610d98565b6040516101a093929190611e80565b60405180910390f35b6101c360048036038101906101be9190611ecc565b610f5a565b6040516101d39493929190611f08565b60405180910390f35b6101e4611032565b6040516101f19190611f75565b60405180910390f35b610214600480360381019061020f9190612053565b611058565b005b610230600480360381019061022b9190611ccb565b6113c9565b005b61024c600480360381019061024791906120fa565b61164e565b60405161025b939291906121ba565b60405180910390f35b600a8111156102a8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161029f9061226a565b60405180910390fd5b6002600083815260200190815260200160002060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461034c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610343906122fc565b60405180910390fd5b816002600084815260200190815260200160002060000154146103a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161039b90612368565b60405180910390fd5b60008167ffffffffffffffff8111156103c0576103bf6119e9565b5b6040519080825280602002602001820160405280156103f357816020015b60608152602001906001900390816103de5790505b50905060005b828110156105a857600061040c85611723565b610442600184600260008a81526020019081526020016000206002015461043391906123b7565b61043d91906123b7565b611723565b604051602001610453929190612473565b604051602081830303815290604052905080838381518110610478576104776124a2565b5b6020026020010181905250600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819080600181540180825580915050600190039060005260206000200160009091909190915090816104f491906126dd565b50600060405180606001604052808381526020018781526020016000600381111561052257610521612143565b5b81525090508060038360405161053891906127af565b9081526020016040518091039020600082015181600001908161055b91906126dd565b506020820151816001015560408201518160020160006101000a81548160ff0219169083600381111561059157610590612143565b5b0217905550905050505080806001019150506103f9565b50816002600085815260200190815260200160002060020160008282546105cf91906123b7565b925050819055507f83e3b6fdf797f14fb15b27293b759b0b9145a24a3260a276567713e273c5787781846040516106079291906128d2565b60405180910390a1505050565b6000835111610658576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161064f90612974565b60405180910390fd5b6000600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000180546106a790612500565b9050146106e9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106e0906129e0565b60405180910390fd5b6000604051806060016040528085815260200184815260200183815250905080600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082015181600001908161075d91906126dd565b50602082015181600101908161077391906126dd565b50604082015181600201908161078991906126dd565b509050507f57b346b79fe14f8142d096bf73f762b9d4ef542e0011250f22e5499155b54dac338585856040516107c29493929190612a00565b60405180910390a150505050565b60005481565b60005b8151811015610a1d5760008282815181106107f7576107f66124a2565b5b60200260200101519050600060038260405161081391906127af565b9081526020016040518091039020600101549050600060038360405161083991906127af565b9081526020016040518091039020600101540361088b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161088290612aa6565b60405180910390fd5b6002600082815260200190815260200160002060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461092f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161092690612b38565b60405180910390fd5b6001600381111561094357610942612143565b5b60038360405161095391906127af565b908152602001604051809103902060020160009054906101000a900460ff16600381111561098457610983612143565b5b146109c4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109bb90612ba4565b60405180910390fd5b60026003836040516109d691906127af565b908152602001604051809103902060020160006101000a81548160ff02191690836003811115610a0957610a08612143565b5b0217905550505080806001019150506107d9565b507fd9a749387c94794c130d3387d15255e951f4629ee4c68c2ee584ac608730e177816002604051610a50929190612bc4565b60405180910390a150565b60005b8151811015610ca1576000828281518110610a7c57610a7b6124a2565b5b602002602001015190506000600382604051610a9891906127af565b90815260200160405180910390206001015490506000600383604051610abe91906127af565b90815260200160405180910390206001015403610b10576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b0790612aa6565b60405180910390fd5b6002600082815260200190815260200160002060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610bb4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bab90612c66565b60405180910390fd5b60026003811115610bc857610bc7612143565b5b600383604051610bd891906127af565b908152602001604051809103902060020160009054906101000a900460ff166003811115610c0957610c08612143565b5b14610c49576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c4090612cd2565b60405180910390fd5b60038083604051610c5a91906127af565b908152602001604051809103902060020160006101000a81548160ff02191690836003811115610c8d57610c8c612143565b5b021790555050508080600101915050610a5e565b507fd9a749387c94794c130d3387d15255e951f4629ee4c68c2ee584ac608730e177816003604051610cd4929190612bc4565b60405180910390a150565b60046020528160005260406000208181548110610cfb57600080fd5b90600052602060002001600091509150508054610d1790612500565b80601f0160208091040260200160405190810160405280929190818152602001828054610d4390612500565b8015610d905780601f10610d6557610100808354040283529160200191610d90565b820191906000526020600020905b815481529060010190602001808311610d7357829003601f168201915b505050505081565b6005602052806000526040600020600091509050806000018054610dbb90612500565b80601f0160208091040260200160405190810160405280929190818152602001828054610de790612500565b8015610e345780601f10610e0957610100808354040283529160200191610e34565b820191906000526020600020905b815481529060010190602001808311610e1757829003601f168201915b505050505090806001018054610e4990612500565b80601f0160208091040260200160405190810160405280929190818152602001828054610e7590612500565b8015610ec25780601f10610e9757610100808354040283529160200191610ec2565b820191906000526020600020905b815481529060010190602001808311610ea557829003601f168201915b505050505090806002018054610ed790612500565b80601f0160208091040260200160405190810160405280929190818152602001828054610f0390612500565b8015610f505780601f10610f2557610100808354040283529160200191610f50565b820191906000526020600020905b815481529060010190602001808311610f3357829003601f168201915b5050505050905083565b6002602052806000526040600020600091509050806000015490806001018054610f8390612500565b80601f0160208091040260200160405190810160405280929190818152602001828054610faf90612500565b8015610ffc5780601f10610fd157610100808354040283529160200191610ffc565b820191906000526020600020905b815481529060010190602001808311610fdf57829003601f168201915b5050505050908060020154908060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905084565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600083511161109c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161109390612d3e565b60405180910390fd5b60008251116110e0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110d790612dd0565b60405180910390fd5b8051825114611124576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161111b90612e62565b60405180910390fd5b6000600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001805461117390612500565b9050116111b5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111ac90612ece565b60405180910390fd5b60008060008154809291906111c990612eee565b91905055905060006002600083815260200190815260200160002090508181600001819055508481600101908161120091906126dd565b5060008160020181905550338160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507faf6ffb6277511513e7d579327cc1fc57f0266df2fb11a60b13487b8c9cd2c38882863360405161128193929190612f36565b60405180910390a160005b84518110156113c157600060405180604001604052808784815181106112b5576112b46124a2565b5b602002602001015181526020018684815181106112d5576112d46124a2565b5b6020026020010151815250905060026000858152602001908152602001600020600401819080600181540180825580915050600190039060005260206000209060020201600090919091909150600082015181600001908161133791906126dd565b506020820151816001015550507f8da7761d083dc8b6cf8015513c133dc99b31548fcf7b36249437199c03b6e6f284878481518110611379576113786124a2565b5b6020026020010151878581518110611394576113936124a2565b5b60200260200101516040516113ab93929190612f74565b60405180910390a150808060010191505061128c565b505050505050565b60005b81518110156116105760008282815181106113ea576113e96124a2565b5b60200260200101519050600060038260405161140691906127af565b9081526020016040518091039020600101549050600060038360405161142c91906127af565b9081526020016040518091039020600101540361147e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161147590612aa6565b60405180910390fd5b6002600082815260200190815260200160002060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611522576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161151990613024565b60405180910390fd5b6000600381111561153657611535612143565b5b60038360405161154691906127af565b908152602001604051809103902060020160009054906101000a900460ff16600381111561157757611576612143565b5b146115b7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115ae90613090565b60405180910390fd5b60016003836040516115c991906127af565b908152602001604051809103902060020160006101000a81548160ff021916908360038111156115fc576115fb612143565b5b0217905550505080806001019150506113cc565b507fd9a749387c94794c130d3387d15255e951f4629ee4c68c2ee584ac608730e177816001604051611643929190612bc4565b60405180910390a150565b60038180516020810182018051848252602083016020850120818352809550505050505060009150905080600001805461168790612500565b80601f01602080910402602001604051908101604052809291908181526020018280546116b390612500565b80156117005780601f106116d557610100808354040283529160200191611700565b820191906000526020600020905b8154815290600101906020018083116116e357829003601f168201915b5050505050908060010154908060020160009054906101000a900460ff16905083565b606060006001611732846117f1565b01905060008167ffffffffffffffff811115611751576117506119e9565b5b6040519080825280601f01601f1916602001820160405280156117835781602001600182028036833780820191505090505b509050600082602001820190505b6001156117e6578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a85816117da576117d96130b0565b5b04945060008503611791575b819350505050919050565b600080600090507a184f03e93ff9f4daa797ed6e38ed64bf6a1f010000000000000000831061184f577a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008381611845576118446130b0565b5b0492506040810190505b6d04ee2d6d415b85acef8100000000831061188c576d04ee2d6d415b85acef81000000008381611882576118816130b0565b5b0492506020810190505b662386f26fc1000083106118bb57662386f26fc1000083816118b1576118b06130b0565b5b0492506010810190505b6305f5e10083106118e4576305f5e10083816118da576118d96130b0565b5b0492506008810190505b61271083106119095761271083816118ff576118fe6130b0565b5b0492506004810190505b6064831061192c5760648381611922576119216130b0565b5b0492506002810190505b600a831061193b576001810190505b80915050919050565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b61196b81611958565b811461197657600080fd5b50565b60008135905061198881611962565b92915050565b600080604083850312156119a5576119a461194e565b5b60006119b385828601611979565b92505060206119c485828601611979565b9150509250929050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611a21826119d8565b810181811067ffffffffffffffff82111715611a4057611a3f6119e9565b5b80604052505050565b6000611a53611944565b9050611a5f8282611a18565b919050565b600067ffffffffffffffff821115611a7f57611a7e6119e9565b5b611a88826119d8565b9050602081019050919050565b82818337600083830152505050565b6000611ab7611ab284611a64565b611a49565b905082815260208101848484011115611ad357611ad26119d3565b5b611ade848285611a95565b509392505050565b600082601f830112611afb57611afa6119ce565b5b8135611b0b848260208601611aa4565b91505092915050565b600080600060608486031215611b2d57611b2c61194e565b5b600084013567ffffffffffffffff811115611b4b57611b4a611953565b5b611b5786828701611ae6565b935050602084013567ffffffffffffffff811115611b7857611b77611953565b5b611b8486828701611ae6565b925050604084013567ffffffffffffffff811115611ba557611ba4611953565b5b611bb186828701611ae6565b9150509250925092565b611bc481611958565b82525050565b6000602082019050611bdf6000830184611bbb565b92915050565b600067ffffffffffffffff821115611c0057611bff6119e9565b5b602082029050602081019050919050565b600080fd5b6000611c29611c2484611be5565b611a49565b90508083825260208201905060208402830185811115611c4c57611c4b611c11565b5b835b81811015611c9357803567ffffffffffffffff811115611c7157611c706119ce565b5b808601611c7e8982611ae6565b85526020850194505050602081019050611c4e565b5050509392505050565b600082601f830112611cb257611cb16119ce565b5b8135611cc2848260208601611c16565b91505092915050565b600060208284031215611ce157611ce061194e565b5b600082013567ffffffffffffffff811115611cff57611cfe611953565b5b611d0b84828501611c9d565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611d3f82611d14565b9050919050565b611d4f81611d34565b8114611d5a57600080fd5b50565b600081359050611d6c81611d46565b92915050565b60008060408385031215611d8957611d8861194e565b5b6000611d9785828601611d5d565b9250506020611da885828601611979565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611dec578082015181840152602081019050611dd1565b60008484015250505050565b6000611e0382611db2565b611e0d8185611dbd565b9350611e1d818560208601611dce565b611e26816119d8565b840191505092915050565b60006020820190508181036000830152611e4b8184611df8565b905092915050565b600060208284031215611e6957611e6861194e565b5b6000611e7784828501611d5d565b91505092915050565b60006060820190508181036000830152611e9a8186611df8565b90508181036020830152611eae8185611df8565b90508181036040830152611ec28184611df8565b9050949350505050565b600060208284031215611ee257611ee161194e565b5b6000611ef084828501611979565b91505092915050565b611f0281611d34565b82525050565b6000608082019050611f1d6000830187611bbb565b8181036020830152611f2f8186611df8565b9050611f3e6040830185611bbb565b611f4b6060830184611ef9565b95945050505050565b6000611f5f82611d14565b9050919050565b611f6f81611f54565b82525050565b6000602082019050611f8a6000830184611f66565b92915050565b600067ffffffffffffffff821115611fab57611faa6119e9565b5b602082029050602081019050919050565b6000611fcf611fca84611f90565b611a49565b90508083825260208201905060208402830185811115611ff257611ff1611c11565b5b835b8181101561201b57806120078882611979565b845260208401935050602081019050611ff4565b5050509392505050565b600082601f83011261203a576120396119ce565b5b813561204a848260208601611fbc565b91505092915050565b60008060006060848603121561206c5761206b61194e565b5b600084013567ffffffffffffffff81111561208a57612089611953565b5b61209686828701611ae6565b935050602084013567ffffffffffffffff8111156120b7576120b6611953565b5b6120c386828701611c9d565b925050604084013567ffffffffffffffff8111156120e4576120e3611953565b5b6120f086828701612025565b9150509250925092565b6000602082840312156121105761210f61194e565b5b600082013567ffffffffffffffff81111561212e5761212d611953565b5b61213a84828501611ae6565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6004811061218357612182612143565b5b50565b600081905061219482612172565b919050565b60006121a482612186565b9050919050565b6121b481612199565b82525050565b600060608201905081810360008301526121d48186611df8565b90506121e36020830185611bbb565b6121f060408301846121ab565b949350505050565b7f5175616e74697479206d757374206265206c657373207468616e206f7220657160008201527f75616c20746f2031300000000000000000000000000000000000000000000000602082015250565b6000612254602983611dbd565b915061225f826121f8565b604082019050919050565b6000602082019050818103600083015261228381612247565b9050919050565b7f4f6e6c79206d616e7566616374757265722063616e206164642070726f64756360008201527f74206974656d7300000000000000000000000000000000000000000000000000602082015250565b60006122e6602783611dbd565b91506122f18261228a565b604082019050919050565b60006020820190508181036000830152612315816122d9565b9050919050565b7f50726f64756374206e6f7420666f756e64000000000000000000000000000000600082015250565b6000612352601183611dbd565b915061235d8261231c565b602082019050919050565b6000602082019050818103600083015261238181612345565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006123c282611958565b91506123cd83611958565b92508282019050808211156123e5576123e4612388565b5b92915050565b600081905092915050565b600061240182611db2565b61240b81856123eb565b935061241b818560208601611dce565b80840191505092915050565b7f2d00000000000000000000000000000000000000000000000000000000000000600082015250565b600061245d6001836123eb565b915061246882612427565b600182019050919050565b600061247f82856123f6565b915061248a82612450565b915061249682846123f6565b91508190509392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061251857607f821691505b60208210810361252b5761252a6124d1565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026125937fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82612556565b61259d8683612556565b95508019841693508086168417925050509392505050565b6000819050919050565b60006125da6125d56125d084611958565b6125b5565b611958565b9050919050565b6000819050919050565b6125f4836125bf565b612608612600826125e1565b848454612563565b825550505050565b600090565b61261d612610565b6126288184846125eb565b505050565b5b8181101561264c57612641600082612615565b60018101905061262e565b5050565b601f8211156126915761266281612531565b61266b84612546565b8101602085101561267a578190505b61268e61268685612546565b83018261262d565b50505b505050565b600082821c905092915050565b60006126b460001984600802612696565b1980831691505092915050565b60006126cd83836126a3565b9150826002028217905092915050565b6126e682611db2565b67ffffffffffffffff8111156126ff576126fe6119e9565b5b6127098254612500565b612714828285612650565b600060209050601f8311600181146127475760008415612735578287015190505b61273f85826126c1565b8655506127a7565b601f19841661275586612531565b60005b8281101561277d57848901518255600182019150602085019450602081019050612758565b8683101561279a5784890151612796601f8916826126a3565b8355505b6001600288020188555050505b505050505050565b60006127bb82846123f6565b915081905092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600082825260208201905092915050565b600061280e82611db2565b61281881856127f2565b9350612828818560208601611dce565b612831816119d8565b840191505092915050565b60006128488383612803565b905092915050565b6000602082019050919050565b6000612868826127c6565b61287281856127d1565b935083602082028501612884856127e2565b8060005b858110156128c057848403895281516128a1858261283c565b94506128ac83612850565b925060208a01995050600181019050612888565b50829750879550505050505092915050565b600060408201905081810360008301526128ec818561285d565b90506128fb6020830184611bbb565b9392505050565b7f4d616e756661637475726572206e616d652063616e6e6f7420626520656d707460008201527f7900000000000000000000000000000000000000000000000000000000000000602082015250565b600061295e602183611dbd565b915061296982612902565b604082019050919050565b6000602082019050818103600083015261298d81612951565b9050919050565b7f4d616e75666163747572657220616c7265616479207265676973746572656400600082015250565b60006129ca601f83611dbd565b91506129d582612994565b602082019050919050565b600060208201905081810360008301526129f9816129bd565b9050919050565b6000608082019050612a156000830187611ef9565b8181036020830152612a278186611df8565b90508181036040830152612a3b8185611df8565b90508181036060830152612a4f8184611df8565b905095945050505050565b7f4974656d206e6f7420666f756e64000000000000000000000000000000000000600082015250565b6000612a90600e83611dbd565b9150612a9b82612a5a565b602082019050919050565b60006020820190508181036000830152612abf81612a83565b9050919050565b7f4f6e6c79206d616e7566616374757265722063616e2072657475726e2070726f60008201527f64756374206974656d7300000000000000000000000000000000000000000000602082015250565b6000612b22602a83611dbd565b9150612b2d82612ac6565b604082019050919050565b60006020820190508181036000830152612b5181612b15565b9050919050565b7f4974656d206e6f7420736f6c6400000000000000000000000000000000000000600082015250565b6000612b8e600d83611dbd565b9150612b9982612b58565b602082019050919050565b60006020820190508181036000830152612bbd81612b81565b9050919050565b60006040820190508181036000830152612bde818561285d565b9050612bed60208301846121ab565b9392505050565b7f4f6e6c79206d616e7566616374757265722063616e2072656379636c6520707260008201527f6f64756374206974656d73000000000000000000000000000000000000000000602082015250565b6000612c50602b83611dbd565b9150612c5b82612bf4565b604082019050919050565b60006020820190508181036000830152612c7f81612c43565b9050919050565b7f4974656d206e6f742072657475726e6564000000000000000000000000000000600082015250565b6000612cbc601183611dbd565b9150612cc782612c86565b602082019050919050565b60006020820190508181036000830152612ceb81612caf565b9050919050565b7f50726f64756374206e616d652063616e6e6f7420626520656d70747900000000600082015250565b6000612d28601c83611dbd565b9150612d3382612cf2565b602082019050919050565b60006020820190508181036000830152612d5781612d1b565b9050919050565b7f4174206c65617374206f6e6520746f786963206974656d20697320726571756960008201527f7265640000000000000000000000000000000000000000000000000000000000602082015250565b6000612dba602383611dbd565b9150612dc582612d5e565b604082019050919050565b60006020820190508181036000830152612de981612dad565b9050919050565b7f546f786963206974656d206e616d657320616e642077656967687473206d757360008201527f742068617665207468652073616d65206c656e67746800000000000000000000602082015250565b6000612e4c603683611dbd565b9150612e5782612df0565b604082019050919050565b60006020820190508181036000830152612e7b81612e3f565b9050919050565b7f4d616e756661637475726572206e6f7420726567697374657265640000000000600082015250565b6000612eb8601b83611dbd565b9150612ec382612e82565b602082019050919050565b60006020820190508181036000830152612ee781612eab565b9050919050565b6000612ef982611958565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203612f2b57612f2a612388565b5b600182019050919050565b6000606082019050612f4b6000830186611bbb565b8181036020830152612f5d8185611df8565b9050612f6c6040830184611ef9565b949350505050565b6000606082019050612f896000830186611bbb565b8181036020830152612f9b8185611df8565b9050612faa6040830184611bbb565b949350505050565b7f4f6e6c79206d616e7566616374757265722063616e2073656c6c2070726f647560008201527f6374206974656d73000000000000000000000000000000000000000000000000602082015250565b600061300e602883611dbd565b915061301982612fb2565b604082019050919050565b6000602082019050818103600083015261303d81613001565b9050919050565b7f4974656d206e6f74206d616e7566616374757265640000000000000000000000600082015250565b600061307a601583611dbd565b915061308582613044565b602082019050919050565b600060208201905081810360008301526130a98161306d565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fdfea264697066735822122086a7d91ca797bdde045b680092bb702c3a074a458b451d0cefd2995d7b9703fb64736f6c634300081b0033";

type RecycleChainConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RecycleChainConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class RecycleChain__factory extends ContractFactory {
  constructor(...args: RecycleChainConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      RecycleChain & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): RecycleChain__factory {
    return super.connect(runner) as RecycleChain__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RecycleChainInterface {
    return new Interface(_abi) as RecycleChainInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): RecycleChain {
    return new Contract(address, _abi, runner) as unknown as RecycleChain;
  }
}
