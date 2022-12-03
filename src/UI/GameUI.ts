import { Game } from '../logic/Game';
import { BetType } from '../logic/types';
import {
	GameBetterCardBtn,
	GameWorseCardBtn,
	ResetButton,
	ScoreLabel,
	StatusContainer,
	StatusLabel,
} from './constants';
import { GameSettingsUI } from './GameSettingsUI';
import { DeckSource } from './types';

export class GameUI<TCard> {
	readonly gameSettings: GameSettingsUI;

	constructor(protected readonly game: Game<TCard>) {
		this.gameSettings = new GameSettingsUI();
	}

	init() {
		this.gameSettings.init();
		this.reset();

		GameBetterCardBtn.addEventListener('click', () => {
			this.bet(BetType.BETTER);
		});

		GameWorseCardBtn.addEventListener('click', () => {
			this.bet(BetType.WORSE);
		});

		ResetButton.addEventListener('click', () => {
			this.show(false);
			this.reset();
		});
	}

	onStart(cb: (deckSource: DeckSource, game: Game<TCard>) => void) {
		this.gameSettings.onSettingsApply((deckSource: DeckSource) => {
			this.reset();
			cb(deckSource, this.game);
			this.displayCard(this.game.card);
			this.show(true);
		});
	}

	bet(betType: BetType) {
		try {
			this.game.bet(betType);
			this.update(this.game);
		} catch (e) {
			console.error(e);
		}
	}

	show(mode: boolean) {
		GameBetterCardBtn.hidden = !mode;
		GameWorseCardBtn.hidden = !mode;
		StatusContainer.hidden = !mode;
	}

	reset() {
		this.game.reset();
		this.show(false);
		ScoreLabel.textContent = '0';
		StatusLabel.textContent = '';
	}

	displayCard(card: TCard) {
		StatusLabel.textContent = `Your Card: ${card}`;
	}

	private update(game: Game<TCard>) {
		ScoreLabel.textContent = game.score.toString();
		if (game.isOver) {
			StatusLabel.textContent = `YOU ${game.status.toString()} `;
		}
	}
}
