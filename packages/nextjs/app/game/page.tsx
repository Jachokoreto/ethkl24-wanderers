"use client";

import { useEffect, useState } from "react";
import { Button } from "./_components/Button";
import { Card } from "./_components/Card";
import { Home } from "./_components/Home";
import { Memory } from "./_components/Memory";
import { GameFlow } from "./_components/game-flow/GameFlow";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { Page, useGlobalState } from "~~/services/store/store";
import { useFirestore } from "~~/services/useFirestore";

const Game: NextPage = () => {
  const [page, setPage] = useGlobalState(state => [state.page, state.setPage]);
  const account = useAccount();
  const { addDocument, findAllDocumentsWhere } = useFirestore();

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const users = await findAllDocumentsWhere("users", );
  //     if (users.length === 0) {
  //       await addDocument("users", { address: account.account });
  //     }
  //   }

  // }, [])

  return (
    <>
      {!account.isConnected ? (
        <RainbowKitCustomConnectButton />
      ) : (
        <>
          {page === "home" && <Home />}
          {page === "game" && <GameFlow />}
          {page === "memory" && <Memory />}
          {page === "connection" && <></>}
          <Button onClick={() => setPage("game")} text="Start" className="absolute bottom-2 right-2" />
          <Button onClick={() => setPage("memory")} text="Memory" className="absolute bottom-2 left-2" />
        </>
      )}
    </>
  );
};

export default Game;
