import CardsConfig from './deck-sample.json';
import { Card } from './logic/Card';
import { DeckBuilder } from './logic/DeckBuilder';
import { FirstCardPickStrategy } from './logic/pickers';
import { Game } from './logic/Game';
import { ValueFirstCardComperator } from './logic/ValueFirstComperator';
import './style.css';
import { GameSettingsUI } from './UI/GameSettingsUI';
import { GameUI } from './UI/GameUI';
import { DeckSource, PickType } from './UI/types';
import { createPickStrategyByType } from './UI/utils';

const gameSettings = new GameSettingsUI();
const gameUI = new GameUI<Card>();

gameSettings.init();
gameUI.init();

gameSettings.onSettingsApply((deckSource: DeckSource, pickType: PickType) => {
	const deckBuilder = new DeckBuilder();

	switch (deckSource) {
		case DeckSource.AUTO_GENERATED:
			deckBuilder.addCardsValuesToAllTypes([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).shuffle();
			break;
		case DeckSource.FILE:
			deckBuilder.fromJson(CardsConfig);
			break;
	}

	const valueFirstComperator = new ValueFirstCardComperator();
	const pickStrategyInstance = createPickStrategyByType(pickType);
	
	const game = new Game(valueFirstComperator);
	const deck = deckBuilder.getDeck();

	gameUI.loadGame(game);
	gameUI.startGame(deck, pickStrategyInstance);
	gameUI.show(true);
});
