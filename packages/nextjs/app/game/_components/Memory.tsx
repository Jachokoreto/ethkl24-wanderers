import React, { useEffect, useState } from "react";
import { Button } from "./Button"; // Assuming Button is your custom component
import { nftContractAbi, nft_CONTRACT_ADDRESS } from "~~/contracts/nftContract";
import Web3 from "web3";

export const Memory = () => {
  const [web3, setWeb3] = useState<any>(null);
  const [account, setAccount] = useState<string>("");

  useEffect(() => {
    // Initialize Web3 for Scroll Sepolia
    const initWeb3 = async () => {
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        // Create a new Web3 instance with the Ethereum provider
        const web3Instance = new Web3(window.ethereum);

        // Define Scroll Sepolia chain details
        const scrollSepoliaChain = {
          chainId: "0x8274F", // Correct Chain ID for Scroll Sepolia
          chainName: "Scroll Sepolia",
          rpcUrls: ["https://sepolia-rpc.scroll.io"],
          nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
          },
          blockExplorerUrls: ["https://sepolia.scrollscan.com"],
        };

        try {
          // Check if the user is connected to the correct network
          const currentChainId = await window.ethereum.request({ method: "eth_chainId" });
          if (currentChainId !== scrollSepoliaChain.chainId) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [scrollSepoliaChain],
            });
          }
        } catch (error) {
          console.error("Failed to switch to Scroll Sepolia:", error);
        }

        // Request account access
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const accounts = await web3Instance.eth.getAccounts();
          setWeb3(web3Instance);
          setAccount(accounts[0]); // Set the connected account
        } catch (error) {
          console.error("Failed to connect account:", error);
        }
      } else {
        console.error("Please install MetaMask or use a web3-compatible browser.");
      }
    };

    initWeb3();
  }, []);

  // Mint NFT function
  const mintNFT = async () => {
    if (web3 && account) {
      const contract = new web3.eth.Contract(nftContractAbi, nft_CONTRACT_ADDRESS);
      try {
        // Call the contract's mint method
        await contract.methods.mint(account, "This is testing").send({ from: account });
        console.log("NFT minted successfully!");
      } catch (error) {
        console.error("Error minting NFT:", error);
      }
    } else {
      console.error("Web3 or account not initialized.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-white/80  rounded-full pt-4 pb-3 px-10 mb-10 mt-4">
        <h1>💋 De Dating Sims 🎮</h1>
      </div>
      <h1 className="text-white">Memory</h1>
      <Button
        text="Mint"
        onClick={mintNFT} // Simplified call
      />
    </div>
  );
};
