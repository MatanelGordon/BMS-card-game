import { Game } from '../logic/Game';
import { BetType, IPickStrategy } from '../logic/types';
import {
	GameBetterCardBtn,
	GameWorseCardBtn,
	ScoreLabel,
	StatusContainer,
	StatusLabel
} from './constants';

export class GameUI<TCard> {
	protected _game?: Game<TCard>;

	get game() {
		if (!this._game) throw new Error('Cannot access game without initialization');
		return this._game;
	}

	loadGame(game: Game<TCard>) {
		this._game = game;
		this.reset();
	}

	init() {
		GameBetterCardBtn.addEventListener('click', () => {
			this.bet(BetType.BETTER);
		});

		GameWorseCardBtn.addEventListener('click', () => {
			this.bet(BetType.WORSE);
		});
	}

	startGame(deck: TCard[], pickStrategy: IPickStrategy<TCard>) {
		this.game.startGame(deck, pickStrategy);
		this.displayCard(this.game.card);
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
		ScoreLabel.textContent = '0';
		StatusLabel.textContent = '';
	}

	private displayCard(card: TCard) {
		StatusLabel.textContent = `Your Card: ${card}`;
	}

	private update(game: Game<TCard>) {
		ScoreLabel.textContent = game.score.toString();
		if (game.isOver) {
			StatusLabel.textContent = `YOU ${game.status.toString()} `;
		}
	}
}
