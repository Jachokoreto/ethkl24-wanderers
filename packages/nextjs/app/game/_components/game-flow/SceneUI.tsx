import React, { use, useEffect, useState } from "react";
import { Button } from "../Button";
import { getScenes, scene1 } from "./_scene/scene1";
import { addDoc, collection, limit, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { send } from "process";
import { db } from "~~/services/firebase";
import { IOption, IScene, UserType, useGlobalState } from "~~/services/store/store";
import { useFirestore } from "~~/services/useFirestore";

const backupScenes: IScene[] = scene1;

// const currentUser: UserType = "user1";
// const oppositeUser: UserType = currentUser === "user1" ? "user2" : "user1";

export const SceneUI = () => {
  const [savedInteractions, updateSavedInteractions, setGameState, currentUser, sessionId] = useGlobalState(state => [
    state.savedInteractions,
    state.updateSavedInteractions,
    state.setGameState,
    state.currentUser,
    state.sessionId,
  ]);
  const [currentStep, setCurrentStep] = useState<IScene | undefined>(undefined);
  const [scenes, setScenes] = useState<IScene[] | undefined>(undefined);
  const [tempPrevios, setTempPrevios] = useState<string>("");
  const oppositeUser: UserType = currentUser === "user1" ? "user2" : "user1";
  const { addDocument } = useFirestore();

  useEffect(() => {
    console.log(currentUser);
    setScenes(getScenes(currentUser));
  }, []);

  useEffect(() => {
    if (scenes) setCurrentStep(scenes[0]);
  }, [scenes]);

  // useEffect(() => {
  //   // fake user2 interaction
  //   if (currentStep?.from === "user2") {
  //     sendOption(currentStep.options[0], currentStep.from);
  //   }
  // }, [savedInteractions]);

  const toNextStep = (option: IOption) => {
    console.log("toNextStep", option);
    console.log("SCENSE", { backupScenes });
    const nextStep = backupScenes?.find(step => step.id === option.to); // Remove non-null assertion
    if (!nextStep) {
      setGameState("end");
      return;
    }
    setTempPrevios(option.text || "end");
    setCurrentStep(nextStep);

  };
  const sendOption = async (option: IOption, from: string) => {
    // const { uid, displayName, photoURL } = auth.currentUser;

    console.log("sendOption", option);
    // await addDoc(collection(db, "scenes"), {
    //   scene: { ...currentStep, options: [option] },
    //   createdAt: serverTimestamp(),
    //   sessionId: sessionId,
    //   // uid
    // });
    await addDocument(
      "scenes",
      {
        scene: { ...currentStep, options: [option] },
        sessionId: sessionId,
        createdAt: serverTimestamp(),
      },
      `${sessionId}-${option.to || "end"}`,
    );

    // updateSavedInteractions([...(savedInteractions as any), { ...currentStep, options: [option] }]);
  };

  useEffect((): (() => void) => {
    console.log({ sessionId });
    if (!sessionId) return () => {};
    const q = query(collection(db, "scenes"), where("sessionId", "==", sessionId), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, QuerySnapshot => {
      console.log("get snapshot");
      const fetchedOptions: any[] = [];
      QuerySnapshot.forEach(doc => {
        fetchedOptions.push({ ...doc.data(), id: doc.id });
      });
      console.log({ fetchedOptions });
      // const sortedMessages = fetchedOptions.sort((a: any, b: any) => a.createdAt - b.createdAt);
      if (fetchedOptions.length) {
        console.log("to nect step");
        console.log("helo", fetchedOptions[0]);
        toNextStep(fetchedOptions[0].scene.options[0]);
      }

      // }
    });
    return () => unsubscribe;
  }, [sessionId]);

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
                  // toNextStep(option);
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
                console.log("clickbox");
                sendOption(currentStep.options[0], currentStep!.from);
              }
          }}
        >
          <div className="text-white p-4">
            {currentStep.from === "system" ? <p>{currentStep.options[0].text}</p> : <p>{tempPrevios} <br/> <span className="opacity-60">{currentStep.from !== currentUser ? "Waiting..." :""}</span></p>}
          </div>
        </div>
      </div>

      <Button onClick={() => setGameState("end")} text="END" />
    </div>
  );
};
