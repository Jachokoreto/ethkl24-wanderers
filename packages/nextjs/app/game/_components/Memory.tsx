import React, { use, useEffect, useState } from "react";
import { Button } from "./Button";
import { useAccount, useWriteContract } from "wagmi";
import { swipeContractAbi, swipe_CONTRACT_ADDRESS } from "~~/contracts/swipeContract";

// import Web3 from "web3";

export const Memory = () => {
  const { writeContract } = useWriteContract();
  const account = useAccount();

  // const mintNFT = async () => {
  //   if (web3 && account) {
  //     const contract = new web3.eth.Contract(SwipeContractABI, CONTRACT_ADDRESS);
  //     try {
  //       // Call the contract's swipe method
  //       await contract.methods.mint(account, "This is testing").send({ from: account });
  //       console.log("Story liked!");
  //     } catch (error) {
  //       console.error("Error liking story:", error);
  //     }
  //   }
  // };

  return (
    <div>
      <h1>Memory</h1>
      <Button
        text="Mint"
        onClick={() => {
          writeContract({
            abi: swipeContractAbi,
            address: swipe_CONTRACT_ADDRESS,
            functionName: "mint",
            args: [account, "This is testing"],
          });
        }}
      />
    </div>
  );
};
