import { IPickStrategy } from '../types';

export class RandomCardPickStrategy<T> implements IPickStrategy<T> {
	pick(deck: T[]): T {
		const index = Math.floor(Math.random() * deck.length);
		return deck[index];
	}
}
