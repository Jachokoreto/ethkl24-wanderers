import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import SwipeContractABI from "./NFTAbi.json";
import Web3 from "web3";

// Add your compiled contract's ABI here

const CONTRACT_ADDRESS = "0x91e1291C6983815dA023e160FdeDc3C18E2d7166"; // Replace with your deployed contract address

export const Memory = () => {
  const [web3, setWeb3] = useState<any>(null);
  const [account, setAccount] = useState("");

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
          setAccount(accounts[0]);
        } catch (error) {
          console.error("Failed to connect account:", error);
        }
      } else {
        console.error("Please install MetaMask or use a web3-compatible browser.");
      }
    };

    initWeb3();
  }, []);

  const mintNFT = async () => {
    if (web3 && account) {
      const contract = new web3.eth.Contract(SwipeContractABI, CONTRACT_ADDRESS);
      try {
        // Call the contract's swipe method
        await contract.methods.mint(account, "This is testing").send({ from: account });
        console.log("Story liked!");
      } catch (error) {
        console.error("Error liking story:", error);
      }
    }
  };

  return (
    <div>
      <h1>Memory</h1>
      <Button text="Mint" onClick={mintNFT} />
    </div>
  );
};
