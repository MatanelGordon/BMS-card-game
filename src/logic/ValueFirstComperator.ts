import { Card } from './Card';
import { IComparator } from './types';

export class ValueFirstCardComperator implements IComparator<Card> {
	compare(a: Card, b: Card): number {
		const diff = a.value - b.value;

		if (diff === 0) return a.type - b.type;

		return diff;
	}
}
