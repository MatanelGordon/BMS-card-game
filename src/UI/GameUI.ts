import {
	CurrentCardLabel,
	GameBetterCardBtn,
	GameResetBtn,
	GameWorseCardBtn,
	GAME_BUTTONS,
	MainContent,
	ScoreLabel,
	StatusLabel,
	STATUS_MSG,
} from './constants';
import { GameSettingsUI, SettingsApplyCallback } from './GameSettingsUI';
import { ButtonShape } from './types';
import { BetType, GameStatus } from '../types';

export type BetButtonCallback = () => void;
export type GeneralBetButtonCallback = (param: {
	type: BetType;
	target: HTMLButtonElement;
}) => void;
export class GameUI {
	#gameStatus: GameStatus = GameStatus.IDLE;
	#gameSettings: GameSettingsUI = new GameSettingsUI();
	#isAdvancedModeCalled: boolean = false;

	/**
	 * Allows to manage the UI using simple functions.
	 */
	constructor() {
		this.reset();
		this.#gameSettings.init();

		this.#gameSettings.lock(true);
		this.#setStatus(GameStatus.PLAYING);
		this.onResetClick(this.reset.bind(this));
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

	#setButtonColor(
		button: HTMLButtonElement,
		bgColor?: string,
		textColor?: string,
		borderColor?: string,
	) {
		if (bgColor) {
			button.style.background = bgColor;
		}

		if (textColor) {
			button.style.color = textColor;
		}

		if (borderColor) {
			button.style.borderWidth = '1px';
			button.style.borderStyle = 'solid';
			button.style.borderColor = borderColor;
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
	 * Transform your game to advanced mode including a popup window that will allow further customization.
	 *
	 * `NOTE: This function can only be called once`
	 *
	 * @example To use this function:
	 * ```javascript
	 * // right below the imports in main.ts file
	 * gameUI.advancedMode();
	 * ```
	 */
	advancedMode() {
		if (this.#isAdvancedModeCalled) {
			throw new Error('Cannot call AdvancedMode more than once');
		}

		this.#isAdvancedModeCalled = true;
		this.#gameSettings.lock(false);
		this.#setStatus(GameStatus.IDLE);
		this.onGameStart(() => {
			this.reset();
			this.#setStatus(GameStatus.PLAYING);
		});
	}

	/**
	 * Sets an event for when the game starts in advanced mode
	 *
	 * NOTE: this function can only be called if advanced mode is activated
	 * @param func {SettingsApplyCallback} The Function to call when game starts - the function receives the settings and should return void
	 * @example To get the settings of the game
	 * ```javascript
	 * imprt gameUi from '@ui';
	 * gameUi.onGameStart((deckSource: DeckSource, pickStrategy: PickStrategy) => {
	 * 	console.log('Game started');
	 * 	console.log('deckSource', deckSource);
	 * 	console.log('pickStrategy', pickStrategy);
	 * })
	 * ```
	 */
	onGameStart(func: SettingsApplyCallback): void {
		if (!this.#isAdvancedModeCalled) {
			console.warn('warning: onGameStart WILL NOT WORK if you are not in advanced mode');
		}

		this.#gameSettings.onSettingsApply(func);
	}

	/**
	 * Sets a function to be called every time the "Reset" button is clicked
	 * @param func {function} A Function to call when the the button is clicked
	 * @example
	 * ```javascript
	 * import gameUi from '@ui';
	 * gameUi.onResetClick(() => {
	 * 	console.log('The user pressed Reset');
	 * });
	 * ```
	 */
	onResetClick(func: () => void) {
		GameResetBtn.addEventListener('click', func);
	}

	/**
	 * Sets a function to be called every time the "Higher" button is clicked
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
	 * Sets a function to be called every time the "Lower" button is clicked
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
	 * Sets a function to be called every time either the "Lower" or "Higher" buttons are clicked
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
		this.setScore(0);
		this.setCurrentCard('', 'black');
		this.#setStatus(this.#isAdvancedModeCalled ? GameStatus.IDLE : GameStatus.PLAYING);
	}

	/**
	 * Sets the Current Card text
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

	/**
	 * Customizes the "Higher" button
	 * @param bgColor - Background color
	 * @param textColor - Text color
	 * @param borderColor - Border color
	 * @returns the same gameUI reference to allow method-chaining
	 * @example
	 * ```javascript
	 * gameUI.setHigherBetButtonColor("greenlime");
	 * ```
	 * @example
	 * And using method-chaining
	 * ```javascript
	 * gameUI
	 * 	 .setHigherBetButtonColor("greenlime")
	 * 	 .setLowerBetButtonColor("crimson")
	 * 	 .setButtonsShape(ButtonShape.RECT);
	 * ```
	 */
	setHigherBetButtonColor(bgColor: string, textColor?: string, borderColor?: string) {
		this.#setButtonColor(GameBetterCardBtn, bgColor, textColor, borderColor);
		return this;
	}

	/**
	 * Customizes the "Lower" button
	 * @param bgColor - Background color
	 * @param textColor - Text color
	 * @param borderColor - Border color
	 * @returns the same gameUI reference to allow method-chaining
	 * @example
	 * ```javascript
	 * gameUI.setLowerBetButtonColor("greenlime");
	 * ```
	 * @example
	 * And using method-chaining
	 * ```javascript
	 * gameUI
	 * 	 .setHigherBetButtonColor("greenlime")
	 * 	 .setLowerBetButtonColor("crimson")
	 * 	 .setButtonsShape(ButtonShape.RECT);
	 * ```
	 */
	setLowerBetButtonColor(bgColor: string, textColor?: string, borderColor?: string) {
		this.#setButtonColor(GameWorseCardBtn, bgColor, textColor, borderColor);
		return this;
	}

	/**
	 * Customizes the buttons' shape
	 * @param shape {ButtonShape} the wanted shape
	 * @returns the same gameUI reference to allow method-chaining
	 * @example
	 * ```javascript
	 * gameUI.setButtonsShape(ButtonShape.RECT);
	 * ```
	 *
	 * @example For Circular Buttons
	 * ```javascript
	 * gameUI.setButtonsShape(ButtonShape.CIRCLE);
	 * ```
	 * @example
	 * And using method-chaining
	 * ```javascript
	 * gameUI
	 * 	 .setHigherBetButtonColor("greenlime")
	 * 	 .setLowerBetButtonColor("crimson")
	 * 	 .setButtonsShape(ButtonShape.RECT);
	 * ```
	 */
	setButtonsShape(shape: ButtonShape) {
		const buttons = Object.values(GAME_BUTTONS);
		buttons.forEach(btn => {
			if (shape === ButtonShape.CIRCLE) {
				btn.classList.add('circular');
			} else {
				btn.classList.remove('circular');
			}
		});
		return this;
	}
}

const gameUI = new GameUI();

export default gameUI;
