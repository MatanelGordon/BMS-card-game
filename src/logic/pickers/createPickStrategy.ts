import { FirstCardPickStrategy } from './FirstCardPickStrategy';
import { RandomCardPickStrategy } from './RandomCardPickStrategy';
import { Card } from '../Card';
import { IPickStrategy } from '../types';
import { PickStrategy } from '../../types';

export const createPickStrategy = (pickStrategy: PickStrategy): IPickStrategy<Card> => {
	switch (pickStrategy) {
		case PickStrategy.RANDOM:
			return new RandomCardPickStrategy<Card>();

		case PickStrategy.FIRST:
		default:
			return new FirstCardPickStrategy();
	}
};
