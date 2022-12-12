import { DeckSource, gameUI, PickType } from '@ui';
import deckFile from './deck-sample.json';
import { Card } from './logic/Card';
import { DeckBuilder } from './logic/DeckBuilder';
import { Game } from './logic/Game';
import { FirstCardPickStrategy, RandomCardPickStrategy } from './logic/pickers';
import { BetType, IPickStrategy } from './logic/types';
import { ValueFirstCardComperator } from './logic/ValueFirstComperator';
import './style.css';

export const createPickStrategyByType = (pickStrategy: PickType): IPickStrategy<Card> => {
	switch (pickStrategy) {
		case PickType.RANDOM:
			return new RandomCardPickStrategy<Card>();

		case PickType.FIRST:
		default:
			return new FirstCardPickStrategy();
	}
};

const comperator = new ValueFirstCardComperator();
let game = new Game(comperator);

gameUI.onGameStart((deckSource, pickType) => {
	const deckBuilder = new DeckBuilder();

	switch (deckSource) {
		case DeckSource.FILE:
			deckBuilder.fromJson(deckFile);
			break;
		case DeckSource.AUTO_GENERATED:
			deckBuilder.addCardsValuesToAllTypes([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).shuffle();
			break;
	}

	const pickStrategy = createPickStrategyByType(pickType);

	game.startGame(deckBuilder.getDeck(), pickStrategy);
	gameUI.setCurrentCard(game.card.toString());
});

gameUI.onBetterBetClick(() => {
	game.bet(BetType.BETTER);
});

gameUI.onWorseBetClick(() => {
	game.bet(BetType.WORSE);
});

gameUI.onBetButtonClick(() => {
	gameUI.setScore(game.score);
	gameUI.setStatus(game.status);
});
