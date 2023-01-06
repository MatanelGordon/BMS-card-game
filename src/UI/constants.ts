import { BetType, GameStatus } from "../types";

export const MainContent = document.querySelector<HTMLDivElement>('#MainContent')!;

export const SettingsContainer = document.querySelector<HTMLDialogElement>('#GameSettings')!;
export const SettingsDeckSourceSelect = document.querySelector<HTMLSelectElement>('#DeckSelect')!;
export const SettingsPickStrategySelect = document.querySelector<HTMLSelectElement>('#PickType')!;
export const SettingsStartButton = document.querySelector<HTMLButtonElement>('#StartButton')!;

export const GameContainer = document.querySelector<HTMLElement>('#Game')!;
export const GameBetterCardBtn = document.querySelector<HTMLButtonElement>('#BetterCardButton')!;
export const GameWorseCardBtn = document.querySelector<HTMLButtonElement>('#WorseCardButton')!;
export const GameResetBtn = document.querySelector<HTMLButtonElement>('#Reset')!;

export const StatusContainer = document.querySelector<HTMLElement>('#StatusContainer')!;
export const ScoreLabel = document.querySelector<HTMLElement>('#Score')!;
export const StatusLabel = document.querySelector<HTMLElement>('#Status')!;
export const CurrentCardLabel = document.querySelector<HTMLElement>('#CurrentCard')!;

export const STATUS_MSG: Record<GameStatus, string> = {
    [GameStatus.IDLE]: "Not Running",
    [GameStatus.PLAYING]: "Running...",
    [GameStatus.WIN]: "You Won!",
    [GameStatus.LOSE]: "You Lost"
}

export const GAME_BUTTONS: Record<BetType, HTMLButtonElement> = {
    [BetType.LOWER]: GameWorseCardBtn,
    [BetType.HIGHER]: GameBetterCardBtn
};
