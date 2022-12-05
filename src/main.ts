import './style.css';
import { DeckSource, gameUI, PickType } from "@ui";
import deckFile from './deck-sample.json';
import { FirstCardPickStrategy, RandomCardPickStrategy } from './logic/pickers';
import { Card } from './logic/Card';
import { BetType, GameStatus, IPickStrategy } from './logic/types';
import { Game } from './logic/Game';
import { ValueFirstCardComperator } from './logic/ValueFirstComperator';
import { DeckBuilder } from './logic/DeckBuilder';

export const createPickStrategyByType = (pickStrategy: PickType): IPickStrategy<Card> => {
	switch (pickStrategy) {
		case PickType.RANDOM:
			return new RandomCardPickStrategy<Card>();

		case PickType.FIRST:
		default:
			return new FirstCardPickStrategy();
	}
};


// Don't touch this, and it must be on the top of the file.
gameUI.init();

const comperator = new ValueFirstCardComperator();
let game = new Game(comperator);

gameUI.onSettingsApply((deckSource, pickType) => {
    const deckBuilder = new DeckBuilder();

    switch(deckSource){
        case DeckSource.FILE:
            deckBuilder.fromJson(deckFile);
            break;
        case DeckSource.AUTO_GENERATED:
            deckBuilder.addCardsValuesToAllTypes([1,2,3,4,5,6,7,8,9,10]).shuffle();
            break;
    }

    const pickStrategy = createPickStrategyByType(pickType);

    game.startGame(deckBuilder.getDeck(), pickStrategy);
    gameUI.reset();
    gameUI.setCurrentCard(game.card.toString());
});

gameUI.onBetterBetClick(() => {
    game.bet(BetType.BETTER);
})

gameUI.onWorseBetClick(() => {
    game.bet(BetType.WORSE);
})

gameUI.onBetButtonClick(() => {
    gameUI.setScore(game.score);
    gameUI.setStatus(game.status);
})