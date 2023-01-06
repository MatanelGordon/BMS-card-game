import gameUI from '@ui';
import { createPickStrategy } from './logic/pickers/createPickStrategy';
import deckFile from './deck-sample.json';
import { DeckBuilder } from './logic/DeckBuilder';
import { Game } from './logic/Game';
import { BetType } from './logic/types';
import { ValueFirstCardComperator } from './logic/ValueFirstComperator';
import { DeckSource, GameStatus } from './types';

const comperator = new ValueFirstCardComperator();
let game = new Game(comperator);

gameUI.advancedMode();

gameUI.onGameStart((deckSource, pickType) => {
	const deckBuilder = new DeckBuilder();

	switch (deckSource) {
		case DeckSource.CONFIG_FILE:
			deckBuilder.fromJson(deckFile);
			break;
		case DeckSource.AUTO_GENERATED:
			deckBuilder.addCardsValuesToAllTypes([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).shuffle();
			break;
	}

	const pickStrategy = createPickStrategy(pickType);

	game.startGame(deckBuilder.getDeck(), pickStrategy);
	gameUI.setCurrentCard(game.card.toString());
});

gameUI.onHigherBetClick(() => {
	game.bet(BetType.HIGHER);
});

gameUI.onLowerBetClick(() => {
	game.bet(BetType.LOWER);
});

gameUI.onBetClick(() => {
	gameUI.setScore(game.score);
	const status = game.status;

	if(status === GameStatus.WIN){
		gameUI.winGame()
	}
	else if (status === GameStatus.LOSE){
		gameUI.loseGame();
	}
});
