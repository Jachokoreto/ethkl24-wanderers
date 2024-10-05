import React, { use } from 'react'
import { IScene, useGlobalState } from '~~/services/store/store';
import { Summary } from './Summary';
import { SceneUI } from './SceneUI';



export const GameFlow = () => {
    const gameState = useGlobalState(state => state.gameState);
    
  return (
    <div>
        {gameState === "playing" && <SceneUI />}
        {gameState === "end" && <Summary />}
    </div>
  )
}
