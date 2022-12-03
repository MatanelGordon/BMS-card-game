import { Card } from '../Card';
import { IPickStrategy } from '../types';

export class FirstCardPickStrategy implements IPickStrategy<Card> {
	pick(deck: Card[]): Card {
		return deck[0];
	}
}
