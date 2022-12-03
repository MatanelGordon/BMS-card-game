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

export class GameUI {
	init(game: Game) {
		this.reset();
		GameBetterCardBtn.addEventListener('click', () => {
			game.bet(BetType.BETTER);
			this.update(game);
		});

		GameWorseCardBtn.addEventListener('click', () => {
			game.bet(BetType.WORSE);
			this.update(game);
		});

		ResetButton.addEventListener('click', () => {
			this.show(false);
		});
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

	private update(game: Game) {
		ScoreLabel.textContent = game.score.toString();
		if (game.isOver) {
			StatusLabel.textContent = `YOU ${game.status.toString()} `;
		}
	}
}
