import { create } from "zustand";
import scaffoldConfig from "~~/scaffold.config";
import { ChainWithAttributes } from "~~/utils/scaffold-eth";

/**
 * Zustand Store
 *
 * You can add global state to the app using this useGlobalState, to get & set
 * values from anywhere in the app.
 *
 * Think about it as a global useState.
 */
export type Page = "home" | "game" | "memory" | "connection";
export type GameState = "playing" | "end";
export type UserType = "user1" | "user2";

export type SceneId = string | null;

export interface IOption {
  text: string;
  to: SceneId;
}
export interface IScene {
  id: SceneId;
  from: "system" | "user1" | "user2";
  options: IOption[]; // only one option from system, two option from user1 and user2
}

type GlobalState = {
  nativeCurrency: {
    price: number;
    isFetching: boolean;
  };
  setNativeCurrencyPrice: (newNativeCurrencyPriceState: number) => void;
  setIsNativeCurrencyFetching: (newIsNativeCurrencyFetching: boolean) => void;
  targetNetwork: ChainWithAttributes;
  setTargetNetwork: (newTargetNetwork: ChainWithAttributes) => void;

  // Add your own global state here
  page: Page;
  setPage: (page: Page) => void;
  gameState: GameState;
  setGameState: (gameState: GameState) => void;
  savedInteractions: undefined | IScene[];
  updateSavedInteractions: (newInteractions: IScene[]) => void;
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  sessionId: string;
  setSessionId: (sessionId: string) => void;
  currentUser: UserType;
  setCurrentUser: (currentUser: UserType) => void;
};

export const useGlobalState = create<GlobalState>(set => ({
  nativeCurrency: {
    price: 0,
    isFetching: true,
  },
  setNativeCurrencyPrice: (newValue: number): void =>
    set(state => ({ nativeCurrency: { ...state.nativeCurrency, price: newValue } })),
  setIsNativeCurrencyFetching: (newValue: boolean): void =>
    set(state => ({ nativeCurrency: { ...state.nativeCurrency, isFetching: newValue } })),
  targetNetwork: scaffoldConfig.targetNetworks[0],
  setTargetNetwork: (newTargetNetwork: ChainWithAttributes) => set(() => ({ targetNetwork: newTargetNetwork })),

  // Add your own global state here
  page: "home",
  setPage: (page: Page) => set(() => ({ page })),
  gameState: "playing",
  setGameState: (gameState: GameState) => set(() => ({ gameState })),
  savedInteractions: undefined,
  updateSavedInteractions: (newInteractions: IScene[]) => set(() => ({ savedInteractions: newInteractions })),
  loggedIn: false,
  setLoggedIn: (loggedIn: boolean) => set(() => ({ loggedIn })),
  sessionId: "",
  setSessionId: (sessionId: string) => set(() => ({ sessionId })),
  currentUser: "user1",
  setCurrentUser: (currentUser: UserType) => set(() => ({ currentUser })),
}));
