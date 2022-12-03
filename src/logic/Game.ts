import { BetType } from './types/BetType';
import { GameStatus, ICardComparator, ICardPickStrategy } from './types';

export class Game<TCard> {
	protected readonly cardComperator: ICardComparator<TCard>;
	protected currentDeckIndex: number = 0;
	protected currentScore: number = 0;
	protected gameStatus: GameStatus = GameStatus.IDLE;

    chosenCard?: TCard;
	deck: TCard[] = [];

	constructor(cardComperator: ICardComparator<TCard>) {
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

	loadDeck(deck: TCard[]) {
		this.deck = deck;
	}

	startGame() {
		this.currentDeckIndex = 0;
		this.gameStatus = GameStatus.PLAYING;
		this.currentScore = 0;
	}

	chooseCard(strategy: ICardPickStrategy<TCard>) {
		this.chosenCard = strategy.pick(this.deck);
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

		const nextCard = this.deck[this.currentDeckIndex++];
		const compareResult = this.cardComperator.compare(this.chosenCard, nextCard);

		return compareResult >= 0 ? BetType.BETTER : BetType.WORSE;
	}
}
