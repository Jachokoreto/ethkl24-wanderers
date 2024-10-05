import React, { useState } from "react";
import scene1 from "./_scene/scene1";
import { IScene, useGlobalState } from "~~/services/store/store";
import { Button } from "../Button";

const scenes: IScene[] = scene1;

export const SceneUI = () => {
  const [savedInteractions, updateSavedInteractions, setGameState] = useGlobalState(state => [
    state.savedInteractions,
    state.updateSavedInteractions,
    state.setGameState
  ]);
  const [currentStep, updateCurrentStep] = useState<IScene>(scenes[0]);

  return (
    <div className="bg-[url('/asset/cafe-bg.png')] bg-cover h-screen w-screen absolute top-0 left-0">
      <div className="bg-black/70 border-white rounded-md h-60 w-full m-6 overflow-y-auto absolute bottom-4 left-1/2 -trans">
        {currentStep.options.length === 1 && (
          <div className="text-white p-4">{currentStep.options[0].text}</div>
        )}
      </div>
      <Button onClick={() => setGameState("end")}  text="END"/>
    </div>
  );
};
