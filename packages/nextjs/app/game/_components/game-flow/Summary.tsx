import React, { useEffect, useState } from "react";
import { Button } from "../Button";
import { Card } from "../Card";
import { motion } from "framer-motion";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { nftContractAbi, nft_CONTRACT_ADDRESS } from "~~/contracts/nftContract";
import { swipeContractAbi, swipe_CONTRACT_ADDRESS } from "~~/contracts/swipeContract";
// import Web3 from "web3";
import { useGlobalState } from "~~/services/store/store";
import { useFirestore } from "~~/services/useFirestore";

// Add your compiled contract's ABI here

const CONTRACT_ADDRESS = "0xbFfC48ed6462BE8A45a377CA3D480959e5B7B690"; // Replace with your deployed contract address

const story =
  'In the quaint downtown cafe, lined with books and the soft hum of indie music, Ellie bumped into Alex, her old high school crush, purely by chance. The surprise was evident on both faces.\n\n"Alex? Wow, this is unexpected!" Ellie\'s heart raced as she balanced her tray.\n\n"Ellie, right? I can\'t believe it\'s been so long!" Alex smiled, looking genuinely pleased. They found a table near the window, the rain outside casting a cozy glow inside.\n\nAs they sipped their lattes, the conversation flowed easily, touching on past memories and current dreams. The spark between them was undeniable.\n\n"Listen, I know this is sudden, but would you like to go out sometime? Maybe dinner?" Alex asked, hopeful.\n\nEllie\'s smile said it all. "I\'d love to, Alex. It\'s like something out of a storybook, meeting like this."\n\nThey exchanged numbers, the promise of a new beginning just a phone call away, leaving the cafe with more warmth in their hearts than the coffee could ever offer.';

type Direction = "left" | "right";

export const Summary = () => {
  const [setPage] = useGlobalState(state => [state.setPage]);
  const [web3, setWeb3] = useState<any>(null);
  // const [account, setAccount] = useState("");
  const account = useAccount();
  const { writeContract } = useWriteContract();
  const {findDocument} = useFirestore();

  // useEffect(() => {
  //   // Initialize Web3 for Scroll Sepolia
  //   const initWeb3 = async () => {
  //     if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  //       // Create a new Web3 instance with the Ethereum provider
  //       const web3Instance = new Web3(window.ethereum);

  //       // Define Scroll Sepolia chain details
  //       const scrollSepoliaChain = {
  //         chainId: "0x8274F", // Correct Chain ID for Scroll Sepolia
  //         chainName: "Scroll Sepolia",
  //         rpcUrls: ["https://sepolia-rpc.scroll.io"],
  //         nativeCurrency: {
  //           name: "ETH",
  //           symbol: "ETH",
  //           decimals: 18,
  //         },
  //         blockExplorerUrls: ["https://sepolia.scrollscan.com"],
  //       };

  //       try {
  //         // Check if the user is connected to the correct network
  //         const currentChainId = await window.ethereum.request({ method: "eth_chainId" });
  //         if (currentChainId !== scrollSepoliaChain.chainId) {
  //           await window.ethereum.request({
  //             method: "wallet_addEthereumChain",
  //             params: [scrollSepoliaChain],
  //           });
  //         }
  //       } catch (error) {
  //         console.error("Failed to switch to Scroll Sepolia:", error);
  //       }

  //       // Request account access
  //       try {
  //         await window.ethereum.request({ method: "eth_requestAccounts" });
  //         const accounts = await web3Instance.eth.getAccounts();
  //         setWeb3(web3Instance);
  //         setAccount(accounts[0]);
  //       } catch (error) {
  //         console.error("Failed to connect account:", error);
  //       }
  //     } else {
  //       console.error("Please install MetaMask or use a web3-compatible browser.");
  //     }
  //   };

  //   initWeb3();
  // }, []);
  useEffect(() => {
    
  }, []);

  const onSwiped = (direction: Direction) => {
    console.log(`Swiped ${direction}`);
  };

  const onLike = async () => {
    console.log("Liked", { story });
    // setPage("home");

    // if (web3 && account) {
    //   const contract = new web3.eth.Contract(SwipeContractABI, CONTRACT_ADDRESS);
    //   try {
    //     // Call the contract's swipe method
    //     await contract.methods.swipe("0x234F17c5DD33459177629aa05EE53eB4879Cd935", true, story).send({ from: account });
    //     console.log("Story liked!");
    //   } catch (error) {
    //     console.error("Error liking story:", error);
    //   }
    // }
    writeContract({
      abi: swipeContractAbi,
      address: CONTRACT_ADDRESS,
      functionName: "swipe",
      args: ["0x234F17c5DD33459177629aa05EE53eB4879Cd935", true, story],
    });
  };

  const onPass = async () => {
    console.log("Passed", { story });
    // setPage("home");

    // if (web3 && account) {
    //   const contract = new web3.eth.Contract(SwipeContractABI, CONTRACT_ADDRESS);
    //   try {
    //     // Call the contract's swipe method
    //     await contract.methods
    //       .swipe("0x234F17c5DD33459177629aa05EE53eB4879Cd935", false, story)
    //       .send({ from: account });
    //     console.log("Story passed!");
    //   } catch (error) {
    //     console.error("Error passing story:", error);
    //   }
    // }
    writeContract({
      abi: swipeContractAbi,
      address: CONTRACT_ADDRESS,
      functionName: "swipe",
      args: ["0x234F17c5DD33459177629aa05EE53eB4879Cd935", true, story],
    });
  };

  return (
    <>
      <motion.div
        drag={"x"}
        dragConstraints={{ left: -200, right: 200 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        dragSnapToOrigin
      >
        <Card>
          <h3>Coffee Date #1</h3>
          {/* <p>{story.replace(/\n/g, "<br>")}</p> */}

          <p>{story}</p>
          {/* <p>
            {story.map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p> */}
        </Card>
      </motion.div>
      <div className="flex justify-between mt-4">
        <Button text="Pass" onClick={onPass} />
        <Button text="Like" onClick={onLike} />
      </div>
    </>
  );
};
