"use client";

import { useState } from "react";
import { Button } from "./_components/Button";
import { Card } from "./_components/Card";
import { Home } from "./_components/Home";
import { Memory } from "./_components/Memory";
import type { NextPage } from "next";
import { Page, useGlobalState } from "~~/services/store/store";


const Game: NextPage = () => {
const page = useGlobalState((state) => state.page);

  return (
    <>
      <Card>
        {page === "home" && <Home />}
        {page === "game" && <></>}
        {page === "memory" && <Memory />}
        {page === "connection" && <></>}
      </Card>
    </>
  );
};

export default Game;
