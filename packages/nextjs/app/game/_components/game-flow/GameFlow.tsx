import React, { use, useEffect } from "react";
import { SceneUI } from "./SceneUI";
import { Summary } from "./Summary";
import { IScene, useGlobalState } from "~~/services/store/store";

export const GameFlow = () => {
  const [gameState, setGameState] = useGlobalState(state => [state.gameState, state.setGameState]);

  useEffect(() => {
    setGameState("playing");
  }, []);

  return (
    <div>
      {gameState === "playing" && <SceneUI />}
      {gameState === "end" && <Summary />}
    </div>
  );
};
