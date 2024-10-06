import React, { useEffect, useState } from "react";
import { Button } from "../Button";
import { Card } from "../Card";
import { where } from "firebase/firestore";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import { swipeContractAbi } from "~~/contracts/swipeContract";
import Web3 from "web3";
import { useGlobalState } from "~~/services/store/store";
import { useFirestore } from "~~/services/useFirestore";

const CONTRACT_ADDRESS = "0xbFfC48ed6462BE8A45a377CA3D480959e5B7B690"; // Replace with your deployed contract address

type Direction = "left" | "right";

export const Summary = () => {
  const [setPage, sessionId, setSessionId] = useGlobalState(state => [state.setPage, state.sessionId, state.setSessionId]);
  const [web3, setWeb3] = useState<any>(null);
  const [account, setAccount] = useState("");
  const wagmiAccount = useAccount(); // Retrieve WAGMI account hook
  const { findDocument, findAllDocumentsWhere } = useFirestore();
  const [story, setStory] = useState("");
  const [target, setTarget] = useState("");

  useEffect(() => {
    // Initialize Web3 for Scroll Sepolia
    const initWeb3 = async () => {
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        const web3Instance = new Web3(window.ethereum);

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

  const setTargetUser = async () => {
    // if (!account) return; // Check if account is connected
  
    const sessions = await findDocument("sessions", sessionId);
    console.log("SESSIONS", { sessions });
  
    if (sessions && sessions) {
      setTarget(sessions.user1 === wagmiAccount.address ? sessions.user2 : sessions.user1);
      setAccount(sessions.user1 === wagmiAccount.address ? sessions.user1 : sessions.user2);
    }
  };

  const getAndSetStory = async () => {
    const scenes = await findAllDocumentsWhere("scenes", where("sessionId", "==", sessionId));
    console.log("scenes", { scenes });

    if (scenes.length > 0) {
      setStory(scenes.map(scene => scene.data().scene.options[0].text).join("\n\n"));
    }
  };
  useEffect(() => {
    if (sessionId && wagmiAccount?.address) {
      setTargetUser();
      getAndSetStory();
    }
  }, [sessionId, wagmiAccount]); // Only run when sessionId or account changes

  const onSwiped = (direction: Direction) => {
    console.log(`Swiped ${direction}`);
  };

  const onLike = async () => {
    console.log("Liked", { story });

    if (web3 && account) {
      const contract = new web3.eth.Contract(swipeContractAbi, CONTRACT_ADDRESS);
      try {
        // Call the contract's swipe method
        await contract.methods.swipe(target, true, story).send({ from: account });
        console.log("Story liked!");
      } catch (error) {
        console.error("Error liking story:", error);
      }
    }
  };

  const onPass = async () => {
    console.log("Passed", { story, target });


    if (web3 && account) {
      const contract = new web3.eth.Contract(swipeContractAbi, CONTRACT_ADDRESS);
      try {
        // Call the contract's swipe method
        await contract.methods
          // .swipe("0x234F17c5DD33459177629aa05EE53eB4879Cd935", false, story)
          .swipe(target, false, story)
          .send({ from: account });
        console.log("Story passed!");
        setSessionId("");
        setPage("home");
      } catch (error) {
        console.error("Error passing story:", error);
      }
    }
  };

  return (
    <>
      <div className="bg-white/80  rounded-full pt-4 pb-3 px-10 mb-10 mt-4">
        <h1>💋 De Dating Sims 🎮</h1>
      </div>
      <motion.div
        drag={"x"}
        dragConstraints={{ left: -200, right: 200 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        dragSnapToOrigin
      >
        <Card>
          <h3>Coffee Date #1</h3>
          <p>{story}</p>
        </Card>
      </motion.div>
      <div className="flex justify-between mt-4">
        <Button text="Pass" onClick={onPass} />
        <Button text="Like" onClick={onLike} />
      </div>
    </>
  );
};
