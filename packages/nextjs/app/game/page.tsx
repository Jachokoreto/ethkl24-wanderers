"use client";

import { useState } from "react";
import { Button } from "./_components/Button";
import { Card } from "./_components/Card";
import { Home } from "./_components/Home";
import { Memory } from "./_components/Memory";
import { GameFlow } from "./_components/game-flow/GameFlow";
import type { NextPage } from "next";
import { Page, useGlobalState } from "~~/services/store/store";

const Game: NextPage = () => {
  const [page, setPage] = useGlobalState(state => [state.page, state.setPage]);

  return (
    <>
      {page === "home" && <Home />}
      {page === "game" && <GameFlow />}
      {page === "memory" && <Memory />}
      {page === "connection" && <></>}
      <Button onClick={() => setPage("game")} text="Start" className="absolute bottom-2 right-2"/>
    </>
  );
};

export default Game;
