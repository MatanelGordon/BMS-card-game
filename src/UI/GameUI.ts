import { BetType } from '../logic/types';
import { Card } from '../logic/Card';
import { Game } from '../logic/Game';
import {
	GameBetterCardBtn,
	GameWorseCardBtn,
	ResetButton,
	ScoreLabel,
	StatusContainer,
	StatusLabel,
} from './constants';

export class GameUI<TCard> {

	constructor(protected readonly game: Game<TCard>) {}

	init() {
		this.reset();
		GameBetterCardBtn.addEventListener('click', () => {
			this.bet(BetType.BETTER);
		});

		GameWorseCardBtn.addEventListener('click', () => {
			this.bet(BetType.WORSE);
		});

		ResetButton.addEventListener('click', () => {
			this.show(false);
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
		this.show(false);
		ScoreLabel.textContent = '0';
		StatusLabel.textContent = '';
	}

	displayCard(card: Card) {
		StatusLabel.textContent = `Your Card: ${card.toString()}`;
	}

	private update(game: Game<TCard>) {
		ScoreLabel.textContent = game.score.toString();
		if (game.isOver) {
			StatusLabel.textContent = `YOU ${game.status.toString()} `;
		}
	}
}
