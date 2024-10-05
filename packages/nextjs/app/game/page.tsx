"use client";
import { Button } from "./_components/Button";
import type { NextPage } from "next";
import { Card } from "./_components/Card";

const Game: NextPage = () => {
  return (
    <>
      <Card>
        <div className="h-full flex-col flex justify-center">
          <Button text="Hola, click me" onClick={() => alert("clicked!!!!")} />
        </div>
      </Card>
    </>
  );
};

export default Game;
