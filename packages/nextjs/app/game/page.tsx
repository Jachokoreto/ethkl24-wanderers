"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { Button } from "./_components/Button";

const Game: NextPage = () => {

  return (
      <div className="flex items-center flex-col flex-grow pt-10 gap-y-4">
        <h1>We start from this page</h1>
        <Button text="Hola, click me" onClick={() => alert("clicked!!!!")} />
      </div>
  );
};

export default Game;
