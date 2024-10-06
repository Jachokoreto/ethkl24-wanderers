"use client";

import React, { use, useEffect, useState } from "react";
import { Button } from "./Button";
import { IDKitWidget, IVerifyResponse, VerificationLevel, verifyCloudProof } from "@worldcoin/idkit";
import { sign } from "crypto";
import { create } from "domain";
import { collection, getDocs, limit, onSnapshot, or, orderBy, query, where } from "firebase/firestore";
import { useAccount } from "wagmi";
import { Temp } from "~~/app/api/verify/Temp";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { db } from "~~/services/firebase";
import { useGlobalState } from "~~/services/store/store";
import { useFirestore } from "~~/services/useFirestore";

export const Home = () => {
  const account = useAccount();
  const { findAllDocumentsWhere, addDocument, modifyDocument } = useFirestore();
  const [isRegistered, setIsRegistered] = useState(false);
  const [name, setName] = useState("");
  const [isGuy, setIsGuy] = useState<null | boolean>(null);
  const [setSessionId, setPage, setCurrentUser] = useGlobalState(state => [
    state.setSessionId,
    state.setPage,
    state.setCurrentUser,
  ]);

  const updateToGame = (session: any) => {
    console.log(session.data());
    setSessionId(session.id);
    setCurrentUser(session.data().user1 === account.address ? "user1" : "user2");
    setTimeout(() => {
      setPage("game");
    }, 1000);
  };

  const getUser = async () => {
    return await findAllDocumentsWhere("users", where("address", "==", account.address));
  };

  const getSession = async () => {
    const sessionsRef = collection(db, "sessions");
    // Query for 'guy' equals account address
    const guyQuery = query(sessionsRef, where("user1", "==", account.address));
    const girlQuery = query(sessionsRef, where("user2", "==", account.address));
    // Execute both queries
    const [guyResults, girlResults] = await Promise.all([getDocs(guyQuery), getDocs(girlQuery)]);

    // Combine results into a single array, filtering out duplicates
    const uniqueDocs = new Map();

    guyResults.forEach(doc => uniqueDocs.set(doc.id, doc));
    girlResults.forEach(doc => {
      if (!uniqueDocs.has(doc.id)) {
        uniqueDocs.set(doc.id, doc);
      }
    });
    return Array.from(uniqueDocs.values()).filter(doc => doc.data().status !== "ended");
  };

  useEffect(() => {
    getUser().then(users => {
      if (users.length > 0) {
        setIsRegistered(true);
      }
    });
    getSession().then(sessions => {
      if (sessions.length > 0) {
        setIsGuy(true);
        if (sessions[0].user2 !== "") {
          updateToGame(sessions[0]);
        }
      }
    });
  }, []);

  // TODO: Calls your implemented server route
  const verifyProof = async (proof: any) => {
    // setProof(data.proof);
    // console.log(proof);
    const res = await fetch("/api/verify", {
      method: "POST",
      body: JSON.stringify({ proof }),
    });
    // console.log(res);
    if (!res.ok) {
      throw new Error("Failed to verify proof");
    }
  };

  // TODO: Functionality after verifying
  const onSuccess = async () => {
    const users = await getUser();
    if (users.length === 0) {
      addDocument("users", { address: account.address, name: name });
    }
    setIsRegistered(true);
  };

  const createSession = async () => {
    let seesions = [];
    // if is guy then find a session with no girl
    // if (isGuy) seesions = await findAllDocumentsWhere("sessions", where("girl", "==", ""));
    // else seesions = await findAllDocumentsWhere("sessions", where("guy", "==", ""));
    // if (seesions.length > 0) {
    //   modifyDocument("sessions", seesions[0].id, isGuy ? { guy: account.address } : { girl: account.address });
    //   return;
    // }
    // // console.log({isGuy})
    // if (isGuy) addDocument("sessions", { guy: account.address });
    // else addDocument("sessions", { girl: account.address });
    seesions = await findAllDocumentsWhere("sessions", where("user2", "==", ""));
    if (seesions.length > 0) {
      console.log(seesions[0]);
      if (seesions[0].user1 === "") {
        modifyDocument("sessions", seesions[0].id, { user1: account.address });
      } else {
        modifyDocument("sessions", seesions[0].id, { user2: account.address });
      }
      updateToGame(seesions[0]);
      return;
    }
    addDocument("sessions", { user1: account.address, user2: "" });
  };

  useEffect((): (() => void) => {
    const q = query(collection(db, "sessions"), orderBy("createdAt", "desc"), limit(10));
    const unsubscribe = onSnapshot(q, QuerySnapshot => {
      const fetchedSessions: any[] = [];
      QuerySnapshot.forEach(doc => {
        fetchedSessions.push({ ...doc.data(), id: doc.id });
      });
      const session = fetchedSessions.filter(session => {
        if (session.user1 && session.user2) {
          return session.user1 === account.address || session.user2 === account.address;
        }
      });
      if (session.length > 0) {
        updateToGame(session[0]);
      }
    });
    return () => unsubscribe;
  }, []);

  return (
    <div className="h-screen flex items-center justify-center flex-col relative">
      <div className="bg-white/80  rounded-full pt-4 pb-3 px-10 mb-10 mt-4 absolute top-4">
        <h1>💋 De Dating Sims 🎮</h1>
      </div>
      {/* <Temp proof={proof} /> */}
      <div className="card bg-gray-600 h-[350px] w-[600px] rounded-3xl text-white">
        <div className="card-body items-center text-center">
          <h2 className="card-title">
            <RainbowKitCustomConnectButton />
          </h2>
          {isRegistered ? (
            <>
              {isGuy === null ? (
                <>
                  <p className="text-5xl font-extrabold">Im ready to meet</p>
                  <div className="flex gap-x-6 justify-end w-full">
                    <Button
                      className="w-full font-bold"
                      onClick={() => {
                        setIsGuy(true);
                        createSession();
                      }}
                      text="Start"
                    ></Button>
                  </div>
                </>
              ) : (
                <p>Waiting for a match</p>
              )}
            </>
          ) : (
            <>
              <p className="text-lg font-bold">Continue by registering with the selected account and a name</p>
              <input
                type="text"
                className="input input-bordered w-full text-black"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <IDKitWidget
                app_id="app_71da27adf989e8eca4f373dba8c4b36b"
                action="register"
                verification_level={VerificationLevel.Device}
                handleVerify={verifyProof}
                onSuccess={onSuccess}
              >
                {({ open }) => <Button text="Verify and register" onClick={open} />}
              </IDKitWidget>
            </>
          )}
        </div>
      </div>
      <div className="card-actions mt-4 absolute bottom-10 flex gap-x-8">
        <div className="flex flex-col items-center">
          <button className="hover:bg-red-300 bg-white border-white btn btn-circle w-16 h-16 flex items-center justify-center text-2xl" onClick={() => {setPage("home")}}>
            🎮
          </button>
          <p>Home</p>
        </div>
        <div className="flex flex-col items-center">
          <button className="hover:bg-red-300 bg-white border-white btn btn-circle w-16 h-16 flex items-center justify-center text-2xl" onClick={() => setPage("memory")}>
            📒
          </button>
          <p>Memory</p>
        </div>
        <div className="flex flex-col items-center">
          <button className="hover:bg-red-300 bg-white border-white btn btn-circle w-16 h-16 flex items-center justify-center text-2xl">
            💌
          </button>
          <p>Connection</p>
        </div>
      </div>
    </div>
  );
};
