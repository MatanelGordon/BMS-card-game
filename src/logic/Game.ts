import { BetType } from './types/BetType';
import { Comparator, GameStatus, PickStrategy } from './types';

export class Game<TCard> {
	protected readonly cardComperator: Comparator<TCard>;
	protected currentDeckIndex: number = 0;
	protected currentScore: number = 0;
	protected gameStatus: GameStatus = GameStatus.IDLE;

    chosenCard?: TCard;
	deck: TCard[] = [];

	constructor(cardComperator: Comparator<TCard>) {
		this.cardComperator = cardComperator;
	}

	get isOver() {
		return this.gameStatus === GameStatus.LOSE || this.gameStatus === GameStatus.WIN;
	}

	get score() {
		return this.currentScore;
	}

    get status(){
        return this.gameStatus;
    }

    get card(){
        if(!this.chosenCard) throw new Error('Cannot find chosen card');
        return this.chosenCard;
    }

	startGame(deck: TCard[], pickStrategy: PickStrategy<TCard>) {
		this.deck = deck;
		this.currentDeckIndex = 0;
		this.gameStatus = GameStatus.PLAYING;
		this.currentScore = 0;
		this.chooseCard(pickStrategy);
	}

	protected chooseCard(pickFn: PickStrategy<TCard>) {
		this.chosenCard = pickFn(this.deck);
		this.deck = this.deck.filter((card) => card !== this.chosenCard);
	}

	bet(bet: BetType) {
		if (this.isOver) return;

		const res = this.drawCard() === bet;

		if (res) {
			this.currentScore++;
		} else {
			this.gameStatus = GameStatus.LOSE;
		}

		if (this.currentDeckIndex === this.deck.length) {
			this.gameStatus = GameStatus.WIN;
		}
	}

	protected drawCard() {
		if (!this.chosenCard) throw new Error('Cannot draw a card if no chosen card');
		if (this.deck.length === 0) throw new Error('Cannot draw a card if deck is empty');

		const nextCard = this.deck[this.currentDeckIndex++];
		const compareResult = this.cardComperator(this.chosenCard, nextCard);

		return compareResult >= 0 ? BetType.BETTER : BetType.WORSE;
	}
}
