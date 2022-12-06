import { GameStatus } from '../logic/types';
import {
	CurrentCardLabel,
	GameBetterCardBtn,
	GameWorseCardBtn,
	ScoreLabel,
	StatusLabel,
	STATUS_MSG,
} from './constants';
import { GameSettingsUI, SettingsApplyCallback } from './GameSettingsUI';

type BetButtonCallback = () => void;

// TODO: Add jsdocs
// TODO: Add exception Handling
export class GameUI {
	private _gameStatus: GameStatus = GameStatus.IDLE;
	private _gameSettings: GameSettingsUI = new GameSettingsUI();
	private _initialized: boolean = false;

	constructor(){
		this.__init__();
	}

	get gameStatus() {
		return this._gameStatus;
	}

	private __init__() {
		if (this._initialized) {
			throw new Error(`You Can't Use gameUi.init() more than once`);
		}

		this._initialized = true;
		this.reset();
		this._gameSettings.init();

		this.onGameStart(() => {
			this.reset();
			this.setStatus(GameStatus.PLAYING);
		});
	}

	private disableGame(disable: boolean) {
		GameBetterCardBtn.disabled = disable;
		GameWorseCardBtn.disabled = disable;
	}

	onGameStart(func: SettingsApplyCallback): void {
		this._gameSettings.onSettingsApply(func);
	}

	onBetterBetClick(func: BetButtonCallback): void {
		GameBetterCardBtn.addEventListener('click', () => {
			if (this._gameStatus === GameStatus.PLAYING) {
				func();
			}
		});
	}

	onWorseBetClick(func: BetButtonCallback): void {
		GameWorseCardBtn.addEventListener('click', () => {
			if (this._gameStatus === GameStatus.PLAYING) {
				func();
			}
		});
	}

	// TODO: Add param which button pressed
	onBetButtonClick(func: BetButtonCallback): void {
		this.onBetterBetClick(func);
		this.onWorseBetClick(func);
	}

	setScore(value: number) {
		ScoreLabel.textContent = value.toString();
	}

	setStatus(status: GameStatus) {
		this._gameStatus = status;
		StatusLabel.textContent = STATUS_MSG[status];
		this.disableGame(status !== GameStatus.PLAYING);

		if (status === GameStatus.WIN) {
			StatusLabel.style.color = '#3d3';
		} else if (status === GameStatus.LOSE) {
			StatusLabel.style.color = '#f22';
		} else {
			StatusLabel.style.color = '#000';
		}
	}

	reset() {
		this.setStatus(GameStatus.IDLE);
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
