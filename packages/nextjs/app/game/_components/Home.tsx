import React from "react";
import { Button } from "./Button";
import { useAccount } from "wagmi";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

export const Home = () => {
  const account = useAccount();

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="card bg-neutral text-neutral-content h-[350px] w-[600px] rounded-3xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title"><RainbowKitCustomConnectButton/></h2>
          <p className="text-5xl font-extrabold">Im ready to meet</p>
          <div className="flex gap-x-3 justify-end w-full">
            <Button className="w-full font-bold" onClick={() => {}} text="him"></Button>
            <Button className="w-full font-bold" onClick={() => {}} text="her"></Button>
          </div>
        </div>
      </div>
      <div className="card-actions mt-4 absolute bottom-10 flex gap-x-8">
        <div className="flex flex-col items-center">
          <button className="hover:bg-red-300 bg-white border-white btn btn-circle w-16 h-16 flex items-center justify-center text-2xl">
            🎮
          </button>
          <p>Home</p>
        </div>
        <div className="flex flex-col items-center">
          <button className="hover:bg-red-300 bg-white border-white btn btn-circle w-16 h-16 flex items-center justify-center text-2xl">
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
