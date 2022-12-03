import CardsConfig from './deck-sample.json';
import { DeckBuilder } from './logic/DeckBuilder';
import { FirstCardPickStrategy } from './logic/FirstCardPickStrategy';
import { Game } from './logic/Game';
import { ValueFirstCardComperator } from './logic/ValueFirstComperator';
import { GameSettingsUI } from './UI/GameSettingsUI';
import { GameUI } from './UI/GameUI';
import { DeckSource } from './UI/types';
import './style.css';

const valueFirstComperator = new ValueFirstCardComperator();
const pickFirstCardStrategy = new FirstCardPickStrategy();

const game = new Game(valueFirstComperator);

const gameSettings = new GameSettingsUI();
const gameUI = new GameUI(game);

gameSettings.init();

gameSettings.onSettingsApply((deckSource) => {
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
	gameUI.displayCard(game.card);
	gameUI.show(true);
});

gameUI.init();
