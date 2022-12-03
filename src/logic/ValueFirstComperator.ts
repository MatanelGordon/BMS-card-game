import { clamp } from 'lodash';
import { Card } from './Card';
import { Comparator } from './types';

export const valueFirstComperator: Comparator<Card> = (a: Card, b: Card): number => {
	const diff = clamp(a.value - b.value, -1, 1);

	if (diff === 0) return clamp(a.type - b.type, -1, 1);

	return diff;
};
