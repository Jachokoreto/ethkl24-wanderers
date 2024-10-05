import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const externalContracts = {
  1: {
    DAI: {
      address: "0xbFfC48ed6462BE8A45a377CA3D480959e5B7B690",
      abi: [
        {
          inputs: [
            {
              internalType: "string",
              name: "username",
              type: "string",
            },
          ],
          name: "createUserProfile",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "target",
              type: "address",
            },
            {
              internalType: "bool",
              name: "isLike",
              type: "bool",
            },
            {
              internalType: "string",
              name: "summary",
              type: "string",
            },
          ],
          name: "swipe",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "swiper",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "target",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bool",
              name: "isLike",
              type: "bool",
            },
            {
              indexed: false,
              internalType: "string",
              name: "summary",
              type: "string",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
          ],
          name: "Swiped",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "username",
              type: "string",
            },
          ],
          name: "UserProfileCreated",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "user",
              type: "address",
            },
          ],
          name: "getLatestMemoryId",
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
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "memoryid",
              type: "uint256",
            },
          ],
          name: "getMemoryStory",
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
              name: "user",
              type: "address",
            },
          ],
          name: "getSwipes",
          outputs: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "swiper",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "target",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "summary",
                  type: "string",
                },
                {
                  internalType: "bool",
                  name: "isLike",
                  type: "bool",
                },
              ],
              internalType: "struct SwipeContract.Swipe[]",
              name: "",
              type: "tuple[]",
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
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "swipes",
          outputs: [
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "swiper",
              type: "address",
            },
            {
              internalType: "address",
              name: "target",
              type: "address",
            },
            {
              internalType: "string",
              name: "summary",
              type: "string",
            },
            {
              internalType: "bool",
              name: "isLike",
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
              name: "",
              type: "address",
            },
          ],
          name: "userProfiles",
          outputs: [
            {
              internalType: "address",
              name: "userAddress",
              type: "address",
            },
            {
              internalType: "string",
              name: "username",
              type: "string",
            },
            {
              internalType: "bool",
              name: "exists",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
    },
  },
} as const;
// const externalContracts = {} as const;

export default externalContracts satisfies GenericContractsDeclaration;
