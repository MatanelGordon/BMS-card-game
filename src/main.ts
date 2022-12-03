import CardsConfig from './deck-sample.json';
import { FirstCardPickStrategy } from './logic/FirstCardPickStrategy';
import { Game } from './logic/Game';
import { DeckBuilder } from './logic/DeckBuilder';
import { GameSettingsUI } from './UI/GameSettingsUI';
import { GameUI } from './UI/GameUI';
import { DeckSource } from './UI/types';
import { ValueFirstCardComperator } from './logic/ValueFirstComperator';

const byValueComperator = new ValueFirstCardComperator();

const game = new Game(byValueComperator);

const gameSettings = new GameSettingsUI();
const gameUI = new GameUI();
const firstCard = new FirstCardPickStrategy();

gameSettings.init(game);

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

	game.loadDeck(deckBuilder.getDeck());
	game.chooseCard(firstCard);
    game.startGame();
	
    gameUI.displayCard(game.card);
    gameUI.show(true);
});

gameUI.init(game);
