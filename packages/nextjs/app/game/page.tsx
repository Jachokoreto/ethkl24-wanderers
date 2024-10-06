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
  const [page, setPage, setSessionId, sessionId] = useGlobalState(state => [
    state.page,
    state.setPage,
    state.setSessionId,
    state.sessionId,
  ]);
  const account = useAccount();
  const { addDocument, findAllDocumentsWhere, modifyDocument } = useFirestore();

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
          <Button
            onClick={() => {
              modifyDocument("sessions", sessionId, { status: "ended" });
              setPage("home");
              setSessionId("");
              
            }}
            text="Reset"
            className="absolute bottom-2 right-2"
          />
        </>
      )}
    </>
  );
};

export default Game;
