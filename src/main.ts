import CardsConfig from './deck-sample.json';
import { DeckBuilder } from './logic/DeckBuilder';
import { FirstCardPickStrategy } from './logic/FirstCardPickStrategy';
import { Game } from './logic/Game';
import { ValueFirstCardComperator } from './logic/ValueFirstComperator';
import './style.css';
import { GameUI } from './UI/GameUI';
import { DeckSource } from './UI/types';

const valueFirstComperator = new ValueFirstCardComperator();
const pickFirstCardStrategy = new FirstCardPickStrategy();

const game = new Game(valueFirstComperator);

const gameUI = new GameUI(game);

gameUI.onStart((deckSource, game) => {
	const deckBuilder = new DeckBuilder();

	switch (deckSource) {
		case DeckSource.AUTO_GENERATED:
			deckBuilder.addCardsValuesToAllTypes([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).shuffle();
			break;
		case DeckSource.FILE:
			deckBuilder.fromJson(CardsConfig);
			break;
	}

	const deck = deckBuilder.getDeck();

	game.startGame(deck, pickFirstCardStrategy);
});

gameUI.init();
