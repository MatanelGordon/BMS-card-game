import { Card } from '../logic/Card';
import { FirstCardPickStrategy, RandomCardPickStrategy } from '../logic/pickers';
import { IPickStrategy } from '../logic/types';
import { DeckSource, PickType } from './types';

const isDeckSourceKey = (value: string): value is keyof typeof DeckSource =>
	Object.keys(DeckSource).includes(value);

export const toDeckSource = (value: string): DeckSource | undefined => {
	if (isDeckSourceKey(value)) {
		return DeckSource[value];
	}
	return undefined;
};

export const createPickStrategyByType = (pickStrategy: PickType): IPickStrategy<Card> => {
	switch (pickStrategy) {
		case PickType.RANDOM:
			return new RandomCardPickStrategy<Card>();

		case PickType.FIRST:
		default:
			return new FirstCardPickStrategy();
	}
};
