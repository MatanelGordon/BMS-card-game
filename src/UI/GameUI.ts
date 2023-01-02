import { BetType, GameStatus } from './types';
import {
	CurrentCardLabel,
	GameBetterCardBtn,
	GameWorseCardBtn,
	GAME_BUTTONS,
	MainContent,
	ScoreLabel,
	StatusLabel,
	STATUS_MSG,
} from './constants';
import { GameSettingsUI, SettingsApplyCallback } from './GameSettingsUI';

export type BetButtonCallback = () => void;
export type GeneralBetButtonCallback = (param: {
	type: BetType;
	target: HTMLButtonElement;
}) => void;

// TODO: Add jsdocs
// TODO: Add exception Handling
export class GameUI {
	#gameStatus: GameStatus = GameStatus.IDLE;
	#gameSettings: GameSettingsUI = new GameSettingsUI();
	#initialized: boolean = false;

	/**
	 * Allows to manage the UI using simple functions.
	 */
	constructor() {
		this.#init();
	}

	/**
	 * Returns the current game status
	 * @returns {GameStatus} The Current Game Status
	 * @example
	 * ```javascript
	 * import gameUI from '@ui';
	 * const status = gameUI.gameStatus;
	 *
	 * if (status === GameStatus.Playing) {
	 * 	console.log('Playing');
	 * }
	 * else{
	 * 	console.log('Not playing');
	 * }
	 * ```
	 */
	get gameStatus() {
		return this.#gameStatus;
	}

	#init() {
		if (this.#initialized) {
			throw new Error(`You Can't Use gameUi.init() more than once`);
		}

		this.#initialized = true;
		this.reset();
		this.#gameSettings.init();

		this.onGameStart(() => {
			this.reset();
			this.#setStatus(GameStatus.PLAYING);
		});
	}

	#disableGame(disable: boolean) {
		GameBetterCardBtn.disabled = disable;
		GameWorseCardBtn.disabled = disable;
	}

	/**
	 * Sets an event for when the game starts
	 * @param func The Function to call when game starts
	 * @example
	 * ```javascript
	 * import gameUi from '@ui';
	 *
	 * gameUi.onGameStart(() => {
	 * 	console.log('Game started');
	 * })
	 * ```
	 */
	onGameStart(func: SettingsApplyCallback): void {
		this.#gameSettings.onSettingsApply(func);
	}

	onHigherBetClick(func: BetButtonCallback): void {
		GameBetterCardBtn.addEventListener('click', () => {
			if (this.#gameStatus === GameStatus.PLAYING) {
				func();
			}
		});
	}

	onLowerBetClick(func: BetButtonCallback): void {
		GameWorseCardBtn.addEventListener('click', () => {
			if (this.#gameStatus === GameStatus.PLAYING) {
				func();
			}
		});
	}

	onBetClick(func: GeneralBetButtonCallback): void {
		Object.entries(GAME_BUTTONS).forEach(([type, btn]) => {
			btn.addEventListener('click', () => {
				func.call(btn, { target: btn, type: type as BetType });
			});
		});
	}

	setScore(value: number) {
		ScoreLabel.textContent = value.toString();
	}

	#setStatus(status: GameStatus) {
		this.#gameStatus = status;
		StatusLabel.textContent = STATUS_MSG[status];
		this.#disableGame(status !== GameStatus.PLAYING);
		this.#gameSettings.show(status === GameStatus.IDLE);

		if([GameStatus.WIN, GameStatus.LOSE].includes(status)){
			MainContent.classList.add('fixed-status');
		}
		else{
			MainContent.classList.remove('fixed-status');
		}

		if (status === GameStatus.WIN) {
			StatusLabel.style.color = '#3d3';
			MainContent.classList.add('win');
		} else if (status === GameStatus.LOSE) {
			StatusLabel.style.color = '#f22';
			MainContent.classList.add('lose');
		} else {
			StatusLabel.style.color = '#000';
			MainContent.classList.remove('win', 'lose');
		}
	}

	winGame(){
		this.#setStatus(GameStatus.WIN);
	}

	loseGame(){
		this.#setStatus(GameStatus.LOSE);
	}

	reset() {
		this.#setStatus(GameStatus.IDLE);
		this.setScore(0);
		this.setCurrentCard('', 'black');
	}

	setCurrentCard(str: string, color?: string) {
		CurrentCardLabel.textContent = str;
		CurrentCardLabel.style.color = color ?? 'black';
	}
}

const gameUI = new GameUI();

export default gameUI;
