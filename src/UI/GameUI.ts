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
export class GameUI {
	#gameStatus: GameStatus = GameStatus.IDLE;
	#gameSettings: GameSettingsUI = new GameSettingsUI();

	/**
	 * Allows to manage the UI using simple functions.
	 */
	constructor() {
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

	#setStatus(status: GameStatus) {
		this.#gameStatus = status;
		StatusLabel.textContent = STATUS_MSG[status];
		this.#disableGame(status !== GameStatus.PLAYING);
		this.#gameSettings.show(status === GameStatus.IDLE);

		if ([GameStatus.WIN, GameStatus.LOSE].includes(status)) {
			MainContent.classList.add('fixed-status');
		} else {
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

	/**
	 * Returns the current game status
	 * @returns {GameStatus} The Current Game Status
	 * @example
	 * ```typescript
	 * import gameUI, {GameStatus} from '@ui';
	 * const status: GameStatus = gameUI.gameStatus;
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

	/**
	 * Sets a function to be called when the "Higher" button is clicked
	 * @param func {BetButtonCallback} A function that runs whenever the "Higher" button is clicked
	 * @example
	 * ```javascript
	 * import gameUi from '@ui';
	 *
	 * let count = 0;
	 * gameUi.onHigherBetClick(() => {
	 * 	console.log('Higher bet clicked');
	 * 	count++;
	 * 	if(count > 10){
	 * 	 console.log('Thats A lot of pressing');
	 * 	}
	 * });
	 * ```
	 */
	onHigherBetClick(func: BetButtonCallback): void {
		GameBetterCardBtn.addEventListener('click', () => {
			if (this.#gameStatus === GameStatus.PLAYING) {
				func();
			}
		});
	}

	/**
	 * Sets a function to be called when the "Lower" button is clicked
	 * @param func {BetButtonCallback} A function that runs whenever the "Lower" button is clicked
	 * @example
	 * ```javascript
	 * import gameUi from '@ui';
	 *
	 * gameUi.onLowerBetClick(() => {
	 * 	console.log('Lower bet clicked');
	 * });
	 * ```
	 */
	onLowerBetClick(func: BetButtonCallback): void {
		GameWorseCardBtn.addEventListener('click', () => {
			if (this.#gameStatus === GameStatus.PLAYING) {
				func();
			}
		});
	}

	/**
	 * Sets a function to be called when either the "Lower" or "Higher" buttons are clicked
	 * @param func {GeneralBetButtonCallback} A function that runs whenever one of the buttons is clicked
	 * @example if you want in a single function to control both the "Lower" and "Higher" buttons
	 * ```typescript
	 *  gameUi.onBetClick((param) => {
	 *  	if(param.type === 'Lower') {
	 *   		console.log('Lower bet clicked');
	 *  	}
	 *  	else {
	 *   		console.log('Higher bet clicked');
	 *  	}
	 * });
	 * 
	 * ```
	 */
	onBetClick(func: GeneralBetButtonCallback): void {
		Object.entries(GAME_BUTTONS).forEach(([type, btn]) => {
			btn.addEventListener('click', () => {
				func.call(btn, { target: btn, type: type as BetType });
			});
		});
	}

	/**
	 * Sets a score at the bottom of the game.
	 * @param value {number} the score value to display
	 * @example to increment the score each time user presses "Higher" button
	 * ```javascript
	 * let count = 0;
	 * gameUI.onHigherBetClick(() => {
	 * 	count++;
	 * 	gameUI.setScore(count);
	 * })
	 * ```
	 */
	setScore(value: number) {
		ScoreLabel.textContent = value.toString();
	}

	/**
	 * Show the Player has won the game
	 * @example
	 * ```javascript
	 * gameUI.winGame();
	 * ```
	 */
	winGame() {
		this.#setStatus(GameStatus.WIN);
	}

	/**
	 * Show the Player has lost the game
	 * @example
	 * ```javascript
	 * gameUI.loseGame();
	 * ```
	 */
	loseGame() {
		this.#setStatus(GameStatus.LOSE);
	}

	/**
	 * resets the UI
	 * @example
	 * ```javascript
	 * gameUI.reset();
	 * ```
	 */
	reset() {
		this.#setStatus(GameStatus.IDLE);
		this.setScore(0);
		this.setCurrentCard('', 'black');
	}

	/**
	 * 
	 * @param str {string} The content to display next to "Current Card"
	 * @param color {string} The content's color.
	 * @example
	 * ```javascript
	 * gameUI.setCurrentCard("7 Clubs", "green");
	 * ```
	 */
	setCurrentCard(str: string, color?: string) {
		CurrentCardLabel.textContent = str;
		CurrentCardLabel.style.color = color ?? 'black';
	}
}

const gameUI = new GameUI();

export default gameUI;
