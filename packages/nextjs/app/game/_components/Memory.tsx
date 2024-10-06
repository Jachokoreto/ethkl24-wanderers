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
    <div className="flex flex-col justify-center items-center">
      <div className="bg-white/80  rounded-full pt-4 pb-3 px-10 mb-10 mt-4">
        <h1>💋 De Dating Sims 🎮</h1>
      </div>
      <h1 className="text-white">Memory</h1>
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
