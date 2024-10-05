import React, { use, useEffect, useState } from "react";
import { Button } from "../Button";
import { getScenes, scene1 } from "./_scene/scene1";
import { send } from "process";
import { addDoc, collection, limit, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "~~/firebase";
import { IOption, IScene, UserType, useGlobalState } from "~~/services/store/store";

const scenes: IScene[] = scene1;

const currentUser: UserType = "user1";
const oppositeUser: UserType = currentUser === "user1" ? "user2" : "user1";

export const SceneUI = () => {
  const [savedInteractions, updateSavedInteractions, setGameState] = useGlobalState(state => [
    state.savedInteractions,
    state.updateSavedInteractions,
    state.setGameState,
  ]);
  const [currentStep, setCurrentStep] = useState<IScene | undefined>(undefined);
  const [scenes, setScenes] = useState<IScene[] | undefined>(undefined);
  const [tempPrevios, setTempPrevios] = useState<string>("");

  useEffect(() => {
    setScenes(getScenes(currentUser));
  }, []);

  // useEffect(() => {
  //   // fake user2 interaction
  //   if (currentStep?.from === "user2") {
  //     sendOption(currentStep.options[0], currentStep.from);
  //   }
  // }, [savedInteractions]);

  const toNextStep = (option: IOption) => {
    const nextStep = scenes!.find(step => step.id === option.to); // null option.to means end of game
    if (!nextStep) return setGameState("end");
    setCurrentStep(nextStep);
  };

  const sendOption = async (option: IOption, from: string) => {
    // const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, "scenes"), {
      scene: {...currentStep, options: [option]},
      createdAt: serverTimestamp(),
      // uid
    });
    // updateSavedInteractions([...(savedInteractions as any), { ...currentStep, options: [option] }]);
  };

  useEffect((): (() => void) => {
    const q = query(collection(db, "options"), orderBy("createdAt", "desc"), limit(50));
    const unsubscribe = onSnapshot(q, QuerySnapshot => {
      const fetchedOptions: any[] = [];
      QuerySnapshot.forEach(doc => {
        fetchedOptions.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedOptions.sort((a: any, b: any) => a.createdAt - b.createdAt);
      if (sortedMessages[sortedMessages.length - 1].from === oppositeUser) {
        toNextStep(sortedMessages[sortedMessages.length - 1]);
      };
    });
    return () => unsubscribe;
  }, []);

  if (!currentStep) return <></>;
  return (
    <div className="bg-[url('/asset/cafe-bg.png')] bg-cover h-screen w-screen absolute top-0 left-0">
      <div className=" absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%]">
        {currentStep.from === currentUser && (
          <div className="flex flex-col gap-y-3">
            {currentStep.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => {
                  sendOption(option, currentStep!.from);
                  toNextStep(option);
                }}
                text={option.text}
              />
            ))}
          </div>
        )}
        <div
          className="bg-black/70 border-white border-2 rounded-md h-60 overflow-y-auto mt-10"
          onClick={() => {
            // textbox interaction for system text only

            if (currentStep.from === "system")
              if (currentUser === "user1") {
                sendOption(currentStep.options[0], currentStep!.from);
              }
            toNextStep(currentStep.options[0]);
          }}
        >
          <div className="text-white p-4">
            {currentStep.from === "system" || (currentStep.from !== currentUser && currentStep.options.length) ? (
              <p>{currentStep.options[0].text}</p>
            ) : (
              <p>Waiting...</p>
            )}
          </div>
        </div>
      </div>

      <Button onClick={() => setGameState("end")} text="END" />
    </div>
  );
};
