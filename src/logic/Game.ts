import { BetType } from './types/BetType';
import { IComparator, GameStatus, IPickStrategy } from './types';

export class Game<TCard> {
	protected readonly cardComperator: IComparator<TCard>;
	protected currentDeckIndex: number = 0;
	protected currentScore: number = 0;
	protected gameStatus: GameStatus = GameStatus.IDLE;

    chosenCard?: TCard;
	deck: TCard[] = [];

	constructor(cardComperator: IComparator<TCard>) {
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

	reset(){
		this.currentDeckIndex = 0;
		this.currentScore = 0;
		this.gameStatus = GameStatus.IDLE;
	}

	startGame(deck: TCard[], pickStrategy: IPickStrategy<TCard>) {
		this.reset();
		this.deck = deck;
		this.gameStatus = GameStatus.PLAYING;
		this.chooseCard(pickStrategy);
	}

	protected chooseCard(pickStrategy: IPickStrategy<TCard>) {
		this.chosenCard = pickStrategy.pick(this.deck);
		this.deck = this.deck.filter((card) => card !== this.chosenCard);
	}

	bet(bet: BetType) {
		if (this.isOver) return;

		const draw = this.drawCard();		
		const isCorrect = draw === bet;

		if (isCorrect) {
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
		const compareResult = this.cardComperator.compare(nextCard, this.chosenCard);
		
		return compareResult >= 0 ? BetType.HIGHER : BetType.LOWER;
	}
}
